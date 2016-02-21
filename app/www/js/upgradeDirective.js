(function() {
    angular.module('upgradeDirective', [])
        .directive('upgradeDirective', upgradeDirective);

    upgradeDirective.$inject = ['upgradeService', 'gameService', '$timeout', '$interval'];
    function upgradeDirective (upgradeService, gameService, $timeout, $interval) {
    var upgradeController = function () {
        var uc = this;
        uc.upgrades = upgradeService.upgrades;
        uc.recorded = gameService.recorded;
        uc.upgradeable = [];
        uc.grandpable = false;
        uc.goal = 100;
        uc.index = 0;
        uc.clickedAutoClicker = clickedAutoClicker;
        for (var i = 1; i < 1000; i++) {
            uc.upgradeable.push({id: i, goal: uc.goal});
            uc.goal = uc.goal * 2;
        }
        function clickedAutoClicker () {
            //increment score every 10 seconds for first autoclicker
            uc.recorded.clicker = gameService.incrementClicker();
            gameService.player.$save(uc.recorded);
            uc.index++;
        }
        $interval(function() {
            console.log('clicker works!!!' + uc.recorded.clicker);
            uc.recorded.counter += uc.recorded.clicker;
            if (uc.recorded.countdown <= 0) {
                uc.recorded.countdown = 0
            }
            else {
                uc.recorded.countdown = uc.recorded.countdown - uc.recorded.clicker;
            }
            gameService.player.$save(uc.recorded);
        }, 1000)
    };
    return {
        restrict: 'EA',
        scope: {
            upgrades: '=',
            recorded: '&',
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
