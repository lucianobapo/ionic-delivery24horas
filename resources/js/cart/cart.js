(function () {
    'use strict';

    var angularModule = angular.module('App.Cart');

    angularModule
        .controller('CartCtrl', [
            '$scope',
            '$rootScope',
            CartCtrl
        ]);

    function CartCtrl($scope, $rootScope) {
        $rootScope.c.debug('CartCtrl Controller: ', $scope.commonArray);
    }

    module.exports = angularModule;
})();