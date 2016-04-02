(function () {
    'use strict';

    var commonModule = angular.module('App.Common');

    commonModule.controller('CommonCtrl', [
        '$scope',
        '$rootScope',
        '$ionicModal',
        '$timeout',
        //'$state',
        'AppConfig',
        'Api',
        '$window',
        //'Helpers',
        commonCtrl
    ]);

    function commonCtrl($scope, $rootScope, $ionicModal, $timeout, /*$state, */AppConfig, Api, $window/*, Helpers*/) {

        $rootScope.$watch(function(){
            return $window.innerWidth;
        }, function(value) {
            //console.log(value);
            if (value<=425) {
                $rootScope.handhelds = true;
                $rootScope.minMediumScreens = false;
            } else {
                $rootScope.handhelds = false;
                $rootScope.minMediumScreens = true;
            }
        });

        $rootScope.rootCategoriaSelecionada = 'Todas';
        $rootScope.loadCategoria = function ($nome) {
            $rootScope.rootCategoriaSelecionada = $nome;
        };

        $scope.loadItems = function () {
            Api.sendRequest({
                method: "GET",
                url: AppConfig.apiEndpoint + '/categorias'
            })
            .then(function(response){
                $scope.categorias = response.data.data;
            });
        };

        $scope.doRefresh = function () {
            $scope.loadItems();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };

        $scope.loadItems();

        $scope.commonArray = [4, 5, 6];
        console.log('Common Controller');

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    }

    module.exports = commonModule;
})();