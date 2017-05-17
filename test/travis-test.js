const chai = require('chai');
const chaiHttp = require('chai-http');

const {app} = require('../server');

const should = chai.should();

chai.use(chaiHttp);


describe('Get test for init setup', function() {

	it('should return something 200', function(){
		return chai.request(app)
			.get('/')
			.then(function(res) {
				res.should.have.status(200);
			})
	});
});