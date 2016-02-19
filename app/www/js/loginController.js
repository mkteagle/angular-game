(function () {
    angular.module('app.login', ['ngStorage'])
.controller('loginController', loginController);
    loginController.$inject = ['$timeout', 'homeService', '$state', '$localStorage', 'loginService'];



function loginController($timeout, homeService, $state, $localStorage, loginService) {
    // controller data and functions
    var vm = this;
    vm.player = homeService.player;
    vm.authData = {};
    vm.recorded = homeService.recorded;
    vm.facebookLogin = facebookLogin;
    vm.googleLogin = googleLogin;
    vm.authWithPassword = authWithPassword;
    vm.createUser = createUser;
    vm.changeEmail = changeEmail;
    vm.changePassword = changePassword;
    vm.email = "";
    vm.password = "";
    //vm.isLoggedIn = false;
    $localStorage.isUserLoggedIn = false;
    vm.isUserLoggedIn = $localStorage.isUserLoggedIn;
    vm.message = vm.fbData && vm.fbData.facebook ? "Logged in to Facebook." : "No Facebook data found.";
    //IMPORTANT change to match the url of your firebase

    function facebookLogin() {
        loginService.facebookLogin();
    }

    function googleLogin() {
        loginService.googleLogin();
    }

    function authWithPassword() {
        loginService.googleLogin();
    }

    function createUser() {
        loginService.createUser();
    }

}

})();