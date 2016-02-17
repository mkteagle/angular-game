(function() {
    'use strict';

    angular.module('homeCtrl', [])
        .controller('homeController', homeController);
    homeController.$inject = ['homeService', '$scope', '$timeout'];

    function homeController(homeService, $scope, $timeout) {
        var self = this;
        self.incrementCounter = incrementCounter;
        self.level = homeService.level;
        self.initPlayer = initPlayer;
        self.getChange = getChange;
        self.player = homeService.player;
        self.selected = homeService.recorded;
        self.selectPlayer = selectPlayer;
        self.countItDown = countItDown;

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
