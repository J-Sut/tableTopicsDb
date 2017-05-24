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

router.post('/', (req, res) => {
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

// CREATE a new Toastmasters Club

	Club
		.create({
			name: req.body.clubName,
			members: req.body.members,
			location: req.body.location,
			website: req.body.webUrl
		})
		.then(
			post => res.status(201).json(post))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
});

// DELETE an existing Toastmasters Club
router.delete('/:id', (req, res) => {
	Club
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(topic => res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal server error'}))
});


module.exports = router









