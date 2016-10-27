var mongoose = require('mongoose')
var User = mongoose.model('User');
var Question = mongoose.model('Question')
var Answer = mongoose.model('Answer')


module.exports = (function(){
	return {
		login: function(req, res){
			User.findOne({name: req.body.name},function(err, user){
				if(!user){
					var user = new User(req.body)
					user.save(function(err, user){
						if(err){
							res.json({status: false})
						}else{
						res.json({status: true})
						req.session.user = user
						req.session.save()
						}
					})
				}else{
					if(err){
						res.json({status: false})
					}else{
						res.json({status: true})
						req.session.user = user
						req.session.save()
					}
				}
			})
		},
		checkUser: function(req, res){
			if(!req.session.user){
				res.json({status: false})
			}else{
				res.json({status: true, user: req.session.user})
			}
		},
		logout: function(req, res){
			req.session.user = null
			res.redirect('/')
		},
		add_question: function(req, res){
			var question = new Question(req.body);
			question.save(function(err, Q){
				if(err){
					console.log(err)		
				}else{
					User.findOne({_id: req.body._user}, function(err, user){
						if(err){
							console.log(err)
						}else{
							user._question.push(Q)
							user.save(function(err, user){
								if(err){
									console.log(err)
								}else{
									res.json(user)
								}
							})
						}
				
					})
				}
			})
		},
		get_questions: function (req, res){
			Question.find(function(err, questions){
				if (err){
					console.log(err)
				}else{

					res.json(questions)
				}
			})
		},
		getOnequestion: function (req, res){
			Question.findOne({_id: req.params.id},function(err, One_question){
					if (err){
						console.log(err)
					}else{
						res.json(One_question)
					}
			})
		},
		answer_question: function(req, res){
			var answer = new Answer(req.body);
			answer.save(function(err, newanswer){
				if(err){
					console.log(err)
					return res.json({status: false})
				}else{
					Question.findOne({_id:req.params.id}, function(err1, question){
						question.answers.push(newanswer);
						question.save(function(err2){
							if(err2){
								console.log(err2)
							}else {
								User.findOne({_id: req.body._user}, function(err, user){
									if(err){
										console.log(err)
									}else{
										user._answer.push(newanswer)
										user.save(function(err, user){
											if(err){
												console.log(err)
											}else{
												return res.json({status: true, answer: newanswer, question: question})
						
											}
										})
									}
								})
							}
						})
					})
				}
			})
		},
		get_answers: function (req, res){
			Question.findOne({_id:req.params.id})
				.populate('answers')
				.populate({
					path: 'answers',
					populate: {path: '_user'}
				})
				.exec(function(err, question){
					if (err){
						console.log(err)
					}else{
						res.json(question)
					}
				})
		},
		like: function(req, res){
			console.log(req.params.id)
			Answer.findOne({_id: req.params.id}, function(err, answer){
				if(err){
				}
				else{
					answer.likes += 1
					answer.save(function (err, answer){
						if(err){
						}
						else{
							res.json(answer)
						}
					})
				}
			})
		},
	}
})()