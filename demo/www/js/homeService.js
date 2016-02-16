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
        self.counter = 0;
        self.level = null;
        self.incrementCounter = incrementCounter;
        self.update = update;
        self.recordId = null;
        self.id = null;
        self.recorded = null;
        self.selected = null;
        self.selectPlayer = selectPlayer;
        self.showToast = showToast;

        function showToast() {
            ngToast.create({
                className: 'success',
                content: self.recorded.level
            });
        }

        function selectPlayer() {
            self.selected = angular.isNumber(self.recorded) ? $scope.player[self.recorded] : self.recorded;
        }

        function incrementCounter () {
            if (self.recorded.counter >= 10) {
                self.recorded.counter = self.recorded.counter + 2;
                self.recorded.level = '2x';
                self.update();
                self.selectPlayer();
            }
            else {
                self.recorded.counter++;
                self.update();
                self.selectPlayer();
            }
        }
        function initPlayer () {
            self.level = '1x';
            self.player.$add({name: 'Mike', counter: self.counter, date: Date.now(), level: self.level, id: self.recordId}).then(function(ref) {
                self.recordId = ref.name();
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
