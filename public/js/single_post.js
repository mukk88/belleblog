var myAppModule = angular.module('singlePost', ['ngSanitize']);

myAppModule.controller('SinglePostController', function($scope, $http, $location, $sce) {
    $scope.postHtml = '';
    $scope.title = '';

    var locationSplit = $location.absUrl().split('/')
    var id = locationSplit[locationSplit.length - 1]
    console.log(id)

    $http.get('/api/post/' + id).then(function(response){
        console.log(response.data.postContent)
        $scope.postHtml = $sce.trustAsHtml(response.data.postContent)
        $scope.title = response.data.title
    })

    $scope.home = function() {
        window.location = '/'
    }

    $scope.edit = function() {
        window.location = '/edit/' + id
    }

});