(function() {
    'use strict';

    angular.module('homeCtrl', [])
        .controller('homeController', homeController);
    homeController.$inject = ['homeService'];

    function homeController(homeService) {
        var self = this;
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
