(function () {
    'use strict';
    /* ***************************************************************************
     * ### Service module ###
     *
     * Contains the utility and helper functions used through whole application.
     */

    var angularModule = angular.module('App.AdviceService');

    angularModule.service('AdviceService', [
        '$rootScope',
        'Api',
        'AppConfig',
        'Layout',
        AdviceService
    ]);

    function AdviceService($rootScope, Api, AppConfig, Layout) {
        var returnObj;
        returnObj = {
            check: _check
        };

        function _check(){
            Api.sendRequest({
                    method: "GET",
                    url: AppConfig.apiEndpoint + '/advice'
                })
                .then(function(response){
                    if (response.data.advice) {
                        $rootScope.adviceMessage = response.data.message;
                        Layout.goAdvice();
                    } else Layout.goHome();

                });
        }

        return returnObj;
    }

    module.exports = angularModule;
})();