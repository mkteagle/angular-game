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
        uc.upgrades = [];
        uc.grandpable = false;
        uc.acgoal = 100;
        uc.acindex = 0;
        uc.index = 0;
        uc.cost = 10;
        uc.clickedAutoClicker = clickedAutoClicker;
        uc.upgradePlayer = upgradePlayer;
        for (var i = 1; i < 1000; i++) {
            uc.upgradeable.push({id: i, acgoal: uc.acgoal, goal: self.goal, cost: uc.cost});
            uc.acgoal = uc.acgoal * 2;
            uc.cost = uc.cost * 2;
        }
        function upgradePlayer() {
            gameService.updatePlayer();
        }
        function clickedAutoClicker () {
            //increment score every 10 seconds for first autoclicker
            console.log(uc.upgradeable[uc.acindex].cost);
            uc.recorded.clicker = gameService.incrementClicker(uc.upgradeable[uc.acindex].cost);
            gameService.player.$save(uc.recorded);
            uc.acindex++;
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
        //scope: {
        //    upgrades: '=',
        //    recorded: '&',
        //    upgradeable: '&',
        //    grandpable: '&',
        //    clicker: '&'
        //},
            controller: upgradeController,
            controllerAs: 'uc',
            bindToController: true,
            templateUrl: '..//www/templates/upgrades.html'
        };
    }
})();
