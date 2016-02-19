// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'homeCtrl', 'ngToast', 'firebase', 'homeService', 'app.login', 'ngStorage', 'loginService'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'loginController as vm'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.email', {
        url: '/registerEmail',
        views: {
            'menuContent': {
                templateUrl: 'templates/registerEmail.html',
                controller: 'loginController as vm'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.game', {
        url: '/game',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'homeController'
            },
            'fabContent': {
                template: ''
            }
        }
    })
        .state('app.splash', {
            url: '/splash',
            views: {
                'menuContent': {
                    templateUrl: 'templates/splash.html',
                    controller: 'homeController'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
