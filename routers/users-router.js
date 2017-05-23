const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {User, Topic} = require('./models');


// ************* New User Endpoints *************


// Create a New User
router.post('/user'), (req, res) => {
	const requiredFields = ['userName', 'email', 'password', 'passwordConf', 'inClub'];
	const optionalFields = ['tmTitle', 'clubName', {'clublocation': {'city', 'country'}}, 'clubWebsite'];
	
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
		  const message = `Missing \`${field}\` in request body`
		  return res.status(400).send(message);
		};
	};

	User
		.create({
			userName: req.body.userName,
			email: req.body.email,
			password: req.body.password,
			passwordConf: req.body.passwordConf,
			inClub: req.body.inClub
		})
		.then(
			post => res.status(201).json(post.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json(message: 'Internal server error');
		});
};

// Update user profile information


//Delete and existing user
router.delete('/user/:id', (req, res) => {
	User
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(post => res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal server error'}))
});

router.use('*', function(req, res) {
  res.status(404).json({message: 'Page Not Found...keep looking'});
});