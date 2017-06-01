const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Club} = require('../models/club-model');

// ************* Club GET Endpoints *************

router.get('/', (req, res) => {
	Club
	.find(Club)	
	.exec()
	.then(clubList => res.status(200).json(clubList))
	.catch(err => {
  		console.error(err);
  		res.status(500).json({message: 'Internal server error'})
  });
});

// Get club by id
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

//Create new Club

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

// ************* Club PUT Endpoints *************

router.put('/:id', (req, res) => {
	if(!(req.params.id && req.body.id && req.body.id === req.params.id)){
		const message = (
			`Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
		console.error(message)
		res.status(400).json({message: message});
	};

	const toUpdate = {};
	const updateableFields = ['name', 'members', 'location', 'website'];

	updateableFields.forEach(field => {
		if(field in req.body) {
			toUpdate[field] = req.body[field];
		}
	});

	Club
		.findByIdAndUpdate(req.params.id, {$set: toUpdate}, {new: true})
		.exec()
		.then(club => res.json(club).status(204).end())
	  .catch(err => res.status(500).json({message: 'Internal server error'}));	
});


// ************* Club DELETE Endpoints *************

// DELETE an existing Toastmasters Club

router.delete('/:id', (req, res) => {
	Club
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(topic => res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal server error'}))
});

// ************* Other functions *************

router.use('*', function(req, res) {
  res.status(404).json({message: 'Page Not Found...keep looking #3'});
});

module.exports = router




























