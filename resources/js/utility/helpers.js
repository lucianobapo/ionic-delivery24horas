(function () {
    'use strict';


    /* ***************************************************************************
     * ### Helper module ###
     *
     * Contains the utility and helper functions used through whole application.
     */

    /*! */

    var helperModule = angular.module('App.Helpers');

    helperModule.service('Helpers', [
        '$rootScope',
        'AppConfig',
        'globals',
        Helpers
    ]);

    /*!
     * Constructor function for all kinds of helper methods used through whole project.
     *
     * @return {object} this
     */
    function Helpers($rootScope, AppConfig, globals) {

        var scope;
        scope = {
            handleHttpResponse: _handleHttpResponse,
            handleHttpErrorResponse: _handleHttpErrorResponse,
            handleHttpParams: _handleHttpParams
        };

        /*
         * ### *Public methods* ###
         */

        /*
         * Handles all kinds of http responses if it's not required to be hendled inside the controller.
         * This implementation really depends of how you construct your backend logic but in general
         * you should have one place for handling API requests.
         *
         * @param   {object} response
         * @return  {object}
         */
        function _handleHttpResponse(response) {
            //$rootScope.c.debug('Response: ');
            $rootScope.c.debug('Response: '+JSON.stringify(response));
            //var message = '',
            //    type = '';
            //$rootScope.c.debug(response);
            //try {
            //    //message = (response.status && response.status !== 200) ? response.statusText : response.data.message;
            //    message = response.statusText;
            //    type = response.data.success ? 'success' : 'error';
            //    //$rootScope.c.log(message);
            //} catch (exception) {
            //    $rootScope.c.debug(exception);
            //    type = 'error';
            //    message = 'Server error';
            //}

            //if (message) {
            //    // Default logic for API responses
            //    //$rootScope.c.debug('Response: ' + message + 'Type: ' + type);
            //}
            //$rootScope.c.debug('Response: ' + response.statusText + ' Status: ' + response.status);
            return response;
        }
        function _handleHttpErrorResponse(response) {
            $rootScope.c.debug('Erro na requisição: ', JSON.stringify(response));
            $rootScope.c.debug('Status: ', response.status);
            $rootScope.c.debug('StatusText: ', response.statusText);
            $rootScope.c.debug('Url: ', response.config.url);
            $rootScope.c.debug('Headers: ', JSON.stringify(response.config.headers));
            response.data = {
                data: []
            };
            return response;
        }

        function _handleHttpParams(params) {
            $rootScope.c.debug('Parametros: ', JSON.stringify(params));
            //$rootScope.c.debug('Status: ', response.status);
            //$rootScope.c.debug('StatusText: ', response.statusText);
            //$rootScope.c.debug('Url: ', response.config.url);
            //$rootScope.c.debug('Headers: ', JSON.stringify(response.config.headers));
            //response.data = {
            //    data: []
            //};
            //return response;
        }

        return scope;
    }

    helperModule.service('AddressDataService', [
        'Api',
        'AppConfig',
        '$rootScope',
        searchAddress
    ]);

    function searchAddress(Api, AppConfig, $rootScope) {
        var searchAddress;
        searchAddress = {
            searchAddress: _handleResponse
        };

        function _handleResponse(searchFilter) {
            $rootScope.c.debug('Searching addresses for ' + searchFilter);
            return Api.sendRequest({
                    method: "GET",
                    url: AppConfig.servicoCep('RJ/Rio das Ostras/'+searchFilter)
                })
                .then(function(response){
                    //$rootScope.c.debug('Response: ' + response);
                    $rootScope.cartData.matches = response.data.filter(function (address) {
                        var removeAcentos = function(str){
                            str = str.toLowerCase();
                            var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç";
                            var to   = "aaaaaeeeeeiiiiooooouuuunc";
                            for (var i=0, l=from.length ; i<l ; i++) {
                                str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                            }
                            return str;
                        };
                        var searchIn = removeAcentos(address.logradouro);
                        var query = removeAcentos(searchFilter);
                        if (searchIn.indexOf(query) !== -1) return true;
                    });
                    return response;
                });
        };
        return searchAddress;
    }

    helperModule.service('ReportSystem', [
        'AppConfig',
        log
    ]);
    function log(AppConfig){
        //var response;
        if (AppConfig.debug) return console;
        else return {
            log: function () {},
            debug: function () {}
        };
    }
    module.exports = helperModule;
})();