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
<<<<<<< Updated upstream
        self.recorded = {counter: 0, countdown: 100, level: '1x', updated: 100};
        self.id = null;
        self.selected = null;
        self.updated = 100;
=======
        self.recorded = {counter: 0, countdown: 1000, level: '1x'};
        self.id = null;
        self.selected = null;
        self.updated = self.recorded.counter * 2;
>>>>>>> Stashed changes
        self.countItDown = countItDown;
        self.selectPlayer = selectPlayer;
        self.showToast = showToast;
        self.incrementCountdown = incrementCountdown;
        self.updatePlayer = updatePlayer;
<<<<<<< Updated upstream
        function updatePlayer() {
            self.recorded = {counter: 0, countdown: self.updated, upgrade: false}
=======

        function updatePlayer() {
            self.recorded = {counter: 0, countdown: self.updated, updated: false}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            console.log(self.updated);
=======
>>>>>>> Stashed changes
            if (self.recorded.counter >= 10) {
                self.recorded.countdown = self.recorded.countdown - 2;
                self.update();
                return self.recorded.countdown;
            }
<<<<<<< Updated upstream
            else if (self.recorded.counter >= 100) {
                self.recorded.upgrade = true;
                self.updated = self.updated * 2;
                self.recorded.countdown = self.updated * 2;
                self.update();
                return self.recorded.countdown;
=======
            else if (self.recorded.counter >= self.updated) {
                self.recorded.countdown = self.countdown * 2;
>>>>>>> Stashed changes
            }
            else {
                self.recorded.countdown--;
                self.update();
                return self.recorded.countdown;
            }

        }

        function incrementCounter () {
                if (self.recorded.counter >= 10) {
                    self.recorded.counter = self.recorded.counter + 2;
                    self.recorded.level = '2x';
                    self.showToast();
                    self.update();
                    return self.recorded.counter;
                }
                else {
                    self.recorded.counter++;
                    self.showToast();
                    self.update();
                    return self.recorded.counter;
                }

        }
        function initPlayer () {
            self.level = '1x';
            self.player.$add({name: 'Mike', counter: self.recorded.counter, date: Date.now(), level: self.level, id: self.recordId, countdown: self.recorded.countdown, upgrade: false}).then(function(ref) {
                self.recordId = ref.key();
                self.recorded = self.player.$getRecord(self.recordId);
                self.recorded.id = self.recordId;
                self.player.$save(self.recorded);
            })
        }
        function update() {
            self.player.$save(self.recorded);
            self.leaderBoard.$save(self.recorded);
        }
    }

})();
