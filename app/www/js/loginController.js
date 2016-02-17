(function (){
angular.module('app.login', ['ngStorage'])

.controller('loginController', loginController);
    loginController.$inject = ['$timeout', '$localStorage'];

function loginController($timeout, homeService) {
    // controller data and functions
    var vm = this;
    vm.player = homeService.player;
    vm.recorded = homeService.recorded;
    vm.facebookLogin = facebookLogin;
    vm.googleLogin = googleLogin;
    vm.deleteFacebookData = deleteFacebookData;
    vm.deleteGoogleData = deleteGoogleData;
    vm.authWithPassword = authWithPassword;
    vm.createUesr = createUesr;
    vm.changeEmail = changeEmail;
    vm.changePassord = changePassord;
    // if facebook data is found in local storage, use it
    vm.message = vm.fbData && vm.fbData.facebook ? "Logged in to Facebook." : "No Facebook data found.";
    // IMPORTANT: change to match the URL of your Firebase.
    var url = 'https://angular-game.firebaseio.com/';
    // use Firebase library to login to facebook

    // ******** FACEBOOK LOGIN ********
    function facebookLogin() {
        var ref = new Firebase(url);
        ref.authWithOAuthPopup('facebook', function (error, authData) {
            if (error) {
                console.log('Log in to Facebook Failed', error);
                vm.message = 'Log in to Facebook Failed. ' + error;
            } else {
                console.log('Logged in to Facebook');
                vm.message = 'Logged in to Facebook.';
                $timeout(function () { // invokes $scope.$apply()
                    vm.fbData = authData;
                });
            }

        });
    }

    // to FULLY logout, you MUST go to facebook.com and logout
    function deleteFacebookData() {
        $localStorage.$reset();
        vm.fbData = {};
        vm.message = 'Facebook data deleted.'
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
                    vm.recorded.name = authData.google.displayName;
                    vm.recorded.img = authData.google.profileImageURL;
                    homeService.update();
                });
            }
        });
    }

    // to FULLY logout, you MUST go to Google.com and logout
    function deleteGoogleData() {
        $localStorage.$reset();
        vm.OAuthData = {};
        vm.message = 'Google data deleted.'
        }
    }
        // ******** EMAIL LOGIN ********


    var ref = new Firebase("https://angular-game.firebaseio.com");

    function createUesr() {

        ref.createUser({
            email: "bobtony@firebase.com",
            password: "correcthorsebatterystaple"
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
        email    : "bobtony@firebase.com",
        password : "correcthorsebatterystaple"
    }, function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
        }
    });

    }

    function changeEmail() {
        ref.changeEmail({
            oldEmail : "bobtony@firebase.com",
            newEmail : "bobtony@google.com",
            password : "correcthorsebatterystaple"
        }, function(error) {
            if (error === null) {
                console.log("Email changed successfully");
            } else {
                console.log("Error changing email:", error);
            }
        });
    }

    function changePassord() {
        ref.changePassword({
            email       : "bobtony@firebase.com",
            oldPassword : "correcthorsebatterystaple",
            newPassword : "neatsupersecurenewpassword"
        }, function(error) {
            if (error === null) {
                console.log("Password changed successfully");
            } else {
                console.log("Error changing password:", error);
            }
        });
    }

    function resetPassord() {
        ref.resetPassword({
            email : "bobtony@firebase.com"
        }, function(error) {
            if (error === null) {
                console.log("Password reset email sent successfully");
            } else {
                console.log("Error sending password reset email:", error);
            }
        });

    }

    function removeUser() {
        ref.removeUser({
            email    : "bobtony@firebase.com",
            password : "correcthorsebatterystaple"
        }, function(error) {
            if (error === null) {
                console.log("User removed successfully");
            } else {
                console.log("Error removing user:", error);
            }
        });
    }

})();