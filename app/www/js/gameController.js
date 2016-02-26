(function() {
    'use strict';

    angular.module('gameController', [])
        .controller('gameController', gameController);
    gameController.$inject = ['gameService'];

    function gameController(gameService) {
        var self = this;
        //self.value = gameService.recorded.goal;
        self.type = '';
        if (self.value < 25) {
            self.type = 'success';
        } else if (self.value < 50) {
            self.type = 'info';
        } else if (self.value < 75) {
            self.type = 'warning';
        } else {
            self.type = 'danger';
        }

        //I got this code here: http://ionden.com/a/plugins/ion.sound/en.html to make the sound for the button
        ion.sound({
            sounds: [
                {
                    alias: "snap",
                    name: "snap",
                    path: "../www/lib/ion-sound/sounds/",
                    volume: 0.9,
                    preload: false
                }
            ],
            path: "../www/lib/ion-sound/sounds/",
            preload: true,
            multiplay: true
        });
        self.incrementCounter = incrementCounter;
        self.level = gameService.level;
        self.getChange = getChange;
        self.selected = gameService.recorded;
        self.selectPlayer = selectPlayer;
        self.countdown = gameService.recorded.countdown;
        self.counter = gameService.recorded.counter;
        self.clicker = gameService.recorded.clicker;
        self.goal = gameService.recorded.goal;
        self.updatePlayer = updatePlayer;
        self.playSound = playSound;
        self.incrementCountdown = incrementCountdown;

        function playSound () {
            ion.sound.play("snap");
        }
        function selectPlayer () {
            gameService.selectPlayer();
        }
        function getChange () {
            gameService.gameState();
        }
        function incrementCountdown() {
            console.log(self.selected.countdown);
            console.log(self.goal);
            self.selected.countdown = gameService.incrementCountdown();
        }
        function incrementCounter () {
            self.selected.counter = gameService.incrementCounter();
        }
        function updatePlayer () {
            gameService.updatePlayer();
        }
    }

})();
