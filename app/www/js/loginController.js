(function () {
    angular.module('app.login', [])
.controller('loginController', loginController);
    loginController.$inject = ['loginService'];
function loginController(loginService) {
    // controller data and functions
    var vm = this;
    vm.authData = loginService.authData;
    vm.recorded = loginService.recorded;
    vm.isUserLoggedIn = loginService.isUserLoggedIn;
    vm.facebookLogin = facebookLogin;
    vm.googleLogin = googleLogin;
    vm.authWithPassword = authWithPassword;
    vm.createUser = createUser;
    vm.logout = logout;
    //vm.changeEmail = changeEmail;
    //vm.changePassword = changePassword;
    vm.email = '';
    vm.password = '';
    //vm.isLoggedIn = false;

    function facebookLogin() {
        loginService.facebookLogin();
    }
    function googleLogin() {
        loginService.googleLogin();
    }
    function createUser() {
        loginService.createUser(vm.email, vm.password);
    }
    function authWithPassword() {
        loginService.authWithPassword(vm.email, vm.password);
    }
    function logout() {
        loginService.logout(vm.email, vm.password);
    }
}
})();