(function () {
    'use strict';

    var commonModule = angular.module('App.Common');

    commonModule.controller('CommonCtrl', [
        '$scope',
        '$rootScope',
        '$ionicModal',
        '$timeout',
        //'$state',
        '$ionicPopup',
        'AppConfig',
        'Api',
        '$window',
        'AddressDataService',
        //'Helpers',
        commonCtrl
    ]);

    function commonCtrl($scope, $rootScope, $ionicModal, $timeout, /*$state, */$ionicPopup, AppConfig, Api, $window, AddressDataService/*, Helpers*/) {
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

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('cart.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.cartModal = modal;
        });
        // Triggered in the login modal to close it
        $scope.closeCart = function () {
            $scope.cartModal.hide();
        };
        // Open the login modal
        $scope.showCart = function () {
            $scope.cartModal.show();
        };
        // Form data for the login modal
        $rootScope.cartData = {};

        $scope.cepKeyup = function (e) {
            if ($scope.cartData.cep.length == 8) {
                Api.sendRequest({
                        method: "GET",
                        url: AppConfig.servicoCep($scope.cartData.cep)
                    })
                    .then(function(response){
                        console.log(response);
                        if (response.data.erro){
                            $scope.cartData.endereco = '';
                            $scope.cartData.bairro = '';
                            $scope.showAlert($scope.cartData.cep);
                        } else {
                            $scope.cartData.endereco = response.data.logradouro;
                            $scope.cartData.bairro = response.data.bairro;
                        }
                    });
            }
        };

        // An alert dialog
        $scope.showAlert = function(cep) {
            var alertPopup = $ionicPopup.alert({
                title: 'CEP inválido',
                template: 'CEP '+cep+' não foi encontrado',
                buttons: [
                    {
                        text: 'OK',
                        type: 'button-assertive'
                    }
                ]
            });

            alertPopup.then(function(res) {
                console.log('CEP:'+cep+' inválido');
            });
        };

        $rootScope.cartData.matches = [];
        $scope.selecionaEndereco = function (address) {
            //console.log(address);
            $rootScope.cartData.matches = [];
            $scope.cartData.cep = address.cep.replace('-','');
            $scope.cartData.endereco = address.logradouro;
            $scope.cartData.bairro = address.bairro;
        };

        $scope.enderecoKeyup = function () {
            if ($rootScope.cartData.endereco.length > 2) {
                AddressDataService.searchAddress($rootScope.cartData.endereco);
            } else $rootScope.cartData.matches = [];
        };

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