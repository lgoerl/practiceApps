angular.module('routerApp.services').factory('scotchFactory', function($resource) {
  return $resource('http://0.0.0.0:5000/scotches/:id'); // Note the full endpoint address
});











