/**
 * Created by i51373 on 3/2/16.
 */
(function() {
    'use strict';

    angular.module('nameFilters', [])
        //.filter('initials', function() {
        //    return function(input) {
        //        return input.slice(2);
        //    }
        //})
        .filter('name', function() {
        return function(input) {
            if (input == null) {
                return "Unknown";
            } else {

                return input;
            }
        };
});
}());
