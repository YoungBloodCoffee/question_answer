var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name:{type: String},
	_question: [{type: Schema.Types.ObjectId, ref:'Question'}],
	_answer: [{type: Schema.Types.ObjectId, ref:'Answer'}],
})

var QuestionSchema = new Schema({
	question:{type: String},
	description:{type: String},
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	_user_name: {type: String},
	counter:{type: Number},
	answers: [{
		type: Schema.Types.ObjectId,
		ref: 'Answer'
	}]
})

var AnswerSchema = new Schema({
	answer:{type:String},
	support:{type:String},
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	_question: [{type: Schema.Types.ObjectId, ref: "Question"}],
	likes:{type: Number}
}, {timestamps: true});

mongoose.model('Answer', AnswerSchema)
mongoose.model('Question', QuestionSchema)
mongoose.model('User', UserSchema)