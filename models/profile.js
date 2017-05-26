const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const profileSchema = mongoose.Schema({
	displayName: {type: String, required: true},
	bio: {type: String, required: true},
	photo: {type: String},
	user_id: {type: ObjectId, ref:'User'}
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = {Profile};