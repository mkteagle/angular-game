(function () {
    angular.module('app.login', [])
.controller('loginController', loginController);
    loginController.$inject = ['loginService'];
function loginController(loginService) {
    // controller data and functions
    var vm = this;
    vm.authData = loginService.authData;
    vm.recorded = loginService.recorded;
    vm.facebookLogin = facebookLogin;
    vm.googleLogin = googleLogin;
    vm.authWithPassword = authWithPassword;
    vm.createUser = createUser;
    vm.email = '';
    vm.password = '';

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
}
})();