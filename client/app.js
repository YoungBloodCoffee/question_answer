var app = angular.module('app', ['ngRoute'])
app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/index.html',
            controller: 'sessionController'
        })
        .when('/dashboard', {
            templateUrl: 'partials/dashboard.html',
            controller: 'sessionController'
        })
        .when('/add_question', {
            templateUrl: 'partials/add_question.html',
            controller: 'sessionController'
        })
        .when('/show/:id', {
            templateUrl: 'partials/show.html',
            controller: 'questionController'
        })
        .when('/answer_question/:id', {
            templateUrl: 'partials/answer.html',
            controller: 'questionController'
        })
        .otherwise({
            redirectTo: '/'
        })

})
