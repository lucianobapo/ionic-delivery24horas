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
        VersionService
    ]);

    function VersionService($rootScope, Api, AppConfig, Layout) {
        var returnObj;
        returnObj = {
            check: _check
        };

        function _check(){
            if (AppConfig.cordova) {
                cordova.getAppVersion(function(version) {
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
                });
            }
        }

        return returnObj;
    }

    module.exports = angularModule;
})();