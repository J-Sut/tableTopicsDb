const mongoose = require('mongoose');

//schema for clubs

const clubSchema = mongoose.Schema({
	name: {type: String, required: true},
	members: [{type: ObjectId, ref: 'User'}],
	location: {
			city: {type: String, required: true},
			country: {type: String, required: true}
	}
	website: {type: String, required: false}
});

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;