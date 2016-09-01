(function () {
    'use strict';


    /* ***************************************************************************
     * ### Project common configuration ###
     *
     * Used to store some global variables and configuration settings.
     */

    /*! */
    var configModule = angular.module('App.Config');

    configModule.constant('AppConfig', {
        debug: false,
        cordova: false,
        facebookID: '1581785262035600',
        servicoCep: function(query){ return 'https://viacep.com.br/ws/'+query+'/json/'; },
        apiEndpoint: 'https://api.ilhanet.com/json',
        imagesUrl: 'https://storage.googleapis.com/ilhanet-140808.appspot.com/thumbnails/',
        logoUrl: 'https://storage.googleapis.com/ilhanet-140808.appspot.com/logo/'
    });
    configModule.value("globals", {});

    module.exports = configModule;
})();