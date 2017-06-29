const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const {app, runServer, closeServer} = require('../server');
const {Topic} = require('../models/topic-model');
const {User} = require('../models/user-model');
const {Club} = require('../models/club-model');

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

describe('User Api', function() {

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

	// Get a user Profile by Id - Test

	// describe('Get the profile of the logged in User (GET /users/:id/topics)', function() {
	// 	it("should return an object with profile info", function(){
	// 		return chai.request(app)
	// 			.get('/users/profile/me')
	// 			.then(function(res) {
	// 				const expectedKeys = ['_id', 'theme', 'introduction', 'user_id', 'questions', 'keywords'];

	// 				res.should.have.status(200);
	// 				res.should.be.json;
	// 				res.body.should.be.an('array');
	// 				res.body.forEach(function(item){
	// 					item.should.be.an('object');
	// 					item.should.include.keys(expectedKeys);
	// 					item.questions.should.be.an('array');
	// 					item.keywords.should.be.an('array');
	// 				});
	// 			})
	// 	});	
	// });

	// Get Session Login Token - Test

	describe('Get the log in token of the current user (GET /token)', function() {
		it('should return a string', function(){
			return chai.request(app)
				.get('/users/token')
				.then(function(res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.an('string');
				})
		});
	});


	// Get Topics submitted by User Id - Test

	describe('Get a list of all topics by a User Id (GET /users/:id/topics)', function() {
		it("should return an array of all a user's topics", function(){
			return chai.request(app)
				.get('/users/59458354ceb37633c56d4589/topics')
				.then(function(res) {
					const expectedKeys = ['_id', 'theme', 'introduction', 'user_id', 'questions', 'keywords'];

					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.an('array');


					res.body.forEach(function(item){
						item.should.be.an('object');
						item.should.include.keys(expectedKeys);
						item.questions.should.be.an('array');
						item.keywords.should.be.an('array');
					});
				})
		});	
	});

	// ************* User POST Endpoints - Tests *************

	// Create a New User - Test

	// describe('Create a new user, user profile, and club if it doesnt already exit (POST /users/)', function() {
	// 	it("should return an object with the new user's info", function(){
	// 		return chai.request(app)
	// 			.post('/users/')
	// 			.then(function(res) {
	// 				const expectedKeys = ['userName', 'email', 'inClub', 'user_id', 'tmTitle'];
	// 				const	unexpectedKeys = ['password', 'passwordConf'];

	// 				res.should.have.status(201);
	// 				res.should.be.json;
	// 				res.body.should.be.an('object');

	// 				res.body.forEach(function(item){
	// 					item.should.be.a('string');
	// 					item.should.include.keys(expectedKeys);
	// 					item.should.not.include.keys(unexpectedKeys);

	// 				});
	// 			})
	// 	});	
	// });

	// Begin User Login Session






	//Create user Profile





	// ************* User PUT Endpoints *************

	// Update profile information


	// Update User information


	// ************* User DELETE Endpoints *************

	// Delete a User profile



	//Delete an existing User




	// End User Session



});











