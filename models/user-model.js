const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

//schema for users

const userSchema = mongoose.Schema({
	username: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	email: {type: String, unique: true, required: false},
	inClub: {type: Boolean, required: true},
	memberClubList: {type: Array, required: false}
});

const User = mongoose.model('User', userSchema);

module.exports = {User};