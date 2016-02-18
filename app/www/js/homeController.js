(function() {
    'use strict';

    angular.module('homeCtrl', [])
        .controller('homeController', homeController);
    homeController.$inject = ['homeService', '$scope', '$timeout'];

    function homeController(homeService, $scope, $timeout) {
        var self = this;
<<<<<<< Updated upstream

        //I got this code here: http://ionden.com/a/plugins/ion.sound/en.html to make the sound for the button
        ion.sound({
            sounds: [
                {
                    alias: "snap",
                    name: "snap",
                    path: "../www/audio/ion.sound-3.0.6/sounds/",
                    volume: 0.9,
                    preload: false
                }
            ],
            path: "../www/audio/ion.sound-3.0.6/sounds/",
            preload: true,
            multiplay: true
=======
        ion.sound({
            sounds: [
                {
                    name: "button_click"
                },
                {
                    name: "door_bump",
                    volume: 0.2
                },
                {
                    name: "camera_flashing",
                    volume: 0.3,
                    preload: false
                }
            ],
            volume: 0.5,
            path: "../www/audio/ion.sound-3.0.6/sounds/",
            preload: true
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            ion.sound.play("snap");
=======
           ion.sound.play("my_cool_sound");
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            homeService.initPlayer();
=======
                    homeService.initPlayer();
>>>>>>> Stashed changes
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
