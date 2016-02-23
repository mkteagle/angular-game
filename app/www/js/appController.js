(function() {


'use strict';

angular.module('app.ctrl', [])
    .controller('AppCtrl', AppCtrl)

AppCtrl.$inject = ['loginService', '$state'];



function AppCtrl (loginService, $state) {
    // Form data for the login modal
    var self = this;
    self.loginData = {};
    self.isExpanded = false;
    self.hasHeaderFabLeft = false;
    self.hasHeaderFabRight = false;
    self.isUserLoggedIn = loginService.isUserLoggedIn;
    self.logout = logout;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }
    function logout() {
        loginService.logout();
        self.userLoggedIn = false;
    }
    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    self.hideNavBar = function () {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    self.showNavBar = function () {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    self.noHeader = function () {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    self.setExpanded = function (bool) {
        self.isExpanded = bool;
    };

    self.setHeaderFab = function (location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        self.hasHeaderFabLeft = hasHeaderFabLeft;
        self.hasHeaderFabRight = hasHeaderFabRight;
    };

    self.hasHeader = function () {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    self.hideHeader = function () {
        self.hideNavBar();
        self.noHeader();
    };

    self.showHeader = function () {
        self.showNavBar();
        self.hasHeader();
    };

    self.clearFabs = function () {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };


}

})();
