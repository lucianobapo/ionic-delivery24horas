(function () {
    'use strict';

    /* ***************************************************************************
     * ### CartService module ###
     *
     * Contains the CartService functions used through whole application.
     */

    var angularModule = angular.module('App.CartService');

    angularModule.service('CartService', [
        '$ionicModal',
        'Alerts',
        '$rootScope',
        'Api',
        'AppConfig',
        '$filter',
        'Layout',
        'UserService',
        cartService
    ]);

    function cartService($ionicModal, Alerts, $rootScope, Api, AppConfig, $filter, Layout, UserService) {

        var interfaceObj;
        var cartData;

        interfaceObj = {
            initCart: _initCart,
            closeCart: _closeCart,
            showCart: _showCart,
            doDelivery: _doDelivery,
            selecionaEndereco: _selecionaEndereco,
            existeItens: _existeItens
        };

        /*
         * ### *Public methods* ###
         */

        function loadInitialData() {
            // Form data for the login modal
            $rootScope.cartData = {};
            $rootScope.cartData.pagamento = 'dinheiro';
            $rootScope.cartData.matches = [];
            $rootScope.cartData.addresses = [];
            $rootScope.cartData.address_id = false;
            $rootScope.cartData.emailChanged = false;
            $rootScope.cartData.cep = '';
            UserService.getUserToCartData();
        }

        function _initCart() {
            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('cart/templates/cart.html', {
                scope: $rootScope
            }).then(function (modal) {
                $rootScope.c.debug('Creating modal');
                $rootScope.cartModal = modal;
            });

            loadInitialData();
        }

        function _existeItens() {
            return ($rootScope.valorTotal>0);
        }
        function _closeCart() {
            $rootScope.c.debug('Closing modal');
            $rootScope.cartModal.hide();
        }
        function _showCart() {
            $rootScope.c.debug('Opening modal');
            $rootScope.cartModal.show();
        }
        function _selecionaEndereco(address) {
            $rootScope.cartData.matches = [];
            if (angular.isString(address.cep)) $rootScope.cartData.cep = address.cep.replace('-','');
            else $rootScope.cartData.cep = address.cep;
            $rootScope.cartData.endereco = address.logradouro;
            if (address.numero!=undefined) $rootScope.cartData.numero = address.numero;
            //if (address.complemento!=undefined) $rootScope.cartData.complemento = address.complemento;
            $rootScope.cartData.bairro = address.bairro;
        }
        function _doDelivery() {
            $rootScope.disableButton = true;
            cartData = $rootScope.cartData;
            cartData.itens = $rootScope.cartItems;

            if ($rootScope.user.partner_nome==undefined){
                if(cartData.nome==undefined || cartData.nome.length==0) {
                    Alerts.customAlert('Alerta', 'Digite um nome válido.');
                    $rootScope.disableButton = false;
                    return false;
                }
            }

            if ( ($rootScope.user.partner_emails.length==0 && (cartData.email==undefined || cartData.email.length==0))
                && ($rootScope.user.partner_telefones.length==0 && (cartData.telefone==undefined || cartData.telefone.length==0))
                && ($rootScope.user.partner_whatsapps.length==0 && (cartData.whatsapp==undefined || cartData.whatsapp.length==0)) )
            {
                Alerts.customAlert('Alerta', 'Digite ao menos um contato válido. Email, Telefone ou Watsapp.');
                $rootScope.disableButton = false;
                return false;
            }

            if(cartData.address_id===false) {
                if(cartData.endereco==undefined || cartData.endereco.length==0) {
                    Alerts.customAlert('Alerta', 'Digite um endereço válido.');
                    $rootScope.disableButton = false;
                    return false;
                }

                if(cartData.matches.length!=0){
                    Alerts.customAlert('Alerta', 'Selecione um endereço válido.');
                    $rootScope.disableButton = false;
                    return false;
                }

                if(cartData.bairro==undefined || cartData.bairro.length==0) {
                    Alerts.customAlert('Alerta', 'Digite um bairro válido.');
                    $rootScope.disableButton = false;
                    return false;
                }

                if(cartData.numero==undefined || cartData.numero.length==0) {
                    Alerts.customAlert('Alerta', 'Digite um número válido.');
                    $rootScope.disableButton = false;
                    return false;
                }
            }

            Api.sendRequest({
                    method: "POST",
                    data: { 'message' : cartData },
                    url: AppConfig.apiEndpoint + '/ordem'
                })
                .then(function(response){
                    var resp = response.data;
                    if (resp.hasOwnProperty('error')){
                        if (resp.error)
                            Alerts.customAlert('Erro',resp.message);
                        else{
                            $rootScope.removeTodosItens();
                            loadInitialData();
                            UserService.loadFromProviderId($rootScope.user.userID);
                            Layout.goHome();
                            Alerts.customAlert('Ordem Criada','Número '+resp.id+' - Valor Total ' + $filter('currency')(resp.valor_total));
                        }
                    }
                    else {
                        Alerts.customAlert('Erro','Falha na Requisição');

                    }
                    $rootScope.disableButton = false;
                });
        }
        return interfaceObj;
    }

    module.exports = angularModule;
})();