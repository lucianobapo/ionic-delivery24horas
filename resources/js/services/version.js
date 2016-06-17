(function () {
    'use strict';
    /* ***************************************************************************
     * ### Service module ###
     *
     * Contains the utility and helper functions used through whole application.
     */

    var angularModule = angular.module('App.VersionService');

    angularModule.service('VersionService', [
        '$rootScope',
        'Api',
        'AppConfig',
        'Layout',
        '$window',
        VersionService
    ]);

    function VersionService($rootScope, Api, AppConfig, Layout, $window) {
        var returnObj;
        returnObj = {
            check: _check
        };

        function _check(version){
            Api.sendRequest({
                    method: "GET",
                    url: AppConfig.apiEndpoint + '/appVersion'
                })
                .then(function(response){
                    if (response.data.version!==version && response.data.version.replace(".","")>version.replace(".","")) {
                        $rootScope.appVersion = version;
                        $rootScope.appNewVersion = response.data.version;
                        Layout.goVersion();
                    }//else console.log(response.data.version);
                });

            //if (AppConfig.cordova) {
            //    console.log(cordova.getAppVersion);
            //    //console.log(window.cordova.plugins);
            //    cordova.getAppVersion(function(version) {
            //        Api.sendRequest({
            //                method: "GET",
            //                url: AppConfig.apiEndpoint + '/appVersion'
            //            })
            //            .then(function(response){
            //                if (response.data.version!==version && response.data.version.replace(".","")>version.replace(".","")) {
            //                    $rootScope.appVersion = version;
            //                    $rootScope.appNewVersion = response.data.version;
            //                    Layout.goVersion();
            //                }//else console.log(response.data.version);
            //            });
            //    });
            //}
        }

        return returnObj;
    }

    module.exports = angularModule;
})();