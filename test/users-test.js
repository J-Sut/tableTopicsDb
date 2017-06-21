const chai = require('chai');
const chaiHttp = require('chai-http');

const {app} = require('../server');

const should = chai.should();

chai.use(chaiHttp);


// Should Get a list of all users
describe('Get a list of all users (GET /users)', function() {
	it('should return an array of all the Db Users', function(){
		return chai.request(app)
			.get('/users')
			.then(function(res) {
				const expectedKeys = ['username', 'email'];
				const	unexpectedKeys = ['password', 'inClub', 'memberClubList'];

				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.an('array');
				
				res.body.forEach(function(item){
					item.should.be.an('object');
					item.should.include.keys(expectedKeys);
					item.should.not.include.keys(unexpectedKeys);
				});
			})
	});



	
});