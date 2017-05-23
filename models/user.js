const mongoose = require('mongoose');


//schema for users

const userSchema = mongoose.Schema({
	username: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	email: {type: String, unique: true, required: false}
});

const User = mongoose.model('User', userSchema);

module.exports = User;