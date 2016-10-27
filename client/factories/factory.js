app.factory('sessionFactory', function($http, $location){
    var factory = {};
    factory.login = function(user){
        $http.post('/login', user).success(function(returnedSession){
        	if(returnedSession.status == false){
        		alert("Something went wrong")
        	}else{
				$location.url('/dashboard')
        	}
        })
    }
    factory.checkUser = function(callback){
        $http.get('/dashboard').success(function(returnedUserSession){
            if(returnedUserSession.status == false){
                $location.url('/')
            }else{
                callback(returnedUserSession.user)
            }
        })
    }
    factory.add_question = function(question){
        $http.post('/question/add', question)
        .then(function(data){
            $location.url('/dashboard')
        })
    }
    factory.get_questions = function (callback){
        $http.get('/get_questions')
        .then(function(returnedquestions){
            callback(returnedquestions.data);
        });
    }
    factory.getOnequestion = function (id, callback){
        $http.get('/getonequestion/' + id)
        .then(function(returnedonequestion){
            callback(returnedonequestion.data);
        });
    }
    factory.answer_question = function(id, answer){
        $http.post('/answer/add/'+ id, answer).success(function(data){
        })

    }
    factory.get_answers = function (id, callback){
        $http.get('/get_answers/' + id)
        .then(function(returnedAnswers){
            callback(returnedAnswers.data);
        });
    }
    factory.like = function(id, callback){
        $http.put('/like/' + id).then(function(returnedlike){
            callback(returnedlike.data)

            })
        }
    return factory;
})