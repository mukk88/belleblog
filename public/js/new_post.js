var myAppModule = angular.module('newPost', ['ui.tinymce']);

myAppModule.controller('NewPostController', function($scope, $http) {
  $scope.postContent = '';
  $scope.title = '';

  $scope.cancelPost = function() {
    window.location = '/'
  }

  $scope.submitPost = function() {
    var data = {
        postContent:$scope.postContent,
        title:$scope.title
    }
    console.log(data)
    $http.post('/api/post', JSON.stringify(data)).then(function(response){
        console.log(response.data)
        window.location = '/'
    })
    console.log('Editor content:', $scope.postContent);
  };

  $scope.tinymceOptions = {
    plugins: 'link image code',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
    plugins:'image media',
    media_live_embeds: true,
    height:"720"
  };
});