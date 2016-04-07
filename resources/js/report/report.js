(function () {
    'use strict';

    var reportModule = angular.module('App.Report');

    reportModule
        .controller('ReportCtrl', [
            '$scope',
            '$rootScope',
            '$stateParams',
            'AppConfig',
            'Api',
            reportCtrl
        ]);

    function reportCtrl($scope, $rootScope, $stateParams, AppConfig, Api) {
        $rootScope.c.debug('Report Controller: ', $scope.commonArray);

        //console.log($stateParams);
        //$scope.titulo = $routeParams;

        $rootScope.loadReport = function () {
            Api
                .sendRequest({
                    method: "GET",
                    url: AppConfig.apiEndpoint + '/relatorios'
                })
                .then(function(response){
                    $scope.report = response.data.data;
                    console.log(response.data.data);
                });
        };

        $scope.doRefresh = function () {
            $rootScope.loadReport();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };
        $rootScope.loadReport();
    }
    module.exports = reportModule;
})();