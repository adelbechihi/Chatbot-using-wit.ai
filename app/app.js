'use strict';

var app = angular.module('jobpal', ['ngRoute']);
app.server = 'http://localhost:3000/';
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/chat_view.html',
            controller: 'ChatCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});