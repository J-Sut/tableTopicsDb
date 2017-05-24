const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const Profile = require('../models/profile');


// ************* Profile Get Endpoint *************

router.get('/:id', (req, res) => {
	Profile
	.findById(req.params.id)
	.exec()
	.then(profile => 
		res.json(profile)
	)
	.catch(err => {
  	console.error(err);
	  res.status(500).json({message: 'Internal server error'})
  });
});

// ************* Profile Post Endpoint *************

router.post('/'), (req, res) => {
	const requiredFields = ['displayName', 
													'bio', 
													'photo'] 
	
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
		  const message = `Missing \`${field}\` in request body`
		  return res.status(400).send(message);
		};
	};

	Profile
		.create({
			displayName: req.body.displayName,
			bio: req.body.bio,
			photo: req.body.photo
		})
		.then(
			post => res.status(201).json(post.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
};

module.exports = router
