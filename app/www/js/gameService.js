(function() {
    'use strict';
    angular.module('gameService', [])
        .service('gameService', gameService);

    gameService.$inject = ['ngToast', '$firebaseAuth', '$firebaseObject', '$timeout', '$state', '$ionicHistory', 'firebaseUrl'];


    function gameService (ngToast, $firebaseAuth, $firebaseObject, $timeout, $state, $ionicHistory, firebaseUrl) {
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
        self.newUser = {};
        self.id = '';
        self.incrementClicker = incrementClicker;
        self.clickGrandpa = clickGrandpa;
<<<<<<< HEAD
        self.firebaseAuthLogin = firebaseAuthLogin;
=======

>>>>>>> master
        for (var i = 1; i < 1000; i++) {
            self.upgrades.push({id: i, goal: self.goal});
            self.goal = self.goal * 2;
        }
        self.recorded = {};
        self.init = init;
        init();

        self.recorded = {counter: 0, countdown: self.upgrades[self.index].goal, level: self.upgrades[self.index].id + 'x', goal: self.upgrades[self.index].goal, clicker: 0, grandpa: 0};

        function init(){
            self.authObj.$onAuth(function(authData) {
                if(self.authObj.$getAuth()) {
                    self.id = authData.uid;
                    self.isLoggedIn = true;
                    self.user = $firebaseObject(ref.child('users').child(self.id));
                    self.user.$loaded().then(function () {
                        if(self.user.name == undefined) {
                            if (authData.google) {
                                self.newUser.name = authData.google.displayName;
                                self.newUser.img = authData.google.profileImageURL;
                                self.user.$ref().set(self.newUser);
                            }
                            if (authData.facebook) {
                                self.newUser.name = authData.facebook.displayName;
                                self.newUser.img = authData.facebook.profileImageURL;
                                self.user.$ref().set(self.newUser);
                            }
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

        function incrementCountdown () {
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
        function incrementCounter () {
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
<<<<<<< HEAD
=======
        function initPlayer () {
            self.level = '1x';
            return(self.player.$add({name: self.recorded.name, img: self.recorded.img, counter: self.recorded.counter, date: Date.now(), level: self.level, id: self.recordId, countdown: self.upgrades[self.index].goal, upgrade: false, goal: self.upgrades[self.index].goal, clicker: self.recorded.clicker, grandpa: self.recorded.grandpa}).then(function(ref) {
                self.recordId = ref.key();
                self.recorded = self.player.$getRecord(self.recordId);
                self.recorded.id = self.recordId;
                self.player.$save(self.recorded);
            }));
        }
        function update() {
            self.player.$save(self.recorded);
            self.leaderBoard.$save(self.recorded);
        }

>>>>>>> master
    }

})();
