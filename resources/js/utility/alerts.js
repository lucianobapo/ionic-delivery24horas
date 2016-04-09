(function () {
    'use strict';

    /* ***************************************************************************
     * ### Common API module ###
     *
     * This is a project common api service. It's used for sending all api requests in the application.
     * It handles success and error response by default, if it's not set custom callback function explicitly.
     */

    /*! */

    var moduleApp = angular.module('App.Alerts');

    moduleApp.service('Alerts', [
        '$rootScope',
        '$ionicPopup',
        alerts
    ]);

    function alerts($rootScope, $ionicPopup) {
        var returnObj;
        returnObj = {
            numbersOnly: _numbersOnly,
            customAlert: _customAlert,
            invalidCep: _invalidCep
        };

        function _numbersOnly() {
            var alertPopup = $ionicPopup.alert({
                title: 'Alerta',
                template: 'Digite somente números',
                buttons: [
                    {
                        text: 'OK',
                        type: 'button-assertive'
                    }
                ]
            });
            alertPopup.then(function(res) {
                $rootScope.c.debug('Campo somente números');
            });
        }

        function _invalidCep(cep) {
            var alertPopup = $ionicPopup.alert({
                title: 'CEP inválido',
                template: 'CEP '+cep+' não foi encontrado',
                buttons: [
                    {
                        text: 'OK',
                        type: 'button-assertive'
                    }
                ]
            });
            alertPopup.then(function(res) {
                $rootScope.c.debug('CEP '+cep+' não foi encontrado');
            });
        }

        function _customAlert(title,template) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: template,
                buttons: [
                    {
                        text: 'OK',
                        type: 'button-assertive'
                    }
                ]
            });
            alertPopup.then(function(res) {
                $rootScope.c.debug(template);
            });
        }

        return returnObj;

    }

    module.exports = moduleApp;
})();