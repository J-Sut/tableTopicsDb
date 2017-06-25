// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const faker = require('faker');
// const mongoose = require('mongoose');

// const should = chai.should();

// const {app, runServer, closeServer} = require('../server');
// const {Topic} = require('../models/topic-model');
// const {User} = require('../models/user-model');
// const {TEST_DATABASE_URL} = require('../config');

// chai.use(chaiHttp);

// //***************************************
// //***************************************

// function seedTopicData(){
// 	console.info('seeding topic data');
// 	let seedData = [];

// 	for (let i=0; i<10; i++){
// 		seedData.push(generateUserData());
// 	}

// 	return User.insertMany(seedData)
// 		.then(users => {
// 			seedData = [];
// 			for (let i=0; i<10; i++){
// 				seedData.push(generateTopicData(users[i]));
// 			}
// 			return Topic.insertMany(seedData);
// 		})
// 		.catch(err => console.log(err));
// }; 

// function generateUserData() {
// 	return {
// 		username: faker.internet.userName(),
// 		password: faker.internet.password(),
// 		email: faker.internet.email(),
// 		inClub: faker.random.boolean()
// 	}
// };

// function generateTopicData(user) {
// 	return {
// 		theme: faker.lorem.words(),
// 		introduction: faker.lorem.paragraph(),
// 		user_id: user._id,
// 		keywords: [
// 			faker.lorem.word(),
// 			faker.lorem.word(),
// 			faker.lorem.word(),
// 			faker.lorem.word()
// 		],	
// 		questions: [
// 			faker.lorem.sentence(),
// 			faker.lorem.sentence(),
// 			faker.lorem.sentence(),
// 			faker.lorem.sentence(),
// 			faker.lorem.sentence()
// 		]		
// 	}	
// };

// function tearDownDb() {
// 	console.warn('Deleting database');
// 	return mongoose.connection.dropDatabase();
// };

// describe('Blog Api', function() {

// 	before(function() {
// 		return runServer(TEST_DATABASE_URL);
// 	});

// 	beforeEach(function() {
// 		return seedTopicData();
// 	});

// 	afterEach(function() {
// 		return tearDownDb();
// 	});

// 	after(function(){
// 		return closeServer();
// 	});

	


// });
