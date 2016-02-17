(function (){
angular.module('app.login', ['ngStorage'])

.controller('loginController', loginController);
loginController.$inject = ['$timeout', '$localStorage'];
function loginController($timeout, $localStorage) {
    // controller data and functions
    var vm = this;
    vm.facebookLogin = facebookLogin;
    vm.googleLogin = googleLogin;
    vm.deleteFacebookData = deleteFacebookData;
    vm.deleteGoogleData = deleteGoogleData;
    vm.fbData = $localStorage['https://angular-game.firebaseio.com/'];
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
                    vm.OAuthData = authData;
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
})();