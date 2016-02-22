(function() {
    angular.module('upgradeService', [])
        .service('upgradeService', upgradeService);

    function upgradeService() {
        var self = this;
        self.upgrades = {};

    }
})();
