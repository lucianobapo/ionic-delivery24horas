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
            loadInitialData: _loadInitialData,
            doDelivery: _doDelivery,
            selecionaEndereco: _selecionaEndereco,
            existeItens: _existeItens
        };

        /*
         * ### *Public methods* ###
         */

        function _loadInitialData() {
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

            _loadInitialData();
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

            if (validateFields()===false) {
                $rootScope.c.debug('Validate Error');
                $rootScope.disableButton = false;
                return false;
            }

            cartData = $rootScope.cartData;
            cartData.itens = $rootScope.cartItems;
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
                            _loadInitialData();
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

        function validateFields() {
            // Valida nome
            if ($rootScope.user==undefined || $rootScope.user.partner_nome==undefined){
                if($rootScope.cartData.nome==undefined || $rootScope.cartData.nome.length==0) {
                    Alerts.customAlert('Alerta', 'Digite um nome válido.');
                    $rootScope.disableButton = false;
                    return false;
                }
            }

            // Valida contatos
            if ($rootScope.user==undefined ||
                ( ($rootScope.user.partner_emails==undefined || $rootScope.user.partner_emails.length==0)
                && ($rootScope.user.partner_telefones==undefined || $rootScope.user.partner_telefones.length==0)
                && ($rootScope.user.partner_whatsapps==undefined || $rootScope.user.partner_whatsapps.length==0) ))
            {
                if ($rootScope.cartData.email==undefined || $rootScope.cartData.email.length==0) {
                    if ($rootScope.cartData.telefone==undefined || $rootScope.cartData.telefone.length==0){
                        if ($rootScope.cartData.whatsapp==undefined || $rootScope.cartData.whatsapp.length==0){
                            Alerts.customAlert('Alerta', 'Digite ao menos um contato válido. Email, Telefone ou Watsapp.');
                            $rootScope.disableButton = false;
                            return false;
                        }
                    }
                }
            }

            // Valida endereço
            if($rootScope.cartData.address_id===false) {
                if($rootScope.cartData.endereco==undefined || $rootScope.cartData.endereco.length==0) {
                    Alerts.customAlert('Alerta', 'Digite um endereço válido.');
                    $rootScope.disableButton = false;
                    return false;
                }

                if($rootScope.cartData.matches.length!=0){
                    Alerts.customAlert('Alerta', 'Selecione um endereço válido.');
                    $rootScope.disableButton = false;
                    return false;
                }

                if($rootScope.cartData.bairro==undefined || $rootScope.cartData.bairro.length==0) {
                    Alerts.customAlert('Alerta', 'Digite um bairro válido.');
                    $rootScope.disableButton = false;
                    return false;
                }

                if($rootScope.cartData.numero==undefined || $rootScope.cartData.numero.length==0) {
                    Alerts.customAlert('Alerta', 'Digite um número válido.');
                    $rootScope.disableButton = false;
                    return false;
                }
            }

            return true;
        }
        return interfaceObj;
    }

    module.exports = angularModule;
})();