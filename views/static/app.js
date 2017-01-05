// app.js


// Main app

var routerApp = angular.module('routerApp', ['ui.router', 'routerApp.services']);


routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: '../static/partials/partial-home.html'
        })

        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: '../static/partials/partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })

        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })


        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: '../static/partials/partial-about.html' },

                // the child views will be defined here (absolutely named)
                'columnOne@about': { template: 'Look I am a column!' },

                // for column two, we'll define a separate controller 
                'columnTwo@about': { 
                    templateUrl: '../static/partials/table-data.html',
                    controller: 'scotchController'
                }
            }      
            })

        //SCOTCH PAGES AND VIEWS
        .state('scotch_list', {
            url: '/scotch',
            templateUrl: '../static/partials/scotch.html'
        })
        
        .state('scotch_list.list', {
            url: '/list',
            templateUrl: '../static/partials/scotch-list.html',
            controller: 'scotchListController'
        });
        
});






// Controllers

routerApp.controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
})

    .controller('scotchListController', function($scope, scotchFactory) {
  $scope.scotchList = scotchFactory.query(); //fetch all scotches by issuing a GET to /scotches api

});