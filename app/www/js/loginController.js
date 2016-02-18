(function (){
angular.module('app.login', [])

.controller('loginController', loginController);
    loginController.$inject = ['$timeout', 'homeService', '$state'];

function loginController($timeout, homeService, $state) {
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
    vm.changePassord = changePassord;
    vm.email = "";
    vm.password = "";
    vm.message = vm.fbData && vm.fbData.facebook ? "Logged in to Facebook." : "No Facebook data found.";
    //IMPORTANT change to match the url of your firebase

    //var url = 'https://donut-click.firebaseio.com/';
    var url = 'https://angular-game.firebaseio.com/';

    // ******** FACEBOOK LOGIN ********
    function facebookLogin() {
        var ref = new Firebase(url);
        ref.authWithOAuthPopup('facebook', function (error, authData) {
            if (error) {
                console.log('Log in to Facebook Failed', error);
                vm.message = 'Log in to Facebook Failed. ' + error;
            } else {
                console.log('Logged in to Facebook', authData);
                vm.message = 'Logged in to Facebook.';
                $timeout(function () { // invokes $scope.$apply()
                    vm.authData = authData.facebook;
                    vm.recorded.name = vm.authData.displayName;
                    vm.recorded.img = vm.authData.profileImageURL;
                    homeService.update();
                    $state.go('app.splash');
                });
            }

        });
    }

    // ******** GOOGLE LOGIN ********
    function googleLogin() {
        var ref = new Firebase(url);
        ref.authWithOAuthPopup("google", function (error, authData) {
            if (error) {
                console.log("Login to Google Failed!", error);
                vm.message = 'Log in to Google Failed. ' + error;
            } else {
                    console.log("Logged in to Google", authData);
                    vm.message = 'Logged in to Google.';
                    $timeout(function () { // invokes $scope.$apply()
                        vm.authData = authData.google;
                        vm.recorded.name = vm.authData.displayName;
                        vm.recorded.img = vm.authData.profileImageURL;
                        homeService.update();
                        $state.go('app.splash');
                });
            }
        });
    }

    // ******** EMAIL LOGIN ********
    var ref = new Firebase("https://angular-game.firebaseio.com");

    function createUser() {

        ref.createUser({
            email: vm.email,
            password: vm.password
        }, function (error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
            }
        });
    }

    function authWithPassword() {

        ref.authWithPassword({
            email: vm.user,
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

    }

    function changeEmail() {
        ref.changeEmail({
            oldEmail: "bobtony@firebase.com",
            newEmail: "bobtony@google.com",
            password: "correcthorsebatterystaple"
        }, function (error) {
            if (error === null) {
                console.log("Email changed successfully");
            } else {
                console.log("Error changing email:", error);
            }
        });
    }

    function changePassord() {
        ref.changePassword({
            email: "bobtony@firebase.com",
            oldPassword: "correcthorsebatterystaple",
            newPassword: "neatsupersecurenewpassword"
        }, function (error) {
            if (error === null) {
                console.log("Password changed successfully");
            } else {
                console.log("Error changing password:", error);
            }
        });
    }

    function resetPassord() {
        ref.resetPassword({
            email: "bobtony@firebase.com"
        }, function (error) {
            if (error === null) {
                console.log("Password reset email sent successfully");
            } else {
                console.log("Error sending password reset email:", error);
            }
        });

    }

    function removeUser() {
        ref.removeUser({
            email: "bobtony@firebase.com",
            password: "correcthorsebatterystaple"
        }, function (error) {
            if (error === null) {
                console.log("User removed successfully");
            } else {
                console.log("Error removing user:", error);
            }
        });
    }
}

})();