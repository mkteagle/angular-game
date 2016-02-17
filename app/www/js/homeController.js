(function() {
    'use strict';

    angular.module('homeCtrl', [])
        .controller('homeController', homeController);
    homeController.$inject = ['homeService'];

    function homeController(homeService) {
        var self = this;
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
        });
        self.showToast = showToast;
        self.incrementCounter = incrementCounter;
        self.level = homeService.level;
        self.initPlayer = initPlayer;
        self.counter = homeService.counter;
        self.getChange = getChange;
        self.selected = homeService.selected;
        self.selectPlayer = selectPlayer;
        self.countItDown = countItDown;
        self.countdown = homeService.countdown;
        self.playSound = playSound;

        function playSound () {
           ion.sound.play("my_cool_sound");
        }

        function countItDown () {
            homeService.countItDown();
        }
        function selectPlayer () {
            homeService.selectPlayer;
        }
        function getChange () {
            homeService.update();
        }

        function initPlayer () {
            homeService.initPlayer();
        }
        function showToast () {
            homeService.showToast();
        }
        function incrementCounter () {
            homeService.incrementCounter();
        }
    }

})();
