const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const topicSchema = mongoose.Schema({
	theme: {type: String, required: true},
	introduction: {type: String, required: true},
	keywords: [{type: Array}],
	questions: [{type: Array}],
	user_id: {type: ObjectId, ref:'User'}
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = {Topic};


