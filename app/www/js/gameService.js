(function() {
    'use strict';
    angular.module('gameService', [])
        .service('gameService', gameService);

    gameService.$inject = ['$firebaseArray', 'ngToast'];


    function gameService ($firebaseArray, ngToast) {
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
        self.selectPlayer = selectPlayer;
        self.showToast = showToast;
        self.incrementCountdown = incrementCountdown;
        self.updatePlayer = updatePlayer;
        self.newGame = newGame;
        self.playerName = playerName;
        self.playerPic = playerPic;
        self.upgrades = [];
        self.index = 0;
        self.goal = 1000;
        self.incrementClicker = incrementClicker;
        for (var i = 1; i < 1000; i++) {
            self.upgrades.push({id: i, goal: self.goal});
            self.goal = self.goal * 2;
        }
        self.recorded = {name: '', img: '', counter: 0, countdown: self.upgrades[self.index].goal, level: self.upgrades[self.index].id + 'x', goal: self.upgrades[self.index].goal, clicker: 0};
        function newGame() {
            self.initPlayer();
            self.recorded.counter = 0;
            self.recorded.countdown = self.upgrades[self.index].goal;
            self.recorded.updated = 100;
            self.recorded.upgrade = false;
            self.update();
            return self.recorded.counter;
        }
        function playerName() {
            return self.recorded.name;
        }
        function playerPic() {
            return self.recorded.img;
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
        function incrementClicker(cost) {
            self.recorded.clicker++;
            self.recorded.counter = self.recorded.counter - cost;
            self.recorded.countdown = self.recorded.goal - self.recorded.counter;
            self.update();
            return self.recorded.clicker;
        }

        function incrementCountdown () {
            if (self.recorded.countdown <= 0) {
                self.recorded.upgrade = true;
                self.update();
                return self.recorded.countdown = 0;
            }
            else if (self.recorded.counter < self.upgrades[self.index].goal) {
                self.recorded.countdown = self.recorded.countdown - Number(self.upgrades[self.index].id);
                self.update();
                return self.recorded.countdown;
            }
            else {
                self.recorded.upgrade = true;
                self.recorded.countdown = self.recorded.countdown - Number(self.upgrades[self.index].id);
                self.update();
                return self.recorded.countdown;
            }
        }
        function updatePlayer() {
            self.recorded.counter = self.recorded.counter - self.upgrades[self.index].goal;
            self.index++;
            self.recorded.upgrade = false;
            self.recorded.countdown = self.upgrades[self.index].goal;
            self.recorded.goal = self.upgrades[self.index].goal;
            self.recorded.level = self.upgrades[self.index].id + 'x';
            self.update();
        }
        function incrementCounter () {
                if (self.recorded.counter < self.upgrades[self.index].goal) {
                    self.recorded.counter = self.recorded.counter + self.upgrades[self.index].id;
                    self.showToast();
                    self.update();
                    return self.recorded.counter;
                }
                else {
                    self.recorded.counter = self.recorded.counter + self.upgrades[self.index].id;
                    self.showToast();
                    self.update();
                    return self.recorded.counter;
                }

        }
        function initPlayer () {
            self.level = '1x';
            self.player.$add({name: self.recorded.name, img: self.recorded.img, counter: self.recorded.counter, date: Date.now(), level: self.level, id: self.recordId, countdown: self.upgrades[self.index].goal, upgrade: false, goal: self.upgrades[self.index].goal, clicker: self.recorded.clicker}).then(function(ref) {
                self.recordId = ref.key();
                self.recorded = self.player.$getRecord(self.recordId);
                self.recorded.id = self.recordId;
                self.player.$save(self.recorded);
            });
        }
        function update() {
            self.player.$save(self.recorded);
            self.leaderBoard.$save(self.recorded);
        }
    }

})();
