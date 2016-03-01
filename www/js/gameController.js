(function() {
    'use strict';

    angular.module('gameController', [])
        .controller('gameController', gameController);
    gameController.$inject = ['gameService', '$timeout'];

    function gameController(gameService, $timeout) {
        var self = this;
        //I got this code here: http://ionden.com/a/plugins/ion.sound/en.html to make the sound for the button
        ion.sound({
            sounds: [
                {
                    alias: "snap",
                    name: "snap",
                    path: "../www/lib/ion-sound/sounds/",
                    volume: 0.9,
                    preload: false
                }
            ],
            path: "../www/lib/ion-sound/sounds/",
            preload: true,
            multiplay: true
        });
        self.incrementCounter = incrementCounter;
        self.level = gameService.level;
        self.getChange = getChange;
        self.selected = gameService.recorded;
        self.selectPlayer = selectPlayer;
        self.countdown = gameService.recorded.countdown;
        self.counter = gameService.recorded.counter;
        self.clicker = gameService.recorded.clicker;
        self.goal = gameService.recorded.goal;
        self.updatePlayer = updatePlayer;
        self.playSound = playSound;
        self.incrementCountdown = incrementCountdown;
        self.loginData = {};
        self.isExpanded = false;
        self.hasHeaderFabLeft = false;
        self.hasHeaderFabRight = false;
        self.logout = logout;
        self.getName = getName;
        self.img = '';
        self.name = '';
        self.gameService = gameService;

        function playSound () {
            ion.sound.play("snap");
        }
        function selectPlayer () {
            gameService.selectPlayer();
        }
        function getChange () {
            gameService.gameState();
        }
        function incrementCountdown() {
            self.selected.countdown = gameService.incrementCountdown();
        }
        function incrementCounter () {
            self.selected.counter = gameService.incrementCounter();
        }
        function updatePlayer () {
            gameService.updatePlayer();
        }

        var navIcons = document.getElementsByClassName('ion-navicon');
        for (var i = 0; i < navIcons.length; i++) {
            navIcons.addEventListener('click', function () {
                this.classList.toggle('active');
            });
        }
        function logout() {
            gameService.logout();
            self.gameService.isUserLoggedIn = false;
        }
        ////////////////////////////////////////
        // Layout Methods
        ////////////////////////////////////////

        self.hideNavBar = function () {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
        };

        self.showNavBar = function () {
            document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
        };

        self.noHeader = function () {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }
        };

        self.setExpanded = function (bool) {
            self.isExpanded = bool;
        };

        self.setHeaderFab = function (location) {
            var hasHeaderFabLeft = false;
            var hasHeaderFabRight = false;

            switch (location) {
                case 'left':
                    hasHeaderFabLeft = true;
                    break;
                case 'right':
                    hasHeaderFabRight = true;
                    break;
            }

            self.hasHeaderFabLeft = hasHeaderFabLeft;
            self.hasHeaderFabRight = hasHeaderFabRight;
        };

        self.hasHeader = function () {
            var content = document.getElementsByTagName('ion-content');
            for (var i = 0; i < content.length; i++) {
                if (!content[i].classList.contains('has-header')) {
                    content[i].classList.toggle('has-header');
                }
            }

        };

        self.hideHeader = function () {
            self.hideNavBar();
            self.noHeader();
        };

        self.showHeader = function () {
            self.showNavBar();
            self.hasHeader();
        };

        self.clearFabs = function () {
            var fabs = document.getElementsByClassName('button-fab');
            if (fabs.length && fabs.length > 1) {
                fabs[0].remove();
            }
        };
        function getName() {
            $timeout(function() {
                self.name = gameService.playerName();
                self.img = gameService.playerPic();
                console.log(self.img + ' & ' + self.name);
            });
        }
    }

})();
