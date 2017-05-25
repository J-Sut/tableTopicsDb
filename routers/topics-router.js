const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const MyModel = mongoose.connect

const {Topic} = require('../models/topic');

// ************* Topics GET Endpoints *************

// return list of all users: 
router.get('/', (req, res) => {
	Topic
	.find(Topic)	
	.exec()
	.then(topicList => res.status(200).json(topicList))
	.catch(err => {
  		console.error(err);
  		res.status(500).json({message: 'Internal server error'})
  });
});

// return a full table topics session

// Gets 1 session from db
router.get('/session', (req, res) => {
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

// Get a single question for practice

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

// ************* Topics POST Endpoints *************

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

// ************* Topics PUT Endpoints *************

router.put('/:id', (req, res) => {
	if(!(req.params.id && req.body.id && req.body.id === req.params.id)){
		const message = (
			`Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
		console.error(message)
		res.status(400).json({message: message});
	};

	const toUpdate = {};
	const updateableFields = ['theme', 'introduction', 'keywords', 'questions'];

	updateableFields.forEach(field => {
		if(field in req.body) {
			toUpdate[field] = req.body[field];
		}
	});

	Topic
		.findByIdAndUpdate(req.params.id, {$set: toUpdate}, {new: true})
		.exec()
		.then(session => res.json(session).status(204).end())
	  .catch(err => res.status(500).json({message: 'Internal server error'}));	
});


// ************* Topics DELETE Endpoints *************

// DELETE an existing Table Topics Session
router.delete('/:id', (req, res) => {
	Topic
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(topic => res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal server error'}))
});


// ************* Other functions *************

router.use('*', function(req, res) {
  res.status(404).json({message: 'Page Not Found...keep looking #2'});
});

module.exports = router











