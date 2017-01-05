// services.js

angular.module('routerApp.services',['ngResource']).factory('scotchFactory', function($resource) {
  return $resource('scotches/:id'); // Note the full endpoint address
});











