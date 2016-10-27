var session = require('./../controllers/session.js')

module.exports=function(app){
    app.post('/login', function(req, res){
        session.login(req, res);
    })
    app.get('/dashboard', function(req, res){
    	session.checkUser(req, res);
    })
    app.get('/logout', function(req, res){
        session.logout(req, res);
    })
    app.get('/question', function(req, res){
        session.checkUser(req, res)
    })
    app.post('/question/add', function(req, res){
        session.add_question(req, res)
    })
    app.get('/get_questions', function(req, res){
        session.get_questions(req, res)
    })
    app.get('/getonequestion/:id', function(req, res){
        session.getOnequestion(req, res)
    })
    app.post('/answer/add/:id', function(req, res){
        session.answer_question(req, res)
    })
    app.get('/get_answers/:id', function(req, res){
        session.get_answers(req, res)
    })
    app.put('/like/:id', function(req, res){
        session.like(req, res)
    })
}