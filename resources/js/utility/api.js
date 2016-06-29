(function () {
    'use strict';

    /* ***************************************************************************
     * ### Common API module ###
     *
     * This is a project common api service. It's used for sending all api requests in the application.
     * It handles success and error response by default, if it's not set custom callback function explicitly.
     */

    /*! */

    var apiModule = angular.module('App.Api');

    apiModule.factory('Api', [
        '$q',
        '$http',
        '$ionicLoading',
        'Helpers',
        '$rootScope',
        apiService
    ]);

    function apiService($q, $http, $ionicLoading, Helpers, $rootScope) {
        //Layout.check();
        var scope;
        scope = {
            sendRequest: _sendRequest
        };

        /*
         * ### *Public methods* ###
         */

        /*
         * Sends API request to the server and handles default success and error response.
         * Common function for every API request in the application.
         *
         * This implementation really depends of how you construct your backend logic but in general
         * you should have one place for API requests. Also, there's a 'Helpers' module with 'handleHttpResponse'
         * method, used to handle an API reaponse in case you don't specify a 'customCallback' function (inside the
         * params object). This way you can reduce a code repetition if you need to handle an API call on the same way
         * in multiple places.
         *
         * @param   {object} params
         * @return  {object}
         */
        function _sendRequest(params) {

            params.headers = {
                'Accept': 'application/json'
            };

            //'Cache-Control': 'no-cache',
            //'X-Requested-With': 'XMLHttpRequest',
            //'Host': 'api.localhost.com',
            //'Access-Control-Allow-Origin': '*',
            //'Content-Type': 'application/json',
            //'Accept-Encoding': 'gzip, deflate, sdch',
            //'Accept-Language': 'pt-BR,en-US;q=0.8,en;q=0.6',

            //$rootScope.c.debug(params);
            Helpers.handleHttpParams(params);
            $rootScope.loadingMessage = true;
            return $http(params)
                .then(
                    function (response) {
                        //if (response) {
                        $ionicLoading.hide();
                        $rootScope.closeLoading();
                            var responseData = (response.data && typeof response.data.Data !== 'undefined') ? response.data.Data : response.data;
                            return params.customCallback ? responseData : Helpers.handleHttpResponse(response);
                        //}
                    },
                    function(response) {
                        $ionicLoading.hide();
                        $rootScope.closeLoading();
                        return Helpers.handleHttpErrorResponse(response);
                    });
        }
        return scope;
    }

    module.exports = apiModule;
})();