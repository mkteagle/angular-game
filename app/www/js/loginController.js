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
    //vm.changeEmail = changeEmail;
    //vm.changePassword = changePassword;
    vm.email = '';
    vm.password = '';
    //vm.isLoggedIn = false;
    //IMPORTANT change to match the url of your firebase
<<<<<<< HEAD

    var url = 'https://donut-click.firebaseio.com/';
    //var url = 'https://angular-game.firebaseio.com/';
    var ref = new Firebase(url);

        // ******** FACEBOOK LOGIN ********
        function facebookLogin() {
            ref.authWithOAuthPopup('facebook', function (error, authData) {
                if (error) {
                    console.log('Log in to Facebook Failed', error);
                    vm.message = 'Log in to Facebook Failed. ' + error;
                } else {
                    console.log('Logged in to Facebook', authData);
                    vm.message = 'Logged in to Facebook.';
                    $timeout(function () { // invokes $scope.$apply()
                        homeService.initPlayer();
                        vm.authData = authData.facebook;
                        homeService.recorded.name = vm.authData.displayName;
                        homeService.recorded.img = vm.authData.profileImageURL;
                        homeService.update();
                        $state.go('app.splash');
                    });
                }

            });
        }

        // ******** GOOGLE LOGIN ********
        function googleLogin() {
            ref.authWithOAuthPopup("google", function (error, authData) {
                if (error) {
                    console.log("Login to Google Failed!", error);
                    vm.message = 'Log in to Google Failed. ' + error;
                } else {
                    console.log("Logged in to Google", authData);
                    vm.message = 'Logged in to Google.';
                    $timeout(function () { // invokes $scope.$apply()
                        homeService.initPlayer();
                        vm.authData = authData.google;
                        homeService.recorded.name = vm.authData.displayName;
                        homeService.recorded.img = vm.authData.profileImageURL;
                        homeService.player.$save(homeService.recorded);
                        $state.go('app.splash');
                    });
                }
            });
        }


    // ******** EMAIL LOGIN ********

    function createUser() {

        ref.createUser({
            email: vm.email,
            password: vm.password
        }, function (error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                vm.isLoggedIn = true;
                console.log("Successfully created user account with uid:", userData.uid);
                $localStorage.isUserLoggedIn = true;
            }
        });
    }

    function authWithPassword() {

        ref.authWithPassword({
            email: vm.email,
            password: vm.password
        }, function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                vm.message = 'Logged into Game';
                $timeout(function() {
                    $state.go('app.splash');
                })
            }
        });

=======
    function facebookLogin() {
        loginService.facebookLogin();
>>>>>>> loginService
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