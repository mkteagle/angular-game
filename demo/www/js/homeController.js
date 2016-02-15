(function() {
    'use strict';

    angular.module('homeCtrl', [])
        .controller('homeController', homeController);
    homeController.$inject = ['ngToast', 'homeService'];

    function homeController(ngToast, homeService) {
        var self = this;
        self.showToast = showToast;
        self.incrementCounter = incrementCounter;
        self.level = homeService.level;
        self.initPlayer = initPlayer;
        self.counter = homeService.counter;

        function initPlayer () {
            homeService.initPlayer();
        }
        function showToast () {
            ngToast.create({
                className: 'success',
                content: self.level
            });
        }
        function incrementCounter () {
            homeService.incrementCounter();
        }
    }

})();
