/**
 * Created by i51373 on 3/2/16.
 */
(function() {
    'use strict';

    angular.module('nameFilters', [])
        .filter("initials", function() {
            return function(input) {
                if (input == null) {
                    return 'Unknown';
                }
                else {
                    var names = input.split(' ');
                var holders = [];
                angular.forEach(names, function(name) {
                    holders.push(name.substring(0, 1) + '.');
                });
                return holders.join('');
            }
            };
        })
<<<<<<< HEAD
        //.filter('name', function() {
        //return function(input) {
        //    if (input == null) {
        //        return "Unknown";
        //    } else {
        //
        //        return input;
        //    }
        //};

//})

=======
        .filter('orderObjectBy', function() {
            return function(items, field, reverse) {
                var filtered = [];
                angular.forEach(items, function(item) {
                    filtered.push(item);
                });
                filtered.sort(function (a, b) {
                    return (a[field] > b[field] ? 1 : -1);
                });
                if(reverse) filtered.reverse();
                return filtered;
            };
        });
>>>>>>> master

}());
