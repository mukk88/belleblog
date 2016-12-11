var myAppModule = angular.module('index', ['ngSanitize']);

myAppModule.controller('IndexController', function($scope, $http) {
    $scope.posts = '';

    $http.get('/api/post').then(function(response){
        console.log(response.data.data)
        $scope.posts = response.data.data
    })

    $scope.newPost = function() {
        window.location = '/newpost'
    }

});