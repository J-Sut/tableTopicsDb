const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {User} = require('../models/user');


// ************* User GET Endpoints *************

// Get a list of all users

router.get('/', (req, res) => {
	User
	.find(User)	
	.exec()
	.then(userList => res.status(200).json(userList))
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
		.then(
			user => res.status(201).json(user))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
});

// ************* User PUT Endpoints *************

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

//Delete and existing user
router.delete('/:id', (req, res) => {
	User
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(user => res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal server error'}))
});

// ******************************************************
// ************* User/:id/Profile Endpoints *************

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

	User
		.create({
			displayName: req.body.userName,
			email: req.body.email,
			photo: req.body.password,
		})
		.then(
			user => res.status(201).json(user))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
});

// ************* Other functions *************

router.use('*', function(req, res) {
  res.status(404).json({message: 'Page Not Found...keep looking #1'});
});

module.exports = router
