const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const {app, runServer, closeServer} = require('../server');
const {Topic} = require('../models/topic-model');
const {User} = require('../models/user-model');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

//***************************************
//***************************************

function seedTopicData(){
	console.info('seeding topic data');
	let seedData = [];

	for (let i=0; i<10; i++){
		seedData.push(generateUserData());
	}

	return User.insertMany(seedData)
		.then(users => {
			seedData = [];
			for (let i=0; i<10; i++){
				seedData.push(generateTopicData(users[i]));
			}
			return Topic.insertMany(seedData);
		})
		.catch(err => console.log(err));
}; 

function generateUserData() {
	return {
		username: faker.internet.userName(),
		password: faker.internet.password(),
		email: faker.internet.email(),
		inClub: faker.random.boolean()
	}
};

function generateTopicData(user) {
	let newTopic = {
		theme: faker.lorem.words(),
		introduction: faker.lorem.paragraph(),
		user_id: user._id,
		keywords: [
			faker.lorem.word(),
			faker.lorem.word(),
			faker.lorem.word(),
			faker.lorem.word()
		],	
		questions: [
			faker.lorem.sentence(),
			faker.lorem.sentence(),
			faker.lorem.sentence(),
			faker.lorem.sentence(),
			faker.lorem.sentence()
		]		
	}	
	return newTopic
};

function tearDownDb() {
	console.warn('Deleting database');
	return mongoose.connection.dropDatabase();
};

describe('Topic Api', function() {

	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	beforeEach(function() {
		return seedTopicData();
	});

	afterEach(function() {
		return tearDownDb();
	});

	after(function(){
		return closeServer();
	});



	// ************* Topics GET Endpoints *************
	// *************************************************

	// Return list of all Topics - Test: 

	describe('Get a list of all topics (GET /topics)', function() {
		it('should return an array of all the Topic Sessions', function(){
			return chai.request(app)
				.get('/topics')
				.then(function(res) {
					const expectedKeys = ['_id','theme', 'introduction', 'keywords', 'questions'];

					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.an('array');
					
					res.body.forEach(function(item){
						item.should.be.an('object');
						item.should.include.keys(expectedKeys);
					});
				})
		});	
	});


	// Get 1 session from db - Test

	describe('Get a random topic session (GET /topics/session)', function() {
		it('should return an object of 1 topic session', function(){
			// Topic.find().exec().then(topics => console.log(topics));
			return chai.request(app)
				.get('/topics/session')
				.then(function(res) {
					// console.log('res topic: ', res)
					const expectedKeys = ['_id','theme', 'introduction', 'keywords', 'questions'];

					res.should.have.status(200);
					res.should.be.json;
					res.should.be.an('object');
					res.body.should.include.keys(expectedKeys);
					res.body.questions.should.be.an('array');
					res.body.keywords.should.be.an('array');
				})
		});	
	});

	// Get 1 question from db

	describe('Get a random topic question from a random session (GET /topics/question)', function() {
		it('should return 1 question as a string', function(){
			// Topic.find().exec().then(topics => console.log(topics));
			return chai.request(app)
				.get('/topics/question')
				.then(function(res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('string')
				})
		});	
	});

	// Get session with a Search query 

	// ************* Topics POST Endpoints *************
	// *************************************************

	// Submit a new Table Topics Session - Test

	describe('Submit a table topics session to the database (POST /topics', function() {

		it('should submit a session', function() {
			
			let testUserId = {_id: faker.random.uuid()}
			const newPost = generateTopicData(testUserId);
			// console.log('testUserId: ', testUserId);
			// console.log('new post: ',newPost);

			return chai.request(app)
				.post('/topics/')
				.send(newPost)
				.then(function(res){
					// console.log('submit session res.body: ', res.body)

					res.should.have.status(201);
					res.should.be.json;
					res.body.should.include.keys('theme', 'introduction', 'keywords', 'questions');
					// res.body.user_id.should.not.be.null();
				});
		});		
	});


	// ************* Topics PUT Endpoints *************
	// *************************************************

	// Update a submitted table topic by its id - Test







	// ************* Topics DELETE Endpoints *************
	// *************************************************

	// DELETE an existing Table Topics Session - Test

	describe('Delete a table topics session by id (Delete /:id', function() {
		let topicId;
		it('delete a topics session', function() {

			Topic
				.findOne()
				.exec()
				.then(topic => {
					topicId = topic._id;
					console.log(`****this is the topic._id1: ${topicId}`)
					return chai.request(app)
						.delete(`/topics/${topicId}`)
						.then(function(res){
							res.should.have.status(204);
						});
				});
		});
	});

});
	