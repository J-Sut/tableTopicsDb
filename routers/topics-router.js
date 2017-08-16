const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const MyModel = mongoose.connect

const {Topic} = require('../models/topic-model');
const {User} = require('../models/user-model');
const {Profile} = require('../models/profile-model');


// ************* Topics GET Endpoints *************
// *************************************************

// Return list of all Topics: 
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
		  		res.status(500).json({message: 'Internal server error while getting 1 session'})
				});
		});
});		


// Get 1 question from db

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
			  		res.status(500).json({message: 'Internal server error while getting 1 question'})
			  });
		});
});

// Get a session with Search query 

router.get('/query', (req, res) => {
	const filters = {};
  let query = req.query.theme;
  Topic
	  .find({$text: {$search: query}})
	  .exec()
	  .then(session => {res.status(200).json(session)})
	  .catch(err => {
	  	console.error(err);
	  	res.status(500).json({message: 'Internal server error while searching your query'})
	  });
});


// ************* Topics POST Endpoints *************
// *************************************************

// Submit a new Table Topics Session
router.post('/', (req, res) => {
	const requiredFields = ['theme', 
													'introduction', 
													'keywords', 
													'questions'];
	
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
		  const message = `Missing \`${field}\` in request body`
		  return res.status(400).send(message);
		};
	};

	if(!req.session.userId) {
		User
		.findOne({email: req.body.email})
		.exec()
		.then(function(userInfo) {
			console.log(userInfo);
			if(!userInfo){
				return User
				.create({
					username: req.body.email,
					email: req.body.email,
					password: req.body.password
				})
				.then(newUser => {
					req.session.userId = newUser._id;
					return Profile
					.create({
						displayName: "",
						bio: "",
						photo: "",
						user_id: newUser._id,
						tmTitle: ""
					})
					.then(function(profile){
						console.log('New Profile', profile);
						return newUser;
					})
				})
			}
			if(req.body.password !== userInfo.password){
				const message = `Password is incorrect`;
				console.error(message);
				res.status(400).json({message: message});
				return Promise.reject();
			} 
			//make token
			req.session.userId = userInfo._id;
			return userInfo;
		})
		.then(function(userInfo) {
			return Topic
				.create({
					theme: req.body.theme,
					introduction: req.body.introduction,
					keywords: req.body.keywords,
					questions: req.body.questions,
					user_id: req.session.userId
				})
		})
		.then(topic => {
			res.status(201).json(topic)
		})
		.catch(err => {
					console.error(err);
					res.status(500).json({message: 'Internal server error while posting your topic session'})
		})
	}else{
		Topic
		.create({
			theme: req.body.theme,
			introduction: req.body.introduction,
			keywords: req.body.keywords,
			questions: req.body.questions,
			user_id: req.session.userId
		})
		.then(topic => {
			res.status(201).json(topic)
		})
		.catch(err => {
					console.error(err);
					res.status(500).json({message: 'Internal server error while posting your topic session'})
		})
	}
});

// ************* Topics PUT Endpoints *************
// *************************************************


// Update a submitted table topic by its id
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
// *************************************************

// DELETE an existing Table Topics Session
router.delete('/:id', (req, res) => {
	Topic
		.findByIdAndRemove(req.params.id)
		.exec()
		.then(topic => res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal server error while deleting your session'}))
});


// ************* Other functions *************

router.use('*', function(req, res) {
  res.status(404).json({message: 'Page Not Found...keep looking #2'});
});

module.exports = router







