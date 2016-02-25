(function() {
    'use strict';
    angular.module('loginService', [])
        .service('loginService', loginService);
    loginService.$inject = ['$firebaseAuth', '$firebaseObject','$timeout', '$state', '$ionicHistory', 'firebaseUrl'];

    function loginService($firebaseAuth, $firebaseObject, $timeout, $state, $ionicHistory, firebaseUrl) {
        var self = this;
        self.createUser = createUser;
        self.authWithPassword = authWithPassword;
        self.logout = logout;
        self.isUserLoggedIn = false;
        self.isLoggedIn = false;
        self.firebaseAuthLogin = firebaseAuthLogin;
        var ref = new Firebase(firebaseUrl);
        self.authObj = $firebaseAuth(ref);
        //self.gameService = gameService.recorded;


        ////initialize and get current authenticated state:
        init();

        function init(){
            self.authObj.$onAuth(function(authData) {
                if(self.authObj.$getAuth()) {
                    self.isLoggedIn = true;
                    self.user = $firebaseObject(ref.child('users').child(authData.uid));
                    self.newUser = {};
                    self.user.$loaded().then(function () {
                           if (authData.google) {
                                self.newUser.name = authData.google.displayName;
                                self.newUser.img = authData.google.profileImageURL;
                               self.id = authData.uid;
                                self.gameState(self.id);
                            }
                            if (authData.facebook) {
                                self.newUser.name = authData.facebook.displayName;
                                self.newUser.img = authData.facebook.profileImageURL;
                                self.id = authData.uid;
                                self.gameState(self.id);
                            }
                    });
                    self.id = authData.uid;
                    console.log(self.user);
                    self.gameState(self.id);
                }

            });
            //if (self.authObj.$getAuth()){
            //    self.isLoggedIn  = true;
            //    console.log(self.authObj);
            //    //self.user = self.authObj.$getAuth();
            //    console.log(self.user);
            //    $state.go('app.splash');
            //}
        }
        self.initPlayer = function() {
            return self.id;
        };
        self.gameState = function (id) {
            //self.newUser.gameplay = self.gameService;
            console.log(id);
            self.user.$ref().set(self.newUser);
        };

        //function authDataCallback(authData) {
        //    self.user = $firebaseObject(ref.child('users').child(authData.uid));
        //    if (authData) {
        //        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        //        self.isLoggedIn = true;
        //        self.user = $firebaseObject(ref.child('users').child(authData.uid));
        //        console.log(self.user);
        //        self.user.$loaded().then(function () {
        //            if (self.user.name == undefined) {
        //                if (authData.google) {
        //                    console.log(authData.google);
        //                    self.newUser.name = authData.google.displayName;
        //                    self.newUser.img = authData.google.profileImageURL;
        //                }
        //                if (authData.facebook) {
        //                    self.newUser.name = authData.facebook.displayName;
        //                    self.newUser.img = authData.facebook.profileImageURL;
        //
        //                }
        //                self.user.$ref().set(self.newUser);
        //            }
        //            //self.newUser.game = 'George';
        //            //self.user.$ref().set(self.newUser);
        //            ////self.user.$save();
        //        });
        //
        //    } else {
        //        console.log("User is logged out");
        //        self.isLoggedIn = false;
        //    }
        //}

        //function update () {
        //    self.user.$ref();
        //}
        //function storage() {
        //    self.isUserLoggedIn = true;
        //    $localStorage.isUserLoggedIn = self.isUserLoggedIn;
        //}
        // ******** FACEBOOK LOGIN ********
        //function facebookLogin(isUserLoggedIn) {
        //    ref.authWithOAuthPopup('facebook', function (error, authData) {
        //        if (error) {
        //            console.log('Log in to Facebook Failed', error);
        //            self.message = 'Log in to Facebook Failed. ' + error;
        //        }
        //        else {
        //            console.log('Logged in to Facebook', authData);
        //            self.message = 'Logged in to Facebook.';
        //            $timeout(function () { // invokes $scope.$apply()
        //                gameService.initPlayer().then(function () {
        //                    self.isUserLoggedIn = true;
        //                    self.authData = authData.facebook;
        //                    self.recorded = gameService.recorded;
        //                    self.recorded.name = gameService.playerName();
        //                    self.recorded.name = self.authData.displayName;
        //                    self.recorded.img = gameService.playerPic();
        //                    self.recorded.img = self.authData.profileImageURL;
        //                    gameService.player.$save(self.recorded);
        //                    $state.go('app.splash');
        //                });
        //            });
        //        }
        //    });
        //}
       function firebaseAuthLogin (provider) {
            self.authObj.$authWithOAuthPopup(provider).then(function (authData) {
                console.log("Authenticated successfully with provider " + provider +" with payload:", authData);
                $state.go('app.splash');
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });

        }

        self.googleLogin = function () {
            self.firebaseAuthLogin('google');
        };
        self.facebookLogin = function () {
            self.firebaseAuthLogin('facebook');
        };

        //// ******** GOOGLE LOGIN ********
        //function googleLogin() {
        //    ref.authWithOAuthPopup("google", function (error, authData) {
        //        if (error) {
        //            console.log("Login to Google Failed!", error);
        //            self.message = 'Log in to Google Failed. ' + error;
        //        } else {
        //            console.log("Logged in to Google", authData);
        //            self.message = 'Logged in to Google.';
        //            $timeout(function () { // invokes $scope.$apply()
        //                gameService.initPlayer().then(function(){
        //                    self.isUserLoggedIn = true;
        //                    self.authData = authData.google;
        //                    self.recorded = gameService.recorded;
        //                    self.recorded.name = gameService.playerName();
        //                    self.recorded.name = self.authData.displayName;
        //                    self.recorded.img = gameService.playerPic();
        //                    self.recorded.img = self.authData.profileImageURL;
        //                    gameService.player.$save(self.recorded);
        //                    $state.go('app.splash');
        //                });
        //            });
        //        }
        //    });
        //}
        //// ******** EMAIL LOGIN ********
        ////var ref = new Firebase("https://angular-game.firebaseio.com");

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
            $ionicHistory.nextViewOptions({historyRoot: true});
            $state.go('app.login');
        }
    }


})();
