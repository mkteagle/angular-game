(function() {
    'use strict';
    angular.module('loginService', [])
        .service('loginService', loginService);
    loginService.$inject = ['$timeout', '$state','$localStorage', 'gameService'];

    function loginService($timeout, $state, $localStorage, gameService) {
        var self = this;
        self.authData = {};
        self.recorded = gameService.recorded;
        self.storage = storage;
        self.facebookLogin = facebookLogin;
        self.googleLogin = googleLogin;
        self.createUser = createUser;
        self.authWithPassword = authWithPassword;
        self.logout = logout;
        var url = 'https://donut-click.firebaseio.com/';
        //var url = 'https://angular-game.firebaseio.com/';
        var ref = new Firebase(url);
        self.isUserLoggedIn = false;

        function storage() {
            self.isUserLoggedIn = true;
            $localStorage.isUserLoggedIn = self.isUserLoggedIn;
        }

        // ******** FACEBOOK LOGIN ********
        function facebookLogin() {
            ref.authWithOAuthPopup('facebook', function (error, authData) {
                if (error) {
                    console.log('Log in to Facebook Failed', error);
                    self.message = 'Log in to Facebook Failed. ' + error;
                } else {
                    console.log('Logged in to Facebook', authData);
                    self.message = 'Logged in to Facebook.';
                    $timeout(function () { // invokes $scope.$apply()
                        gameService.initPlayer();
                        self.isUserLoggedIn = true;
                        self.authData = authData.facebook;
                        gameService.recorded.name = self.authData.displayName;
                        gameService.recorded.img = self.authData.profileImageURL;
                        gameService.update();
                        self.storage();
                        $state.go('app.splash');
                    });
                }

            });
        }

        // ******** GOOGLE LOGIN ********
        function googleLogin() {
            ref.authWithOAuthPopup("google", function (error, authData) {
                if (error) {
                    console.log("Login to Google Failed!", error);
                    self.message = 'Log in to Google Failed. ' + error;
                } else {
                    console.log("Logged in to Google", authData);
                    self.message = 'Logged in to Google.';
                    $timeout(function () { // invokes $scope.$apply()
                        gameService.initPlayer();
                        self.isUserLoggedIn = true;
                        self.authData = authData.google;
                        self.recorded.name = gameService.playerName();
                        self.recorded.name = self.authData.displayName;
                        self.recorded.img = gameService.playerPic();
                        self.recorded.img = self.authData.profileImageURL;
                        gameService.player.$save(self.recorded);
                        $state.go('app.splash');
                    });
                }
            });
        }


        // ******** EMAIL LOGIN ********
        //var ref = new Firebase("https://angular-game.firebaseio.com");

        function createUser(email, password) {

            ref.createUser({
                email: email,
                password: password
            }, function (error, userData) {
                if (error) {
                    console.log("Error creating user:", error);
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                    self.storage();
                    self.isUserLoggedIn = true;
                    $timeout(function () {
                        $state.go('app.splash');
                    })
                }
            });
        }

        function authWithPassword(email, password) {

            ref.authWithPassword({
                email: email,
                password: password
            }, function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    self.message = 'Logged into Game';
                    self.storage();
                    self.isUserLoggedIn = true;
                    $timeout(function () {
                        $state.go('app.splash');
                    })
                }
            });

        }

        function logout() {
            ref.unauth();
            console.log('User is logged out');
            $state.go('app.login');
        }
    }


})();
