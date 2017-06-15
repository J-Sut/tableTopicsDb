const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

//schema for clubs

const clubSchema = mongoose.Schema({
	name: {type: String, unique: true,required: true},
	members: [{type: ObjectId, ref: 'User'}],
	location: {
			city: {type: String, required: false},
			country: {type: String, required: false}
	},
	website: {type: String, required: false}
});

clubSchema.methods.getObjectId = function(){
	return new ObjectId(this._id);
}

const Club = mongoose.model('Club', clubSchema);

module.exports = {Club};