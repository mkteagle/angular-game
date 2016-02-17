(function() {
    'use strict';

    angular.module('homeCtrl', [])
        .controller('homeController', homeController);
    homeController.$inject = ['homeService', '$scope', '$timeout'];

    function homeController(homeService, $scope, $timeout) {
        var self = this;
        ion.sound({
            sounds: [
                {
                    alias: "snap",
                    name: "snap",
                    path: "../www/audio/ion.sound-3.0.6/sounds/",
                    volume: 0.3,
                    preload: false
                }
            ],
            path: "../www/audio/ion.sound-3.0.6/sounds/",
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
        self.countItDown = countItDown;
        self.countdown = homeService.countdown;
        self.updatePlayer = updatePlayer;
        self.playSound = playSound;

        function playSound () {
            ion.sound.play("snap");
        }

        function countItDown () {
            homeService.countItDown();
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
        function incrementCounter () {
            self.selected.counter = homeService.incrementCounter();
            self.selected.countdown = homeService.incrementCountdown();
        }
        function updatePlayer () {
            homeService.updatePlayer();
        }
    }

})();
