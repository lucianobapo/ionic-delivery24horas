(function () {
    'use strict';
    /* ***************************************************************************
     * ### Service module ###
     *
     * Contains the utility and helper functions used through whole application.
     */

    var angularModule = angular.module('App.VirtualPage');

    angularModule.run([
        '$rootScope',
        'AppConfig',
        VirtualPage
    ]);

    function VirtualPage($rootScope, AppConfig) {
        if (AppConfig.production) {
            $rootScope.$on("$routeChangeStart",function(event, next, current){
                if(next.templateUrl) {
                    console.log(next.templateUrl);
                    console.log(ga);
                    ga('send', 'pageview', { page: next.templateUrl });
                }
            });
        }
    }

    module.exports = angularModule;
})();