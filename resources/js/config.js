(function () {
    'use strict';


    /* ***************************************************************************
     * ### Project common configuration ###
     *
     * Used to store some global variables and configuration settings.
     */

    /*! */
    var configModule = angular.module('App.Config');

    // @if ENVIRONMENT == 'production'
    configModule.constant('AppConfig', {
        apiEndpoint: 'http://api.delivery24horas.com/json',
        imagesUrl: 'https://s3.amazonaws.com/delivery-images/images/',
        logoUrl: 'https://s3.amazonaws.com/delivery-images/logo/'
    });
    // @endif

    // @if ENVIRONMENT == 'development'
    configModule.constant('AppConfig', {
        apiEndpoint: 'http://api.localhost.com/json',
        imagesUrl: 'https://s3.amazonaws.com/delivery-images/images/',
        logoUrl: 'https://s3.amazonaws.com/delivery-images/logo/'
    });
    // @endif

    configModule.value("globals", {});

    module.exports = configModule;
})();