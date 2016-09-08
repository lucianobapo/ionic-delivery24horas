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
        enableInfiniteScroll: false,
        production: true,
        debug: false,
        cordova: false,
        facebookID: '1581785262035600',
        servicoCep: function(query){ return 'https://viacep.com.br/ws/'+query+'/json/'; },
        apiEndpoint: 'https://api.ilhanet.com/api',
        imagesUrl: 'https://storage.googleapis.com/ilhanet-140808.appspot.com/thumbnails/',
        campanhasUrl: 'https://storage.googleapis.com/ilhanet-140808.appspot.com/campanhas/',
        logoUrl: 'https://storage.googleapis.com/ilhanet-140808.appspot.com/logo/'
    });
    configModule.value("globals", {});

    module.exports = configModule;
})();