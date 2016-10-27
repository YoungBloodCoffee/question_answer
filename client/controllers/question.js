app.controller('questionController', function($scope, sessionFactory, $location, $routeParams){

    sessionFactory.getOnequestion($routeParams.id, function(ReturnedOnequestion){
        $scope.One_question = ReturnedOnequestion;
    })
	sessionFactory.checkUser(function(user){
		$scope.currentUser = user
		if(!$scope.currentUser){
			$location.url('/')
		}		
	})
	$scope.answer_question = function(){
		if(!$scope.A){
			alert("Invalid answer submission")

		}else if(!$scope.A.answer){
			alert("Answer fields blank")

		}else if($scope.A.answer.length < 5){
			alert("Answer field invalid")

		}else{
			$scope.A._user = $scope.currentUser._id
			sessionFactory.answer_question($routeParams.id, $scope.A)
			$scope.A = {};
			$location.url('/dashboard')

		}
	}
    sessionFactory.get_answers($routeParams.id, function(Returnedanswers){
		$scope.answers = Returnedanswers;
	})
	$scope.like = function(id){
		sessionFactory.like($scope.likes, function(returnedlike){
			location.reload(true)
		})

	}
})