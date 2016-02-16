(function (){
angular.module('app.login', ['ngStorage'])

.controller('loginController', loginController);
loginController.$inject = ['$timeout', '$localStorage'];
function loginController($timeout, $localStorage) {
    // controller data and functions
    var vm = this;
    vm.facebookLogin = facebookLogin;
    vm.deleteFacebookData = deleteFacebookData;
    vm.fbData = $localStorage['https://angular-game.firebaseio.com/'];
    // if facebook data is found in local storage, use it
    vm.message = vm.fbData && vm.fbData.facebook ? "Logged in to Facebook." : "No Facebook data found.";
    // IMPORTANT: change to match the URL of your Firebase.
    var url = 'https://angular-game.firebaseio.com/';
    // use Firebase library to login to facebook
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

    var ref = new Firebase(url);
    ref.authWithOAuthPopup("twitter", function(error, authData) {
        if (error) {
            console.log("Login to Twitter Failed!", error);
            vm.message = 'Log in to Twitter Failed. ' + error;
        } else {
            console.log("Logged in to Twitter", authData);
            vm.message = 'Logged in to Twitter.';
            $timeout(function () { // invokes $scope.$apply()
                vm.fbData = authData;
            });
        }
    });

    }
})();
// bug alert: this delete function sometimes does NOT reset the local storage,
// so a page refresh finds facebook data in localstorage.