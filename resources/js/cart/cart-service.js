(function () {
    'use strict';

    /* ***************************************************************************
     * ### Common API module ###
     *
     * This is a project common api service. It's used for sending all api requests in the application.
     * It handles success and error response by default, if it's not set custom callback function explicitly.
     */

    /*! */

    var moduleApp = angular.module('App.CartService');

    moduleApp.service('CartService', [
        '$ionicModal',
        'Alerts',
        '$rootScope',
        cartService
    ]);

    function cartService($ionicModal, Alerts, $rootScope) {

        var interfaceObj;

        interfaceObj = {
            initCart: _initCart
        };

        /*
         * ### *Public methods* ###
         */

        function _initCart() {
            var cartModal;

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('cart/templates/cart.html', {
                scope: $rootScope
            }).then(function (modal) {
                cartModal = modal;
            });
            // Triggered in the cart modal to close it
            $rootScope.closeCart = function () {
                $rootScope.c.debug('Closing modal');
                cartModal.hide();
            };
            // Open the login modal
            $rootScope.showCart = function () {
                $rootScope.c.debug('Opening modal');
                cartModal.show();
            };
            // Form data for the login modal
            $rootScope.cartData = {};
            $rootScope.cartData.pagamento = 'dinheiro';
            $rootScope.cartData.matches = [];
            $rootScope.cartData.cep = '';

            // Form Submit
            $rootScope.doDelivery = function() {
                if($rootScope.cartData.nome==undefined || $rootScope.cartData.nome.length==0) {
                    Alerts.customAlert('Nome', 'Digite um nome válido.');
                    return false;
                }

                if ( ($rootScope.cartData.email==undefined || $rootScope.cartData.email.length==0)
                && ($rootScope.cartData.telefone==undefined || $rootScope.cartData.telefone.length==0)
                && ($rootScope.cartData.whatsapp==undefined || $rootScope.cartData.whatsapp.length==0) )
                {
                    Alerts.customAlert('Contato', 'Digite ao menos um contato válido. Email, Telefone ou Watsapp.');
                    return false;
                }

                if($rootScope.cartData.endereco==undefined || $rootScope.cartData.endereco.length==0) {
                    Alerts.customAlert('Endereço', 'Digite um endereço válido.');
                    return false;
                }

                if($rootScope.cartData.matches.length!=0){
                    Alerts.customAlert('Endereço', 'Selecione um endereço válido.');
                    return false;
                }

                if($rootScope.cartData.bairro==undefined || $rootScope.cartData.bairro.length==0) {
                    Alerts.customAlert('Endereço', 'Digite um bairro válido.');
                    return false;
                }

                if($rootScope.cartData.numero==undefined || $rootScope.cartData.numero.length==0) {
                    Alerts.customAlert('Endereço', 'Digite um número válido.');
                    return false;
                }

                Alerts.customAlert('Entrega',JSON.stringify($rootScope.cartData));
            };

            $rootScope.selecionaEndereco = function (address) {
                $rootScope.cartData.matches = [];
                $rootScope.cartData.cep = address.cep.replace('-','');
                $rootScope.cartData.endereco = address.logradouro;
                $rootScope.cartData.bairro = address.bairro;
            };
        }
        return interfaceObj;
    }

    module.exports = moduleApp;
})();