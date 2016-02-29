(function () {
    angular.module('upgradeDirective', [])
        .directive('upgradeDirective', upgradeDirective);

    upgradeDirective.$inject = ['upgradeService', 'gameService', '$timeout', '$interval'];
    function upgradeDirective(upgradeService, gameService, $timeout, $interval) {
        var upgradeController = function () {
            var uc = this;
            uc.upgrades = upgradeService.upgrades;
            uc.recorded = gameService.recorded;
            uc.upgradeable = [];
            uc.upgrades = [];
            uc.grandpable = [];
            uc.acgoal = gameService.recorded.acgoal;
            uc.aindex = gameService.recorded.aindex;
            uc.ggoal = gameService.recorded.ggoal;
            uc.gindex = gameService.recorded.gindex;
            uc.cost = 10;
            uc.gcost = 100;
            uc.clickedAutoClicker = clickedAutoClicker;
            uc.upgradePlayer = upgradePlayer;
            uc.clickGrandpa = clickGrandpa;
            for (var i = 1; i < 1000; i++) {
                uc.upgradeable.push({id: i, goal: uc.acgoal, cost: uc.cost});
                uc.acgoal = uc.acgoal * 2;
                uc.cost = uc.cost * 2;
            }
            for (var j = 1; j < 1000; j++) {
                uc.grandpable.push({id: j, goal: uc.ggoal, cost: uc.gcost});
                uc.ggoal = uc.ggoal * 2;
                uc.gcost = uc.gcost * 2;
            }
            function upgradePlayer() {
                gameService.updatePlayer();
            }

            function clickedAutoClicker() {
                uc.recorded.clicker = gameService.incrementClicker(uc.upgradeable[gameService.recorded.aindex].cost);
                gameService.gameState();
                gameService.recorded.aindex++;
            }

            function clickGrandpa() {
                uc.recorded.grandpa = gameService.clickGrandpa(uc.grandpable[gameService.recorded.gindex].cost);
                gameService.gameState();
                gameService.recorded.gindex++;
            }

            $interval(function () {
                uc.recorded.counter += uc.recorded.clicker;
                uc.recorded.counter += uc.recorded.grandpa;
                if (uc.recorded.countdown <= 0) {
                    uc.recorded.countdown = 0
                }
                else {
                    uc.recorded.countdown = uc.recorded.countdown - uc.recorded.clicker - uc.recorded.grandpa;
                }
                gameService.gameState();
            }, 1000)
        };
        return {
            restrict: 'EA',
            controller: upgradeController,
            controllerAs: 'uc',
            bindToController: true,
            templateUrl: '..//www/templates/upgrades.html'
        };
    }
})();
