(function () {
    'use strict';
    angular.module('gameService', [])
        .service('gameService', gameService);

    gameService.$inject = ['ngToast', '$firebaseAuth', '$firebaseObject', '$timeout', '$state', '$ionicHistory', 'firebaseUrl', '$ionicSideMenuDelegate'];


    function gameService(ngToast, $firebaseAuth, $firebaseObject, $timeout, $state, $ionicHistory, firebaseUrl, $ionicSideMenuDelegate) {
        var self = this;
        var url = 'https://donut-click.firebaseio.com/';
        var ref = new Firebase(firebaseUrl);
        self.authObj = $firebaseAuth(ref);
        self.initPlayer = initPlayer;
        self.incrementCounter = incrementCounter;
        self.recordId = null;
        self.id = null;
        self.updated = 100;
        self.showToast = showToast;
        self.incrementCountdown = incrementCountdown;
        self.updatePlayer = updatePlayer;
        self.playerName = playerName;
        self.playerPic = playerPic;
        self.upgrades = [];
        self.index = 0;
        self.goal = 1000;
        self.user = {};
        self.newUser = {name:"joe"};
        self.id = '';
        self.incrementClicker = incrementClicker;
        self.clickGrandpa = clickGrandpa;
        self.firebaseAuthLogin = firebaseAuthLogin;
        self.logout = logout;
        self.getUser = getUser;
        for (var i = 1; i < 1000; i++) {
            self.upgrades.push({id: i, goal: self.goal});
            self.goal = self.goal * 2;
        }
        self.recorded = {
            counter: 0,
            countdown: self.upgrades[self.index].goal,
            level: self.upgrades[self.index].id + 'x',
            goal: self.upgrades[self.index].goal,
            clicker: 0,
            grandpa: 0
        };
        self.init = init;
        init();

        function logout() {
            ref.unauth();
            console.log('User is logged out');
            $ionicSideMenuDelegate.toggleRight();
            $ionicHistory.nextViewOptions({historyRoot: true});
            $state.go('app.login');
        }

        function getUser() {
            return self.newUser;
        }

        function init() {
            self.authObj.$onAuth(function (authData) {
                if (self.authObj.$getAuth()) {
                    self.id = authData.uid;
                    self.isLoggedIn = true;

                    self.user = $firebaseObject(ref.child('users').child(self.id));
                    self.user.$loaded().then(function () {
                        if (self.user.name == undefined) {
                            if (authData.google) {
                                //$timeout(function () {
                                    self.newUser.name = authData.google.displayName;
                                    self.newUser.img = authData.google.profileImageURL;
                                //});

                                self.user.$ref().set(self.newUser);
                                self.user.gameplay = self.recorded;
                                self.gameState();
                                self.google = true;
                                console.log(self.user);
                            }
                            if (authData.facebook) {
                                self.newUser.name = authData.facebook.displayName;
                                self.newUser.img = authData.facebook.profileImageURL;
                                self.user.$ref().set(self.newUser);
                                self.user.gameplay = self.recorded;
                                self.gameState();
                                self.facebook = true;
                                console.log(self.user);
                            }
                            //if (authData.email) {
                            //    self.newUser.name = authData.email.displayName;
                            //    self.newUser.img = authData.email.profilePicURL;
                            //    self.user.$ref().set(self.newUser);
                            //    self.user.gameplay = self.recorded;
                            //    self.gameState();
                            //    self.email = true;
                            //    console.log(self.user);
                            //}
                        }
                        self.recorded = self.user.gameplay;
                        self.gameState();
                    });
                }

            });
        }

        self.gameState = function () {
            self.user.$ref().child('gameplay').update(self.recorded);
        };

        function firebaseAuthLogin(provider) {
            self.authObj.$authWithOAuthPopup(provider).then(function (authData) {
                console.log("Authenticated successfully with provider " + provider + " with payload:", authData);
                init();
                $ionicHistory.nextViewOptions({historyRoot: true});
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
        function initPlayer() {
            console.log('caught you');
        }

        function playerName() {
            return self.recorded.name;
        }

        function playerPic() {
            return self.recorded.img;
        }

        function showToast() {
            ngToast.create({
                className: 'success',
                content: self.recorded.level
            });
        }

        function incrementClicker(cost) {
            self.recorded.clicker++;
            self.recorded.counter = self.recorded.counter - cost;
            self.recorded.countdown = self.recorded.goal - self.recorded.counter;
            self.gameState();
            return self.recorded.clicker;
        }

        function clickGrandpa(cost) {
            self.recorded.grandpa = self.recorded.grandpa + 10;
            self.recorded.counter = self.recorded.counter - cost;
            self.recorded.countdown = self.recorded.goal - self.recorded.counter;
            console.log(self.recorded);
            console.log(self.recorded.grandpa);
            self.gameState();
            return self.recorded.grandpa;
        }

        function incrementCountdown() {
            if (self.recorded.countdown <= 0) {
                self.recorded.upgrade = true;
                self.gameState();
                return self.recorded.countdown = 0;
            }
            else if (self.recorded.counter < self.upgrades[self.index].goal) {
                self.recorded.countdown = self.recorded.countdown - Number(self.upgrades[self.index].id);
                self.gameState();
                return self.recorded.countdown;
            }
            else {
                self.recorded.upgrade = true;
                self.recorded.countdown = self.recorded.countdown - Number(self.upgrades[self.index].id);
                self.gameState();
                return self.recorded.countdown;
            }
        }

        function updatePlayer() {
            self.recorded.counter = self.recorded.counter - self.upgrades[self.index].goal;
            self.index++;
            self.recorded.upgrade = false;
            self.recorded.countdown = self.upgrades[self.index].goal;
            self.recorded.goal = self.upgrades[self.index].goal;
            self.recorded.level = self.upgrades[self.index].id + 'x';
            self.gameState();
        }

        function incrementCounter() {
            if (self.recorded.counter < self.upgrades[self.index].goal) {
                self.recorded.counter = self.recorded.counter + self.upgrades[self.index].id;
                self.showToast();
                self.gameState();
                return self.recorded.counter;
            }
            else {
                self.recorded.counter = self.recorded.counter + self.upgrades[self.index].id;
                self.showToast();
                self.gameState();
                return self.recorded.counter;
            }

        }
    }

})();
