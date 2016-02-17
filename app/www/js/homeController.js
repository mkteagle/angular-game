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
                    alias: "button",
                    name: "button_click",
                    volume: 0.9,
                    preload: false
                }
            ],
            path: "../audio/ion.sound-3.0.6/sounds/",
            preload: true,
            multiplay: true
        });
        self.showToast = showToast;
        self.incrementCounter = incrementCounter;
        self.level = homeService.level;
        self.initPlayer = initPlayer;
        self.getChange = getChange;
        self.player = homeService.player;
        self.selected = homeService.recorded;
        self.selectPlayer = selectPlayer;
        self.countItDown = countItDown;
        self.countdown = homeService.countdown;
        self.playSound = playSound;

        $("#b01").on("click", function playSound () {
           ion.sound.play("button");
        });

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
    }

})();
