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
        apiEndpoint: 'http://api.delivery24horas.com/json',
        imagesUrl: 'https://s3.amazonaws.com/delivery-images/images/',
        logoUrl: 'https://s3.amazonaws.com/delivery-images/logo/'
    });
    configModule.value("globals", {});

    module.exports = configModule;
})();