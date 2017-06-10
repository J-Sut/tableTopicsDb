const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const MyModel = mongoose.connect

const {Topic} = require('../models/topic-model');

// ************* Topics GET Endpoints *************

// Return list of all Sessions: 
router.get('/', (req, res) => {
	Topic
	.find()	
	.exec()
	.then(topicList => res.status(200).json(topicList))
	.catch(err => {
  		console.error(err);
  		res.status(500).json({message: 'Internal server error'})
  });
});


// Get 1 session from db
router.get('/session', (req, res) => {
	Topic
		.count()
		.exec(function(err, count){
		  var random = Math.floor(Math.random() * count);

		  Topic
		  	.findOne()
		  	.skip(random)
		  	.exec()
		  	.then(function(topic){
					res.status(200).json(topic);
				})
				.catch(err => {
		  		console.error(err);
		  		res.status(500).json({message: 'Internal server error'})
				});
		});
});		


router.get('/question', (req, res) => {
	Topic
		.count()
		.exec(function(err, count){
		  var random = Math.floor(Math.random() * count);

		  Topic
		  	.findOne()
		  	.skip(random)
		  	.exec()
				.then(session => {
					const questionArray = session.questions
					return questionArray[Math.floor(Math.random() * questionArray.length)]
				})
				.then(question => {
					res.status(200).json(question);
				})
				.catch(err => {
			  		console.error(err);
			  		res.status(500).json({message: 'Internal server error'})
			  });
		});
});


// Get with Search query 

router.get('/query', (req, res) => {
	const filters = {};
  const queryableFields = ['introduction'];
  let query = req.query.theme;
  queryableFields.forEach(field => {
    if (req.query[field]) {
      filters[field] = req.query[field];
    }
  });
  // console.log('query:');
  // console.log(query);
  Topic
	  .find({$text: {$search: query}})
	  .exec()
	  .then(session => {res.status(200).json(session)})
	  .catch(err => {
	  	console.error(err);
	  	res.status(500).json({message: 'Internal server error'})
	  });
});

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











