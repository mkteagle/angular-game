(function() {
    angular.module('upgradeDirective', [])
        .directive('upgradeDirective', upgradeDirective);

    upgradeDirective.$inject = ['upgradeService', 'gameService', '$timeout', '$interval'];
    function upgradeDirective (upgradeService, gameService, $timeout, $interval) {
    var upgradeController = function () {
        var uc = this;
        uc.upgrades = upgradeService.upgrades;
        uc.counter = gameService.recorded.counter;
        uc.recorded = gameService.recorded;
        uc.upgradeable = false;
        uc.grandpable = false;
        uc.clicker = 0;
        uc.clickedAutoClicker = clickedAutoClicker;
        $timeout(function () {
            console.log('you can now click on an autoclicker!!!')
            uc.upgradeable = true;
        }, 1000);
        function clickedAutoClicker () {
            uc.upgradeable = false;
            //increment score every 10 seconds for first autoclicker
            uc.clicker++;
            uc.counter++;
            gameService.player.$save(uc.recorded);
            console.log(uc.counter);
        }
        $interval(function() {
            console.log('clicker works!!!' + uc.clicker);
            console.log(uc.counter);
            uc.clicker += uc.counter;
            gameService.player.$save(uc.recorded);
            console.log(uc.recorded);
        }, 10000)
    };
    return {
        restrict: 'EA',
        scope: {
            upgrades: '=',
            counter: '&',
            upgradeable: '&',
            grandpable: '&',
            clicker: '&'
        },
            controller: upgradeController,
            controllerAs: 'uc',
            bindToController: true,
            templateUrl: '..//www/templates/upgrades.html'
        };
    }
})();
