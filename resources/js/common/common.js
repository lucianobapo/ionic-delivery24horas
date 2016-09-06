(function () {
    'use strict';

    var commonModule = angular.module('App.Common');

    commonModule.controller('CommonCtrl', [
        '$scope',
        '$rootScope',
        '$ionicModal',
        'AppConfig',
        'Categorias',
        commonCtrl
    ]);

    function commonCtrl($scope, $rootScope, $ionicModal, AppConfig, Categorias) {
        $scope.doRefresh = function () {
            Categorias.loadItems();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };

        $scope.commonArray = [4, 5, 6];
        $rootScope.c.debug('Common Controller');

        $scope.campanhasUrl = AppConfig.campanhasUrl;
        $scope.logoUrl = AppConfig.logoUrl;

    }

    module.exports = commonModule;
})();