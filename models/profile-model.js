const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const profileSchema = mongoose.Schema({
	displayName: {type: String},
	bio: {type: String},
	photo: {type: String},
	user_id: {type: ObjectId, unique: true, ref:'User'},
	tmTitle: {type: String}
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = {Profile};