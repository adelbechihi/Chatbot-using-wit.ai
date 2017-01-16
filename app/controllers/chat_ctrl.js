'use strict';

app.controller('ChatCtrl', function ($rootScope, $scope, $route, $http) {
    $rootScope.conversation = [];
    $scope.newPostBot = {};
    $scope.postNew = function(){
        if($scope.newPost){
            $scope.newPost.senderName = "Adel Bechihi";
            $scope.newPost.sender = "me";
            $scope.newPost.date = new Date();
            $rootScope.conversation.push($scope.newPost);
            $http.post('http://localhost:3000/api/sendmsg', $scope.newPost).then(function(response){
                console.log((response))
                $scope.newPostBot.senderName = "Mr Bot";
                $scope.newPostBot.sender = "bot";
                $scope.newPostBot.date = new Date();
                $scope.newPostBot.content = response.data.msg;
                $rootScope.conversation.push($scope.newPostBot);
                $scope.newPostBot = {};
                $scope.newPost = {};

            }).catch(function(error){
                console.log(error);
            });
        }
    };
});