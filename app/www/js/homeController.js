(function() {
    'use strict';

    angular.module('homeCtrl', [])
        .controller('homeController', homeController);
    homeController.$inject = ['homeService'];

    function homeController(homeService) {
        var self = this;
        self.incrementCounter = homeService.incrementCounter;
        self.level = homeService.level;
        self.initPlayer = initPlayer;
        self.recorded = homeService.recorded;
        self.counter = homeService.recorded.counter;
        self.countdown = homeService.recorded.countdown;
        self.getChange = getChange;
        self.selected = homeService.selected;
        self.selectPlayer = selectPlayer;
        self.countItDown = countItDown;

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
        //function showToast () {
        //    homeService.showToast();
        //}
        //function incrementCounter () {
        //    homeService.incrementCounter();
        //}
    }

})();
