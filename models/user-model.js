const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

//schema for users

const userSchema = mongoose.Schema({
	username: {type: String, unique: false, required: false},
	password: {type: String, required: true},
	email: {type: String, unique: true, required: true},
	inClub: {type: Boolean, required: false},
	memberClubList: {type: Array, required: false}
});

userSchema.methods.apiRepr = function(){
	return {
		id: this._id,
		username: this.username,
		email: this.email
	}
}

const User = mongoose.model('User', userSchema);

module.exports = {User};