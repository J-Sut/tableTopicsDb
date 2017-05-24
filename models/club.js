const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

//schema for clubs

const clubSchema = mongoose.Schema({
	name: {type: String, unique: true,required: true},
	members: [{type: ObjectId, ref: 'User'}],
	location: {
			city: {type: String, required: true},
			country: {type: String, required: true}
	},
	website: {type: String, required: false}
});

const Club = mongoose.model('Club', clubSchema);

module.exports = {Club};