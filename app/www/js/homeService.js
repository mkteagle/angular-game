(function() {
    'use strict';
    angular.module('homeService', [])
        .service('homeService', homeService);

    homeService.$inject = ['$firebaseArray', 'ngToast'];


    function homeService ($firebaseArray, ngToast) {
        var self = this;
        var ref = new Firebase('http://donut-click.firebaseIO.com');
        var leaderRef = new Firebase('http://donut-click.firebaseIO.com/leaderboard');
        self.leaderBoard = $firebaseArray(leaderRef);
        self.player = $firebaseArray(ref);
        self.initPlayer = initPlayer;
        self.incrementCounter = incrementCounter;
        self.update = update;
        self.recordId = null;

        self.id = null;
        self.selected = null;
        self.updated = 100;
        self.countItDown = countItDown;
        self.selectPlayer = selectPlayer;
        self.showToast = showToast;
        self.incrementCountdown = incrementCountdown;
        self.updatePlayer = updatePlayer;
        self.newGame = newGame;
        self.upgrades = [];
        self.goal = 1000;
        self.index = 1;
        self.countInc = 1;
        for (var i = 1; i < 10000; i++) {
            self.upgrades.push({id: i, goal: self.goal});
            self.goal = self.goal * 2;
        }
        self.recorded = {counter: 0, countdown: self.upgrades[self.index].goal, level: '1x', updated: 100};
        function newGame() {
            self.initPlayer();
            self.recorded.counter = 0;
            self.recorded.countdown = self.upgrades[self.index].goal;
            self.recorded.updated = 100;
            self.recorded.upgrade = false;
            self.update();
            return self.recorded.counter;
        }
        function updatePlayer() {
           self.recorded.upgrade = false;
           self.recorded.counter = 0;
           self.index++;
        }

        function countItDown() {
            self.update();
        }
        function showToast() {
            ngToast.create({
                className: 'success',
                content: self.recorded.level
            });
        }

        function selectPlayer() {
            self.selected = angular.isNumber(self.recorded) ? $scope.player[self.recorded] : self.recorded;
        }

        function incrementCountdown () {
            if (self.recorded.counter >= self.upgrades[self.index].goal) {
                self.recorded.countdown = self.upgrades[self.index].goal;
                self.update();
                return self.recorded.countdown;
            }
            else if (self.recorded.counter <= self.upgrades[self.index].goal) {
                self.recorded.upgrade = true;
                self.index++;
                self.update();
                return self.recorded.countdown;
            }
        }

        function incrementCounter () {
                if (self.recorded.counter < 10) {
                    self.recorded.counter = self.recorded.counter + 1;
                    self.showToast();
                    self.update();
                    return self.recorded.counter;
                }
                else {
                    self.recorded.counter = self.recorded.counter + 2;
                    self.recorded.level = '2x';
                    self.showToast();
                    self.update();
                    return self.recorded.counter;
                }

        }
        function initPlayer () {
            self.level = '1x';
            self.player.$add({name: 'Mike', counter: self.recorded.counter, date: Date.now(), level: self.level, id: self.recordId, countdown: self.upgrades[self.index].goal, upgrade: false}).then(function(ref) {
                self.recordId = ref.key();
                self.recorded = self.player.$getRecord(self.recordId);
                self.recorded.id = self.recordId;
                self.player.$save(self.recorded);
            });
            console.log(self.upgrades);
        }
        function update() {
            self.player.$save(self.recorded);
            self.leaderBoard.$save(self.recorded);
        }
    }

})();
