(function () {
    'use strict';
    /* ***************************************************************************
     * ### Service module ###
     *
     * Contains the utility and helper functions used through whole application.
     */

    var angularModule = angular.module('App.UserService');

    angularModule.service('UserService', [
        '$localStorage',
        '$rootScope',
        'Api',
        'AppConfig',
        UserService
    ]);

    function UserService($localStorage, $rootScope, Api, AppConfig) {
        var returnObj;
        returnObj = {
            initUser: _initUser,
            resetUser: _resetUser,
            getUserToCartData: _getUserToCartData,
            getUser: _getUser,
            updateUser: _updateUser,
            loadFromProviderId: _loadFromProviderId,
            processUserFieldsFromFacebook: _processUserFieldsFromFacebook,
            setUser: _setUser
        };

        $localStorage = $localStorage.$default({
            //things: []
            starter_facebook_user: null
        });

        function _initUser(){
            $rootScope.user = _getUser();
            if ($rootScope.user!=undefined) _loadFromProviderId($rootScope.user.userID);
        }

        function _resetUser(){
            _setUser();
            _initUser();
        }

        function processFromApiPartnerError(){
            //$rootScope.user = _getUser();
            transferFieldsFromApiPartnerToCartData();
        }

        function processFieldsFromApiPartner(fields){
            _updateUser(fields);
            $rootScope.user = _getUser();
            transferFieldsFromApiPartnerToCartData();
        }

        function _processUserFieldsFromFacebook(fields){
            _setUser(fields);
            $rootScope.user = _getUser();
            transferFacebookUserToCartData();
            _loadFromProviderId(fields.userID);
        }

        function srtDateToObj(str){
            var pattern = /(\d{2})(\/)(\d{2})(\/)(\d{4})/i;
            var d = str.match(pattern);
            var objDate;
            //console.log('====================== '+test.toISOString());
            //console.log('====================== '+test.formatDate('Y-m-d'));
            //console.log('====================== '+test.getFullYear()+"-"+month+"-"+day);
            //if (d===null) objDate = new Date();
            if (d===null) return undefined;
            else objDate = new Date(d[5],d[3],d[1]);

            //var day = ("0" + objDate.getDate()).slice(-2);
            //var month = ("0" + objDate.getMonth()).slice(-2);
            //return objDate.getFullYear()+"-"+month+"-"+day;
            return objDate;
        }

        function transferFieldsFromApiPartnerToCartData() {
            var user = _getUser();

            function showInputsByDefault() {
                $rootScope.cartData.showNameInput = true;
                $rootScope.cartData.nome = user.name;

                $rootScope.cartData.showDateInput = true;
                if (user.birthday != undefined && user.birthday.length == 10)
                    $rootScope.cartData.data_nascimento = srtDateToObj(user.birthday);
                else
                    $rootScope.cartData.data_nascimento = undefined;

                $rootScope.cartData.showEmailInput = true;
                $rootScope.cartData.email = user.userEmail;

                $rootScope.cartData.showTelefoneInput = true;
                $rootScope.cartData.showWhatsappInput = true;
                $rootScope.cartData.showAddressList = false;
            }

            if (user!=undefined){
                // define o mandante
                if (user.mandante!=undefined) $rootScope.cartData.mandante = user.mandante;
                else $rootScope.cartData.mandante = 'ilhanet';

                if (user.user_id!=undefined) {
                    // User encontrado
                    $rootScope.cartData.user_id = user.user_id;

                    if (user.partner_id!=undefined) {
                        // Partner Encontrado
                        $rootScope.cartData.partner_id = user.partner_id;

                        $rootScope.cartData.showNameInput = false;
                        $rootScope.cartData.showDateInput = !(user.partner_data_nascimento!=undefined && user.partner_data_nascimento.length==10);

                        $rootScope.cartData.showEmailInput = (user.partner_emails==undefined);
                        $rootScope.cartData.showTelefoneInput = (user.partner_telefones==undefined);
                        $rootScope.cartData.showWhatsappInput = (user.partner_whatsapps==undefined);

                        if (user.partner_addresses!=undefined){
                            $rootScope.cartData.showAddressList = true;
                            $rootScope.cartData.address_id = user.partner_addresses[0].id;
                        } else $rootScope.cartData.showAddressList = false;

                    } else {
                        //Partner não encontrado
                        showInputsByDefault();
                    }
                } else {
                    // User não encontrado
                    showInputsByDefault();
                }
            } else $rootScope.c.debug('Error: _getUser() return undefined in _transferFieldsFromApiPartnerToCartData()');

        }

        function transferFacebookUserToCartData() {
            var user = _getUser();
            if (user!=undefined){
                //define campos do facebook
                if (user.userID!=undefined) $rootScope.cartData.user_provider_id = user.userID;
                if (user.name!=undefined) $rootScope.cartData.name = user.name;
                if (user.picture!=undefined) $rootScope.cartData.picture = user.picture;
                if (user.userEmail!=undefined) $rootScope.cartData.userEmail = user.userEmail;

                //if (user.birthday!=undefined && user.birthday.length==10)
                //    $rootScope.cartData.data_nascimento = srtDateToObj(user.birthday);

            } else $rootScope.c.debug('Error: _getUser() return undefined in _transferFacebookUserToCartData()');
        }

        function _getUserToCartData() {
            if ($rootScope.user==undefined){
                //$rootScope.user = _getUser();
            }
            if ($rootScope.user!=undefined){
                //if ($rootScope.user.mandante!=undefined){
                //    $rootScope.cartData.mandante = $rootScope.user.mandante;
                //} else $rootScope.cartData.mandante = 'ilhanet';

                //if ($rootScope.user.userID!=undefined){
                //    $rootScope.cartData.user_provider_id = $rootScope.user.userID;
                //}

                //if ($rootScope.user.user_id!=undefined){
                //    $rootScope.cartData.user_id = $rootScope.user.user_id;
                //} else {
                //    //$rootScope.cartData.name = $rootScope.user.name;
                //    //$rootScope.cartData.picture = $rootScope.user.picture;
                //    //$rootScope.cartData.email = $rootScope.user.email;
                //}

                //if ($rootScope.user.partner_id!=undefined){
                //    $rootScope.cartData.partner_id = $rootScope.user.partner_id;
                //}
                //if ($rootScope.user.partner_nome!=undefined){
                //    //$rootScope.cartData.nome = $rootScope.user.partner_nome;
                //} else $rootScope.cartData.nome = $rootScope.user.name;
                //
                //if ($rootScope.user.partner_data_nascimento!=undefined){
                //    //$rootScope.cartData.data_nascimento = srtDateToObj($rootScope.user.partner_data_nascimento);
                //} else if ($rootScope.user.birthday!=undefined && $rootScope.user.birthday.length==10) {
                //    $rootScope.cartData.data_nascimento = srtDateToObj($rootScope.user.birthday);
                //}
                //
                //if ($rootScope.user.partner_emails!=undefined){
                //    //$rootScope.cartData.email = $rootScope.user.partner_emails[0];
                //} else $rootScope.cartData.email = $rootScope.user.email;

                //if ($rootScope.user.partner_telefones!=undefined){
                //    //$rootScope.cartData.telefone = $rootScope.user.partner_telefones[0];
                //}

                //if ($rootScope.user.partner_whatsapps!=undefined){
                //    //$rootScope.cartData.whatsapp = $rootScope.user.partner_whatsapps[0];
                //}

                //if ($rootScope.user.partner_addresses!=undefined){
                //    $rootScope.cartData.addresses = $rootScope.user.partner_addresses;
                //    $rootScope.cartData.address_id = $rootScope.user.partner_addresses[0].id;
                //    //$rootScope.cartData.cep = $rootScope.user.partner_addresses[0].cep;
                //    //$rootScope.cartData.endereco = $rootScope.user.partner_addresses[0].logradouro;
                //    //$rootScope.cartData.bairro = $rootScope.user.partner_addresses[0].bairro;
                //    //$rootScope.cartData.numero = $rootScope.user.partner_addresses[0].numero;
                //    //$rootScope.cartData.complemento = $rootScope.user.partner_addresses[0].complemento;
                //}
            }
        }

        function _getUser() {
            $rootScope.c.debug('Getting user_data', $localStorage.starter_facebook_user);
            if ($localStorage.starter_facebook_user===null) return undefined;
            return JSON.parse($localStorage.starter_facebook_user || '{}');
            //return JSON.parse($window.localStorage.starter_facebook_user || '{}');
        }

        function _setUser(user_data) {
            $rootScope.c.debug('Setting user_data', JSON.stringify(user_data));
            $localStorage.starter_facebook_user = JSON.stringify(user_data);
            //$window.localStorage.starter_facebook_user = JSON.stringify(user_data);
        }

        function _updateUser(user_data) {
            $rootScope.c.debug('Updating user_data', JSON.stringify(user_data));
            var old_user_data = _getUser();
            var prop;
            for (prop in user_data) {
                old_user_data[prop] = user_data[prop];
            }
            _setUser(old_user_data);
            //$rootScope.c.debug('Updating user_data', JSON.stringify(old_user_data));
        }

        function _loadFromProviderId(id) {
            Api.sendRequest({
                    method: "GET",
                    url: AppConfig.apiEndpoint + '/partnerProviderId/'+id
                })
                .then(function(response){
                    var response_fields = {};
                    if (response.data.error===false) {
                        response_fields.mandante = response.data.mandante;
                        response_fields.user_id = response.data.user_id;
                        response_fields.partner_id = response.data.partner_id;
                        response_fields.partner_nome = response.data.partner_nome;
                        response_fields.partner_data_nascimento = response.data.partner_data_nascimento;
                        if (response.data.partner_emails!=undefined) response_fields.partner_emails = response.data.partner_emails;
                        if (response.data.partner_telefones!=undefined) response_fields.partner_telefones = response.data.partner_telefones;
                        if (response.data.partner_whatsapps!=undefined) response_fields.partner_whatsapps = response.data.partner_whatsapps;
                        if (response.data.partner_addresses!=undefined) response_fields.partner_addresses = response.data.partner_addresses;
                        processFieldsFromApiPartner(response_fields);
                    }
                    else {
                        processFromApiPartnerError();
                        $rootScope.c.debug(response.data.message);
                    }
                });
        }

        return returnObj;
    }

    module.exports = angularModule;
})();