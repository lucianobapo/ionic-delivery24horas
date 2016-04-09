(function () {
    'use strict';

    /* ***************************************************************************
     * ### Common API module ###
     *
     * This is a project common api service. It's used for sending all api requests in the application.
     * It handles success and error response by default, if it's not set custom callback function explicitly.
     */

    /*! */

    var moduleApp = angular.module('App.Directives');

    moduleApp.directive('numbersOnly', [
        'Alerts',
        numbersOnly
    ]);

    function numbersOnly(Alerts) {
        return {
            // atribuímos em forma de classe css nesse caso
            restrict: 'C',
            link: function (scope, element, attrs) {
                // atribuímos o plugin jQuery ao parâmetro `element`
                // nesse caso, o element do DOM que foi bindado a diretiva
                element.on('keypress', function (e) {
                    if (e.which != 13 && e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)){
                        Alerts.numbersOnly();
                        e.preventDefault();
                        return false;
                    }
                });
            }
        }
    }

    moduleApp.directive('cancelEnter', [
        '$rootScope',
        cancelEnter
    ]);

    function cancelEnter($rootScope) {
        return {
            // atribuímos em forma de classe css nesse caso
            restrict: 'C',
            link: function (scope, element, attrs) {
                // atribuímos o plugin jQuery ao parâmetro `element`
                // nesse caso, o element do DOM que foi bindado a diretiva
                element.on('keypress', function (e) {
                    if (e.which == 13){
                        $rootScope.c.debug('Cancelando ação do enter');
                        e.preventDefault();
                        return false;
                    }
                });
            }
        }
    }

    moduleApp.directive('cepKeyUp', [
        '$rootScope',
        'Api',
        'AppConfig',
        'Alerts',
        cepKeyUp
    ]);

    function cepKeyUp($rootScope, Api, AppConfig, Alerts) {
        return {
            // atribuímos em forma de classe css nesse caso
            restrict: 'C',
            link: function (scope, element, attrs) {
                // atribuímos o plugin jQuery ao parâmetro `element`
                // nesse caso, o element do DOM que foi bindado a diretiva
                element.on('keyup', function (e) {
                    if (e.which != 13 && element.val().length == 8) {
                        Api.sendRequest({
                                method: "GET",
                                url: AppConfig.servicoCep($rootScope.cartData.cep)
                            })
                            .then(function(response){
                                if (response.data.erro){
                                    $rootScope.cartData.endereco = '';
                                    $rootScope.cartData.bairro = '';
                                    Alerts.invalidCep($rootScope.cartData.cep);
                                } else {
                                    $rootScope.cartData.endereco = response.data.logradouro;
                                    $rootScope.cartData.bairro = response.data.bairro;
                                }
                            });
                    }
                });
            }
        }
    }

    moduleApp.directive('enderecoKeyUp', [
        '$rootScope',
        'AddressDataService',
        enderecoKeyUp
    ]);

    function enderecoKeyUp($rootScope, AddressDataService) {
        return {
            // atribuímos em forma de classe css nesse caso
            restrict: 'C',
            link: function (scope, element, attrs) {
                // atribuímos o plugin jQuery ao parâmetro `element`
                // nesse caso, o element do DOM que foi bindado a diretiva
                element.on('keyup', function (e) {
                    if (e.which != 13 && element.val().length >2) {
                        //if ($rootScope.cartData.matches.length>0)
                        //    $rootScope.monitoraMatch = true;
                        //
                        //if ($rootScope.monitoraMatch===true && $rootScope.cartData.matches.length==0){
                        //    $rootScope.c.debug('parar busca');
                        //    $rootScope.tamanhoCampo = element.val().length;
                        //    $rootScope.buscar = false;
                        //    $rootScope.monitoraMatch = false;
                        //}
                        //
                        //if ($rootScope.tamanhoCampo>element.val().length && $rootScope.buscar === false){
                        //    $rootScope.c.debug('ativar busca');
                        //    $rootScope.monitoraMatch = false;
                        //    $rootScope.buscar = true;
                        //    $rootScope.tamanhoCampo = 0;
                        //}
                        //
                        //if ($rootScope.buscar!==false) AddressDataService.searchAddress(element.val());

                        AddressDataService.searchAddress(element.val());

                    } else $rootScope.cartData.matches = [];
                });
            }
        }
    }

    module.exports = moduleApp;
})();