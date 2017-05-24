const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Club} = require('../models/club');

// ************* Club GET Endpoints *************

router.get('/:id', (req, res) => {
	Club
	.findById(req.params.id)
	.exec()
	.then(club => 
		res.json(club)
	)
	.catch(err => {
  	console.error(err);
	  res.status(500).json({message: 'Internal server error'})
  });
});

// ************* Club POST Endpoints *************

router.post('/'), (req, res) => {
	const requiredFields = ['clubName', 
													'members', 
													'location', 
													'webUrl'];
	
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
		  const message = `Missing \`${field}\` in request body`
		  return res.status(400).send(message);
		};
	};

	Club
		.create({
			clubName: req.body.clubName,
			members: req.body.members,
			location: req.body.location,
			questions: req.body.questions,
			webUrl: req.body.webUrl
		})
		.then(
			post => res.status(201).json(post.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
};

module.exports = router









