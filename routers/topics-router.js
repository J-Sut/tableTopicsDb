const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const MyModel = mongoose.connect

const {Topic} = require('../models/topic');


// ************* Topics Endpoints *************

// Get a single question for practice

// Gets all topics from db
router.get('/', (req, res) => {
	Topic
	.findOne(Topic)
	.exec()
	.then(function(topic){
		res.status(200).json(topic);
	})
	//then go into the response object and randomly grab one of the questions
	.catch(err => {
  		console.error(err);
  		res.status(500).json({message: 'Internal server error'})
  });
});

// Get a whole TT session for a club meeting
// router.get('/sessions', (req, res) => {
// 	Topic
// 	.findOne()
// 	.exec()
// 	.then(function(topic){
// 		res.json(topic);
// 	})
// 	//then go into the response object and randomly grab one of the questions
// 	.catch(err => {
//   		console.error(err);
//   		res.status(500).json({message: 'Internal server error'})
//   });
// });

// router.get('/search'), (req, res) => {

// };

// Submit a new Table Topics Session
router.post('/', (req, res) => {
	const requiredFields = ['theme', 
													'sessionIntro', 
													'keywords', 
													'questions'];
	
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
		  const message = `Missing \`${field}\` in request body`
		  return res.status(400).send(message);
		};
	};

	Topic
		.create({
			theme: req.body.theme,
			introduction: req.body.sessionIntro,
			keywords: req.body.keywords,
			questions: req.body.questions,
		})
		.then(
			post => res.status(201).json(post))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		});
});

// DELETE an existing Table Topics Session
router.delete('/:id', (req, res) => {
	Topic
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(topic => res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal server error'}))
});

module.exports = router











