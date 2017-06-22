const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const {app, runServer, closeServer} = require('../server');
const {Topic} = require('../models/topic-model');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

//***************************************
//***************************************

function seedTopicData(){
	console.info('seeding topic data');
	const seedData = [];

	for (let i=1; i<+10; i++){
		seedData.push(generateTopicData());
	}
	return Topic.insertMany(seedData);
}; 

function generateTopicData() {
	return {
		_id: faker.random.uuid(),
		theme: faker.lorem.words(),
		introduction: faker.lorem.paragraph(),
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
};


function tearDownDb() {
	console.warn('Deleting database');
	return mongoose.connection.dropDatabase();
};

describe('Blog Api', function() {

	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	beforeEach(function() {
		return seedBlogData();
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
			return chai.request(app)
				.get('/topics/session')
				.then(function(res) {
					const expectedKeys = ['_id','theme', 'introduction', 'keywords', 'questions'];

					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.an('object');
					res.body.should.include.keys(expectedKeys);
					res.body.questions.should.be.an('array');
					res.body.keywords.should.be.an('array');
				})
		});	
	});

	// Get 1 session from db



	// Get with Search query 

	// ************* Topics POST Endpoints *************
	// *************************************************

	// Submit a new Table Topics Session





});
	