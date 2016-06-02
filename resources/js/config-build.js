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
        cordova: true,
        facebookID: '1581785262035600',
        servicoCep: function(query){ return 'https://viacep.com.br/ws/'+query+'/json/'; },
        apiEndpoint: 'http://api.delivery24horas.com/json',
        imagesUrl: 'https://s3.amazonaws.com/delivery-images/thumbnails/',
        logoUrl: 'https://s3.amazonaws.com/delivery-images/logo/'
    });
    configModule.value("globals", {});

    module.exports = configModule;
})();