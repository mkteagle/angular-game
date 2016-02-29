(function () {
    angular.module('app.login', [])
.controller('loginController', loginController);
    loginController.$inject = ['gameService'];
function loginController(gameService) {
    // controller data and functions
    var vm = this;
    vm.authData = gameService.user;
    vm.recorded = gameService.recorded;
    vm.facebookLogin = facebookLogin;
    vm.googleLogin = googleLogin;
    //vm.authWithPassword = authWithPassword;
    //vm.createUser = createUser;
    vm.email = '';
    vm.password = '';

    function facebookLogin() {
        gameService.facebookLogin();
    }
    function googleLogin() {
        gameService.googleLogin();
    }
    //function createUser() {
    //    loginService.createUser(vm.email, vm.password);
    //}
    //function authWithPassword() {
    //    loginService.authWithPassword(vm.email, vm.password);
    //}
}
})();