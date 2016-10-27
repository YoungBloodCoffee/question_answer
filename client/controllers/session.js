app.controller('sessionController', function($scope, sessionFactory, $location, $routeParams){
	sessionFactory.checkUser(function(user){
		$scope.currentUser = user
		if(!$scope.currentUser){
			$location.url('/')
		}		
	})
    $scope.login = function(){
    	if(!$scope.user){
    		alert("Name is invalid")
    	}else if($scope.user.name.length < 2){
    		alert("Name is invalid")
    	}else{
    		sessionFactory.login($scope.user)
    	}
    }
    $scope.add_question = function(){

        if(!$scope.Q){
            alert("Invalid form submission")

        }else if(!$scope.Q.question){
            alert("Question field blank")

        }else if($scope.Q.question.length < 10){
            alert("Question field invalid")

        }else{
            $scope.Q._user = $scope.currentUser._id
            $scope.Q._user_name = $scope.currentUser.name
            $scope.Q.counter = 0
            sessionFactory.add_question($scope.Q)
            $scope.Q = {};
            $location.url('/dashboard')
        }
    }
    sessionFactory.get_questions(function(Returnedquestions){
        $scope.questions = Returnedquestions;
    })
})