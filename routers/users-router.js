const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {User} = require('../models/user');
const {Profile} = require('../models/profile');



// ************* User GET Endpoints *************

// Get a list of all users

router.get('/', (req, res) => {
	User
	.find()	
	.exec()
	.then(userList => res.status(200).json(userList))
	.catch(err => {
  		console.error(err);
  		res.status(500).json({message: 'Internal server error'})
  });
});

// Return list of profiles
router.get('/profile', (req, res) => {
	Profile
	.find()	
	.exec()
	.then(profileList => res.status(200).json(profileList))
	.catch(err => {
  		console.error(err);
  		res.status(500).json({message: 'Internal server error'})
  });
});

// Get a user by Id

router.get('/:id', (req, res) => {
	User
	.findOne()	
	.exec()
	.then(user => res.status(200).json(user))
	.catch(err => {
  		console.error(err);
  		res.status(500).json({message: 'Internal server error'})
  });
});



// ************* User POST Endpoints *************

// Create a New User
router.post('/', (req, res) => {
	const requiredFields = ['userName', 'email', 'password', 'passwordConf', 'inClub'];
	
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
		  const message = `Missing \`${field}\` in request body`
		  return res.status(400).send(message);
		};
	};

// add validation that password and passwordConf are the same

	User
		.create({
			username: req.body.userName,
			email: req.body.email,
			password: req.body.password,
		})
		.then( newClub => {
			if(!newClub) {
						//Create Club(receive club properties, Club.create)
					}
		})
					//user => res.status(201).json(user))
		.then(club => {
			//Assign user to the club.
			//club.members.push(user);
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
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

router.post('/token/', (req, res) => {
	res.status(200).json(req.session.userId);
})

//Create user Profile
router.post('/:id/profile', (req, res) => {

	const requiredFields = ['displayName', 'bio', 'photo'];
	
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
			user_id: req.params.id
		})
		.then(
			user => res.status(201).json(user))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
});

// ************* User PUT Endpoints *************


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
	const updateableFields = ['displayName', 'bio', 'photo'];

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
	res.send("stuff is gone").status(204)
});


// ************* Other functions *************

router.use('*', function(req, res) {
  res.status(404).json({message: 'Page Not Found...keep looking #1'});
});

module.exports = router
