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
        uc.grandpable = [];
        uc.acgoal = 100;
        uc.acindex = 0;
        uc.ggoal = 1000;
        uc.gindex = 0;
        uc.index = 0;
        uc.cost = 10;
        uc.gcost = 100;
        uc.clickedAutoClicker = clickedAutoClicker;
        uc.upgradePlayer = upgradePlayer;
        uc.clickGrandpa = clickGrandpa;
        for (var i = 1; i < 1000; i++) {
            uc.upgradeable.push({id: i, goal: uc.acgoal, cost: uc.cost});
            uc.acgoal = uc.acgoal * 2;
            uc.cost = uc.cost * 2;
            console.log(uc.upgradeable[i]);
        }
        for (var j = 1; j < 1000; j++) {
            uc.grandpable.push({id: j, goal: uc.ggoal, cost: uc.gcost});
            uc.ggoal = uc.ggoal * 2;
            uc.gcost = uc.gcost * 2;
        }
        function upgradePlayer() {
            gameService.updatePlayer();
        }
        function clickedAutoClicker () {
            //increment score every 10 seconds for first autoclicker
            uc.recorded.clicker = gameService.incrementClicker(uc.upgradeable[uc.acindex].cost);
            gameService.player.$save(uc.recorded);
            uc.acindex++;
            console.log(uc.acindex);
        }
        function clickGrandpa() {
            uc.recorded.grandpa = gameService.clickGrandpa(uc.grandpable[uc.gindex].cost);
            gameService.player.$save(uc.recorded);
            uc.gindex++;
        }
        $interval(function() {
            console.log('clicker works!!!' + uc.recorded.clicker);
            console.log('grandpa works!!!' + uc.recorded.grandpa);
            uc.recorded.counter += uc.recorded.clicker;
            uc.recorded.counter += uc.recorded.grandpa;
            if (uc.recorded.countdown <= 0) {
                uc.recorded.countdown = 0
            }
            else {
                uc.recorded.countdown = uc.recorded.countdown - uc.recorded.clicker - uc.recorded.grandpa;
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
