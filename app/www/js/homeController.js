(function() {
    'use strict';

    angular.module('homeCtrl', [])
        .controller('homeController', homeController);
    homeController.$inject = ['homeService'];

    function homeController(homeService) {
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
        self.level = homeService.level;
        self.initPlayer = initPlayer;
        self.getChange = getChange;
        self.player = homeService.player;
        self.selected = homeService.recorded;
        self.selectPlayer = selectPlayer;
        self.countdown = homeService.countdown;
        self.updatePlayer = updatePlayer;
        self.playSound = playSound;
        self.newGame = newGame;
        self.incrementCountdown = incrementCountdown;

        function playSound () {
            ion.sound.play("snap");
        }
        function newGame() {
            self.counter = homeService.newGame();
        }
        function selectPlayer () {
            homeService.selectPlayer();
        }
        function getChange () {
            homeService.update();
        }

        function initPlayer () {
            homeService.initPlayer();
        }
        function incrementCountdown() {
            self.selected.countdown = homeService.incrementCountdown();
        }
        function incrementCounter () {
            self.selected.counter = homeService.incrementCounter();
        }
        function updatePlayer () {
            homeService.updatePlayer();
        }
    }

})();
