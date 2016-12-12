var myAppModule = angular.module('newPost', ['ui.tinymce']);

myAppModule.controller('NewPostController', function($scope, $http) {
    $scope.postContent = '';
    $scope.title = '';
    $scope.private = false;
    $scope.postImage = 'http://xpenology.org/wp-content/themes/qaengine/img/default-thumbnail.jpg';

    $scope.cancelPost = function() {
        window.location = '/'
    }

    var postData = function(data) {
        console.log(data)
        if ($scope.private) {
            data["private"] = true;
        } else {    
            data["private"] = false;
        }
        data["timestamp"] = new Date()
        data["image"] = $scope.postImage
        $http.post('/api/post', JSON.stringify(data)).then(function(response){
            console.log(response.data)
            window.location = '/'
        })
    }

    $scope.savePost = function() {
        var data = {
            postContent:$scope.postContent,
            title:$scope.title,
            status:'draft'
        }
        postData(data)
    }

    $scope.submitPost = function() {
        var data = {
            postContent:$scope.postContent,
            title:$scope.title,
            status:'done'
        }
        postData(data)

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