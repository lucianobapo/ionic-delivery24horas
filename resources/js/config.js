(function () {
    'use strict';


    /* ***************************************************************************
     * ### Project common configuration ###
     *
     * Used to store some global variables and configuration settings.
     */

    /*! */
    var configModule = angular.module('App.Config');

    // @if (ENVIRONMENT == 'production' && CORDOVA)
    configModule.constant('AppConfig', {
        enableInfiniteScroll: false,
        production: true,
        debug: false,
        cordova: true,
        facebookID: '1581785262035600',
        servicoCep: function(query){ return 'https://viacep.com.br/ws/'+query+'/json/'; },
        apiEndpoint: 'https://api.ilhanet.com/api',
        imagesUrl: 'https://storage.googleapis.com/ilhanet-140808.appspot.com/thumbnails/',
        campanhasUrl: 'https://storage.googleapis.com/ilhanet-140808.appspot.com/campanhas/',
        logoUrl: 'https://storage.googleapis.com/ilhanet-140808.appspot.com/logo/'
    });
    // @endif

    // @if (ENVIRONMENT == 'production' && !CORDOVA)
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
    // @endif

    // @if (ENVIRONMENT == 'development' && !CORDOVA)
    configModule.constant('AppConfig', {
        enableInfiniteScroll: false,
        production: false,
        debug: true,
        cordova: false,
        facebookID: '1630647053816087',
        servicoCep: function(query){ return 'https://viacep.com.br/ws/'+query+'/json/'; },
        apiEndpoint: 'http://api.localhost.com/api',
        imagesUrl: 'https://storage.googleapis.com/ilhanet-140808.appspot.com/thumbnails/',
        campanhasUrl: 'https://storage.googleapis.com/ilhanet-140808.appspot.com/campanhas/',
        logoUrl: 'https://storage.googleapis.com/ilhanet-140808.appspot.com/logo/'
    });
    // @endif

    // @if (ENVIRONMENT == 'development' && CORDOVA)
    configModule.constant('AppConfig', {
        enableInfiniteScroll: false,
        production: false,
        debug: true,
        cordova: true,
        facebookID: '1630647053816087',
        servicoCep: function(query){ return 'https://viacep.com.br/ws/'+query+'/json/'; },
        apiEndpoint: '/api',
        imagesUrl: 'https://storage.googleapis.com/ilhanet-140808.appspot.com/thumbnails/',
        campanhasUrl: 'https://storage.googleapis.com/ilhanet-140808.appspot.com/campanhas/',
        logoUrl: 'https://storage.googleapis.com/ilhanet-140808.appspot.com/logo/'
    });
    // @endif

    configModule.value("globals", {});

    module.exports = configModule;
})();