const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const	md5 = require('md5');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {User} = require('../models/user-model');
const {Profile} = require('../models/profile-model');
const {Club} = require('../models/club-model');
const {Topic} = require('../models/topic-model');
const {sendMail} = require('../utils/mailer');

// ************* User GET Endpoints *************
// **********************************************

// Get a list of all users

// router.get('/', (req, res) => {
// 	User
// 	.find()	
// 	.exec()
// 	.then(userList => {
// 		res.status(200).json(userList.map(user => {
// 			return user.apiRepr();
// 		}))
// 	})
// 	.catch(err => {
//   		console.error(err);
//   		res.status(500).json({message: 'Internal server error'})
//   });
// });

// Get a user Profile by Id
router.get('/profile/me', (req, res) => {
	Profile
	.findOne({user_id: req.session.userId})	
	.populate('user_id', 'email')
	.exec()
	.then(profile => {
		profile.photo = md5(profile.user_id.email);
		res.status(200).json(profile)
	})
	.catch(err => {
  		console.error(err);
  		res.status(500).json({message: 'Internal server error'})
  });
});

// // Return list of profiles
// router.get('/profiles', (req, res) => {
// 	Profile
// 	.find()	
// 	.exec()
// 	.then(profileList => res.status(200).json(profileList))
// 	.catch(err => {
//   		console.error(err);
//   		res.status(500).json({message: 'Internal server error'})
//   });
// });

router.get('/password/:email', (req,res) => {
	User
	.findOne({email: req.params.email})	
	.exec()
	.then(user => {
		user.password = Math.random().toString(15).substr(2, 15);
		user.save();
		sendMail(user.email, 'TableTopicsDB :: Your new password', `Your new password is ${user.password}`);
		res.status(200).json(user.password);
	})
	.catch(err => {
  		console.error(err);
  		res.status(500).json({message: 'Internal server error'})
  	});
})

// Get Session Login Token
router.get('/token/', (req, res) => {
	res.status(200).json(req.session.userId);
})

// Get Topics submitted by User Id
router.get('/:id/topics', (req, res) => {

	Topic
		.find({user_id: req.params.id})	
		.exec()
		.then(userTopics => res.status(200).json(userTopics))
		.catch(err => {
	  		console.error(err);
	  		res.status(500).json({message: 'Internal server error'})
	  });
	});

router.get('/:id', (req, res) => {
	User
	.findById(req.params.id)	
	.exec()
	.then(user => res.status(200).json(user))
	.catch(err => {
  		console.error(err);
  		res.status(500).json({message: 'Internal server error'})
  });
});


// ************* User POST Endpoints *************
// ***********************************************

// Create a New User
router.post('/', (req, res) => {
	const requiredFields = ['userName', 'email', 'password', 'passwordConf', 'inClub', 'tmTitle'];
	const optionalFields = ['clubName', 'location', 'clubWebsite'];
	let _newUser;

	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
		  const message = `Missing \`${field}\` in request body`
		  return res.status(400).send(message);
		};
	};

	req.body.inClub = req.body.inClub == "true" ? true : false;

	User
		.create({
			username: req.body.userName,
			email: req.body.email,
			password: req.body.password,
			inClub: req.body.inClub,
			memberClubList: req.body.clubName
		})
		.then(newUser => {
			_newUser = newUser;
			if (!req.body.inClub || req.body.inClub) {
				return res.status(201).json(_newUser);
			}
			return Club
			.findOne({name: req.body.clubName})
			.exec()
		}) //remove once uncommented below

// *************** the super secret sauce for adding members to clubs
// *************** use this to push topics to users

		.then(club => {
				if (club){
					return club;
					console.log("club is already registered:" + club, club._id, club.getObjectId());
					console.log(_newUser);
				} else {
					return Club
					.create({
						name: req.body.clubName,
						location: {
							city: req.body.location.city,
							country: req.body.location.country
						},
						website: req.body.website
					})
				} 
			})
			.then(club => {
				Club
					.findByIdAndUpdate(club._id, {$addToSet:{members: _newUser}})
					.exec();
				res.status(201).json(_newUser)
			})
			.catch(err => {
				console.error(err);
				res.status(500).json({message: 'Internal server error from user-router'});
			});
});

// Begin User Login Session
router.post('/login', (req, res) => {
	//Receive user input(email, password)
	const {email, password} = req.body;
	//Find the user
	User
		.findOne({email: email})
		.exec()
		.then(function(userInfo) {
			if(password !== userInfo.password){
				const message = `Password is incorrect`;
				console.error(message)
				res.status(400).json({message: message});
			} 
			//make token
			req.session.userId = userInfo._id;
			res.status(200).json(req.session.userId)
		})
		.catch(err => {
			console.error("Email was not found");
			res.status(404).json({message: "Email not found"})
		})
}); 

//Create user Profile
router.post('/:id/profile', (req, res) => {

	const requiredFields = ['displayName', 'bio', 'tmTitle', 'photo'];
	
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
		  const message = `Missing \`${field}\` in request body`
		  return res.status(400).send(message);
		};
	};

// add validation that password and passwordConf are the same

	Profile
		.create({
			displayName: req.body.displayName,
			bio: req.body.bio,
			photo: req.body.photo,
			user_id: req.params.id,
			tmTitle: req.body.tmTitle
		})
		.then(
			user => res.status(201).json(user))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
});

// ************* User PUT Endpoints *************
// **********************************************

// Update profile information
router.put('/:id/profile', (req, res) => {
	if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
		const message = (
			`Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
		console.error(message)
		res.status(400).json({message: message});
	}; 

	const toUpdate = {};
	const updateableFields = ['displayName', 'bio', 'photo', 'tmTitle'];

	updateableFields.forEach(field => {
		if (field in req.body) {
			toUpdate[field] = req.body[field];
		}
	});

	Profile
	  .findByIdAndUpdate(req.params.id, {$set: toUpdate}, {new: true})
	  .exec()
	  .then(user => res.json(user).status(204).end())
	  .catch(err => res.status(500).json({message: 'Internal server error'}));	
});

// Update User information
router.put('/:id', (req, res) => {
	if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
		const message = (
			`Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
		console.error(message)
		res.status(400).json({message: message});
	}; 

	const toUpdate = {};
	const updateableFields = ['username', 'email', 'password'];

	updateableFields.forEach(field => {
		if (field in req.body) {
			toUpdate[field] = req.body[field];
		}
	});

	User
	  .findByIdAndUpdate(req.params.id, {$set: toUpdate}, {new: true})
	  .exec()
	  .then(user => res.json(user).status(204).end())
	  .catch(err => res.status(500).json({message: 'Internal server error'}));	
});


// ************* User DELETE Endpoints *************
// *************************************************


// Delete a User profile
router.delete('/:id/profile', (req, res) => {
	Profile
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(profile => 
			res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal server error'}))
});

//Delete an existing User
router.delete('/:id', (req, res) => {
	User
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(user => res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal server error'}))
});

// End User Session
router.delete('/logout/:id', (req, res) => { 
	delete req.session.userId;
	res.send("User deleted").status(204)
});

// ************* Other functions *************

router.use('*', function(req, res) {
  res.status(404).json({message: 'Page Not Found...keep looking #1'});
});

module.exports = router
