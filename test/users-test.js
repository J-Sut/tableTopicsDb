// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const faker = require('faker');

// const {app} = require('../server');

// const should = chai.should();

// chai.use(chaiHttp);

// // Get a list of all users - Test
// describe('Get a list of all users (GET /users)', function() {
// 	it('should return an array of all the Db Users', function(){
// 		return chai.request(app)
// 			.get('/users')
// 			.then(function(res) {
// 				const expectedKeys = ['username', 'email'];
// 				const	unexpectedKeys = ['password', 'inClub', 'memberClubList'];

// 				res.should.have.status(200);
// 				res.should.be.json;
// 				res.body.should.be.an('array');
							
// 				res.body.forEach(function(item){
// 					item.should.be.an('object');
// 					item.should.include.keys(expectedKeys);
// 					item.should.not.include.keys(unexpectedKeys);
// 				});
// 			})
// 	});	
// });

// // Get a user Profile by Id - Test

// // describe('Get the profile of the logged in User (GET /users/:id/topics)', function() {
// // 	it("should return an object with profile info", function(){
// // 		return chai.request(app)
// // 			.get('/users/profile/me')
// // 			.then(function(res) {
// // 				const expectedKeys = ['_id', 'theme', 'introduction', 'user_id', 'questions', 'keywords'];

// // 				res.should.have.status(200);
// // 				res.should.be.json;
// // 				res.body.should.be.an('array');
// // 				res.body.forEach(function(item){
// // 					item.should.be.an('object');
// // 					item.should.include.keys(expectedKeys);
// // 					item.questions.should.be.an('array');
// // 					item.keywords.should.be.an('array');
// // 				});
// // 			})
// // 	});	
// // });


// // Return list of profiles - Test 

// describe('Get the profile of the logged in user (GET /users/profiles)', function() {
// 	it('should return an array of objects', function(){
// 		return chai.request(app)
// 			.get('/users/profiles')
// 			.then(function(res) {
// 				const expectedKeys = ['_id','displayName', 'bio', 'photo', 'user_id'];

// 				res.should.have.status(200);
// 				res.should.be.json;
// 				res.body.should.be.an('array');
				
// 				res.body.forEach(function(item){
// 					item.should.be.an('object');
// 					item.should.include.keys(expectedKeys);
// 				});
// 			})
// 	});
// });


// // Get Session Login Token - Test

// describe('Get the log in token of the current user (GET /token)', function() {
// 	it('should return a string', function(){
// 		return chai.request(app)
// 			.get('/users/token')
// 			.then(function(res) {
// 				res.should.have.status(200);
// 				res.should.be.json;
// 				res.body.should.be.an('string');
// 			})
// 	});
// });


// // Get Topics submitted by User Id - Test

// describe('Get a list of all topics by a User Id (GET /users/:id/topics)', function() {
// 	it("should return an array of all a user's topics", function(){
// 		return chai.request(app)
// 			.get('/users/59458354ceb37633c56d4589/topics')
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



// // ************* User POST Endpoints - Tests *************

// // Create a New User - Test

// // describe('Create a new user, user profile, and club if it doesnt already exit (POST /users/)', function() {
// // 	it("should return an object with the new user's info", function(){
// // 		return chai.request(app)
// // 			.post('/users/')
// // 			.then(function(res) {
// // 				const expectedKeys = ['userName', 'email', 'inClub', 'user_id', 'tmTitle'];
// // 				const	unexpectedKeys = ['password', 'passwordConf'];

// // 				res.should.have.status(201);
// // 				res.should.be.json;
// // 				res.body.should.be.an('object');

// // 				res.body.forEach(function(item){
// // 					item.should.be.a('string');
// // 					item.should.include.keys(expectedKeys);
// // 					item.should.not.include.keys(unexpectedKeys);

// // 				});
// // 			})
// // 	});	
// // });

// // Begin User Login Session






// //Create user Profile





// // ************* User PUT Endpoints *************

// // Update profile information


// // Update User information


// // ************* User DELETE Endpoints *************

// // Delete a User profile





// //Delete an existing User




// // End User Session















