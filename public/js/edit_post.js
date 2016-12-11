var myAppModule = angular.module('editPost', ['ui.tinymce']);

myAppModule.controller('EditPostController', function($scope, $http, $location, $sce) {
  $scope.postContent = '';
  $scope.title = '';

  var locationSplit = $location.absUrl().split('/')
  var id = locationSplit[locationSplit.length - 1]
  console.log(id)

  $http.get('/api/post/' + id).then(function(response){
      console.log(response.data.postContent)
      $scope.postContent = $sce.trustAsHtml(response.data.postContent)
      $scope.title = response.data.title
  })

  $scope.cancelPost = function() {
    window.location = '/post/' + id
  }

  $scope.submitPost = function() {
    var data = {
        postContent:$scope.postContent,
        title:$scope.title
    }
    console.log(data)
    $http.post('/api/post/' + id, JSON.stringify(data)).then(function(response){
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