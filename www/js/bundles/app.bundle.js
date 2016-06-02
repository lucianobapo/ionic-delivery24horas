(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('App.Config', []);
    angular.module('App.HttpPostFix', []);
    angular.module('templates', []);
    angular.module('App.Helpers', []);
    angular.module('App.Api', []);
    angular.module('App.Directives', []);
    angular.module('App.Services', []);
    angular.module('App.CartService', []);
    angular.module('App.FacebookService', []);
    angular.module('App.UserService', []);
    angular.module('App.Alerts', []);

    angular.module('App.Common', []);
    //angular.module('App.Playlist', []);
    angular.module('App.ProductList', []);
    angular.module('App.Cart', []);
    angular.module('App.Chat', []);
    angular.module('App.Report', []);

    require('./config-build');
    require('./templates-build');
    require('./utility/postfix');
    require('./utility/helpers');
    require('./utility/api');
    require('./utility/directives');
    require('./utility/services');
    require('./services/cart');
    require('./services/facebook');
    require('./services/user');
    require('./utility/alerts');

    require('./common/common');
    require('./productlist/productlist');
    require('./cart/cart');
    require('./chat/chat');
    require('./report/report');

    //require('./playlist/playlist');

    var appModule = angular.module('App', [

        // Ionic and angular modules
        'ionic',
        'ngStorage',
        //'ion-affix',
        //'httpPostFix',

        // Project modules
        'App.HttpPostFix',
        'App.Config',
        'App.Helpers',
        'App.Common',
        'App.Api',
        'App.Directives',
        'App.Services',
        'App.CartService',
        'App.FacebookService',
        'App.UserService',
        'App.Alerts',
        //'App.Playlist',
        'App.ProductList',
        'App.Cart',
        'App.Chat',
        'App.Report',
        'templates'
    ]);

    appModule.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$httpProvider',

        function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.interceptors.push('loadingMarker');

            $stateProvider
                .state('app', {
                    url: "/app",
                    abstract: true,
                    templateUrl: 'common/templates/menu.html',
                    controller: 'CommonCtrl'
                })

                // setup an abstract state for the tabs directive
                .state('tab', {
                    url: '/tab',
                    abstract: true,
                    templateUrl: 'common/templates/tabs.html'
                })
                // Each tab has its own nav history stack:

                .state('tab.cart', {
                    url: '/cart',
                    views: {
                        'tab-cart': {
                            //templateUrl: 'tabs/tab-cart.html',
                            templateUrl: 'cart/templates/cart.html',
                            controller: 'CartCtrl'
                        }
                    }
                })

                .state('tab.chats', {
                    url: '/chats',
                    views: {
                        'tab-chats': {
                            templateUrl: 'chat/templates/tab-chats.html',
                            controller: 'ChatsCtrl'
                        }
                    }
                })
                .state('tab.chat-detail', {
                    url: '/chats/:chatId',
                    views: {
                        'tab-chats': {
                            templateUrl: 'chat/templates/chat-detail.html',
                            controller: 'ChatDetailCtrl'
                        }
                    }
                })

                .state('tab.account', {
                    url: '/account',
                    views: {
                        'tab-account': {
                            templateUrl: 'account/templates/tab-account.html'//,
                            //controller: 'AccountCtrl'
                        }
                    }
                })

                .state('tab.home', {
                    url: '/home',
                    views: {
                        'tab-home': {
                            templateUrl: 'productlist/templates/productlist.html',
                            controller: 'ProductListCtrl'
                        }
                    }
                })

                //.state('app.search', {
                //    url: '/search',
                //    views: {
                //        'menuContent': {
                //            templateUrl: 'search.html'
                //        }
                //    }
                //})

                .state('app.browse', {
                    url: '/browse',
                    views: {
                        'menuContent': {
                            templateUrl: 'browse.html'
                        }
                    }
                })

                .state('app.report', {
                    url: '/report',
                    views: {
                        'menuContent': {
                            templateUrl: 'report/templates/report.html',
                            controller: 'ReportCtrl'
                        }
                    }
                })

                .state('app.reportperiod', {
                    url: '/report/:period',
                    views: {
                        'menuContent': {
                            templateUrl: 'report/templates/report.html',
                            controller: 'ReportCtrl'
                        }
                    }
                })

                .state('app.productlist', {
                    url: '/productlist',
                    views: {
                        'menuContent': {
                            templateUrl: 'productlist/templates/productlist.html',
                            controller: 'ProductListCtrl'
                        }
                    }
                })
                ;

            $urlRouterProvider.otherwise('/tab/home');
            //$urlRouterProvider.otherwise('/app/productlist');
            //$urlRouterProvider.otherwise('/app/report');

        }
    ]);

    appModule.controller('bodyController', [
        '$scope',
        '$rootScope',
        '$ionicModal',
        'CartService',
        'Categorias',
        'Layout',
        'Facebook',
        'AppConfig',
        bodyController
    ]);
    function bodyController($scope, $rootScope, $ionicModal, CartService, Categorias, Layout, Facebook, AppConfig) {
        $rootScope.CartService = CartService;
        $rootScope.CartService.initCart();
        Categorias.loadItems();
        Layout.check();

        if (AppConfig.cordova) {
            $rootScope.cordova = AppConfig.cordova;
            Facebook.initCordova();
        } else {
            $rootScope.cordova = AppConfig.cordova;
            Facebook.init();
        }

        // Create the loading modal that we will use later
        //$scope.loadingModal = $ionicModal.fromTemplate('loading.html');
        $ionicModal.fromTemplateUrl('loading.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.loadingModal = modal;
        });
        $rootScope.closeLoading = function () {
            $scope.loadingModal.hide();
        };
        $scope.$watch(function(){
            return $scope.loadingModal;
        }, function(value) {
            value.show();
        });

        $rootScope.rootCategoriaSelecionada = 'Todas';
        $rootScope.loadCategoria = function ($nome) {
            $rootScope.rootCategoriaSelecionada = $nome;
        };
    }

    appModule.run([
        '$ionicPlatform',
        '$rootScope',
        '$ionicLoading',
        'ReportSystem',
        appMain
    ]);

    function appMain($ionicPlatform, $rootScope, $ionicLoading, ReportSystem) {
        $rootScope.c = ReportSystem;

        $rootScope.$on('loading:show', function() {
            $ionicLoading.show({template: '<p>Carregando...</p><ion-spinner></ion-spinner>'});
        });

        $rootScope.$on('loading:hide', function() {
            $ionicLoading.hide();
        });

        $ionicPlatform.ready(function () {
            $rootScope.closeLoading();
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    }

    module.exports = appModule;
})();
},{"./cart/cart":2,"./chat/chat":3,"./common/common":4,"./config-build":5,"./productlist/productlist":6,"./report/report":7,"./services/cart":8,"./services/facebook":9,"./services/user":10,"./templates-build":11,"./utility/alerts":12,"./utility/api":13,"./utility/directives":14,"./utility/helpers":15,"./utility/postfix":16,"./utility/services":17}],2:[function(require,module,exports){
(function () {
    'use strict';

    var angularModule = angular.module('App.Cart');

    angularModule
        .controller('CartCtrl', [
            '$scope',
            '$rootScope',
            CartCtrl
        ]);

    function CartCtrl($scope, $rootScope) {
        $rootScope.c.debug('CartCtrl Controller: ', $scope.commonArray);
    }

    module.exports = angularModule;
})();
},{}],3:[function(require,module,exports){
(function () {
    'use strict';

    var angularModule = angular.module('App.Chat');

    angularModule.controller('ChatsCtrl', [
        '$scope',
        'Chats',
        ChatsCtrl
    ]);

    function ChatsCtrl($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
    }

    angularModule.controller('ChatDetailCtrl', [
        '$scope',
        '$stateParams',
        'Chats',
        ChatDetailCtrl
    ]);

    function ChatDetailCtrl($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    }

    module.exports = angularModule;
})();
},{}],4:[function(require,module,exports){
(function () {
    'use strict';

    var commonModule = angular.module('App.Common');

    commonModule.controller('CommonCtrl', [
        '$scope',
        '$rootScope',
        '$ionicModal',
        '$timeout',
        'Categorias',
        commonCtrl
    ]);

    function commonCtrl($scope, $rootScope, $ionicModal, $timeout, Categorias) {
        $scope.doRefresh = function () {
            Categorias.loadItems();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };

        $scope.commonArray = [4, 5, 6];
        $rootScope.c.debug('Common Controller');

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    }

    module.exports = commonModule;
})();
},{}],5:[function(require,module,exports){
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
        cordova: false,
        facebookID: '1581785262035600',
        servicoCep: function(query){ return 'https://viacep.com.br/ws/'+query+'/json/'; },
        apiEndpoint: 'http://api.delivery24horas.com/json',
        imagesUrl: 'https://s3.amazonaws.com/delivery-images/thumbnails/',
        logoUrl: 'https://s3.amazonaws.com/delivery-images/logo/'
    });
    configModule.value("globals", {});

    module.exports = configModule;
})();
},{}],6:[function(require,module,exports){
(function () {
    'use strict';

    var productListModule = angular.module('App.ProductList');

    productListModule
        .controller('ProductListCtrl', [
            '$scope',
            '$rootScope',
            'AppConfig',
            'Produtos',
            productListCtrl
        ]);

    function productListCtrl($scope, $rootScope, AppConfig, Produtos) {
        $rootScope.c.debug('ProductList Controller: ', $scope.commonArray);


        $scope.logoUrl = AppConfig.logoUrl;
        $scope.imagesUrl = AppConfig.imagesUrl;

        $rootScope.cartItems = [];
        $rootScope.quantidade = [];
        $rootScope.valorTotal = 0;
        $rootScope.products = [];


        $rootScope.removeItem = function (id) {
            if ($rootScope.quantidade[id] > 0) {
                $rootScope.quantidade[id]=0;
                $scope.somaTotal();
            }
        };
        $rootScope.removeTodosItens = function () {
            $rootScope.quantidade.forEach(function(valor, chave) {
                if ($rootScope.quantidade[chave] > 0) {
                    $rootScope.quantidade[chave]=0;
                }
            });
            $scope.somaTotal();
        };

        $scope.incrementa = function (id) {
            var max = document.getElementById('quantidade['+id+']').attributes['max'].value;
            if ($rootScope.quantidade[id] < max) {
                $rootScope.quantidade[id]++;
                $scope.somaTotal();
            }

        };
        $scope.decrementa = function (id) {
            var min = document.getElementById('quantidade['+id+']').attributes['min'].value;
            if ($rootScope.quantidade[id] > min) {
                $rootScope.quantidade[id]--;
                $scope.somaTotal();
            }
        };

        $scope.searchProductById = function (id) {
            var result = false;
            $rootScope.allProducts.forEach(function(item) {
                if (item.id==id) result = item;
            });
            return result;
        };

        $rootScope.clearSearch = function () {
            $scope.query='';
        };
        $scope.$watch(function(){
            return $scope.query;
        }, function(value) {
            if ($scope.query && $scope.query.length>0){
                if ($rootScope.rootCategoriaAntiga==undefined)
                    $rootScope.rootCategoriaAntiga = $rootScope.rootCategoriaSelecionada;
                $rootScope.loadCategoria("Resultados de '"+$scope.query+"'");
            } else {
                if ($rootScope.rootCategoriaAntiga!=undefined) {
                    $rootScope.loadCategoria($rootScope.rootCategoriaAntiga);
                    $rootScope.rootCategoriaAntiga = undefined;
                }
            }
        });

        $scope.somaTotal = function () {
            $rootScope.valorTotal = 0;
            $rootScope.cartItems = [];
            $rootScope.quantidade.forEach(function(valor, chave) {
                if ($rootScope.quantidade[chave]>0){
                    var productSelected = $scope.searchProductById(chave);
                    if (productSelected !==false ) {
                        $rootScope.cartItems.push({
                            id: productSelected.id,
                            nome: productSelected.nome,
                            quantidade: $rootScope.quantidade[chave],
                            valor: productSelected.valor
                        });
                        $rootScope.valorTotal = $rootScope.valorTotal + (productSelected.valor*$rootScope.quantidade[chave]);
                    }
                }
            });
            //console.log($rootScope.cartItems);
        };

        $scope.$watch(function(){
            return $rootScope.allProducts;
        }, function(value) {
            if ($rootScope.quantidade.length == 0 && $rootScope.allProducts !== undefined){
                $rootScope.allProducts.forEach(function(item) {
                    $rootScope.quantidade[item.id] = 0;
                });
            }
        });

        $rootScope.loadProducts = function (idCategory) {
            Produtos.loadItems(idCategory);
        };

        $scope.doRefresh = function () {
            Produtos.loadItems();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };
        Produtos.loadItems();

        $scope.prepareImage = function (img) {
            if (img==null || AppConfig.debug) return 'http://placehold.it/80x80';
            return AppConfig.imagesUrl+img;
        };
    }

    module.exports = productListModule;
})();
},{}],7:[function(require,module,exports){
(function () {
    'use strict';

    var reportModule = angular.module('App.Report');

    reportModule
        .controller('ReportCtrl', [
            '$scope',
            '$rootScope',
            '$stateParams',
            'AppConfig',
            'Api',
            reportCtrl
        ]);

    function reportCtrl($scope, $rootScope, $stateParams, AppConfig, Api) {
        $rootScope.c.debug('Report Controller: ', $scope.commonArray);

        //console.log($stateParams);
        //$scope.titulo = $routeParams;

        $rootScope.loadReport = function () {
            Api
                .sendRequest({
                    method: "GET",
                    url: AppConfig.apiEndpoint + '/relatorios'
                })
                .then(function(response){
                    $scope.report = response.data.data;
                    console.log(response.data.data);
                });
        };

        $scope.doRefresh = function () {
            $rootScope.loadReport();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };
        $rootScope.loadReport();
    }
    module.exports = reportModule;
})();
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
(function () {
    'use strict';
    /* ***************************************************************************
     * ### Helper module ###
     *
     * Contains the utility and helper functions used through whole application.
     */

    var angularModule = angular.module('App.FacebookService');

    angularModule.service('Facebook', [
        '$window',
        'AppConfig',
        '$rootScope',
        'UserService',
        'Layout',
        '$ionicLoading',
        '$q',
        '$ionicActionSheet',
        'CartService',
        Facebook
    ]);

    function Facebook($window, AppConfig, $rootScope, UserService, Layout, $ionicLoading, $q, $ionicActionSheet, CartService) {
        var returnObj;
        returnObj = {
            initCordova: _initCordova,
            init: _init
        };

        function setUserFields(apiResponse, authResponse){
            var fields = {
                authResponse: authResponse,
                userID: apiResponse.id,
                name: apiResponse.name,
                email: apiResponse.email,
                picture : "http://graph.facebook.com/" + apiResponse.id + "/picture?type=large"
            };
            if (apiResponse.age_range!=undefined) fields.minAge = apiResponse.age_range.min;
            if (apiResponse.birthday!=undefined) fields.birthday = apiResponse.birthday;
            UserService.setUser(fields);
            UserService.loadFromProviderId(apiResponse.id);
        }

        function _initCordova() {
            // This is the success callback from the login method
            var fbLoginSuccess = function(response) {
                if (!response.authResponse){
                    fbLoginError("Cannot find the authResponse");
                    return;
                }

                var authResponse = response.authResponse;

                $rootScope.c.debug('getFacebookProfileInfo');
                getFacebookProfileInfo(authResponse)
                    .then(function(profileInfo) {
                        // For the purpose of this example I will store user data on local storage
                        setUserFields(profileInfo, authResponse);
                        Layout.goHome();
                        $ionicLoading.hide();
                    }, function(fail){
                        // Fail get profile info
                        $rootScope.c.debug('profile info fail', fail);
                        Layout.goHome();
                        $ionicLoading.hide();
                    });
            };

            // This is the fail callback from the login method
            var fbLoginError = function(error){
                $rootScope.c.debug('fbLoginError', error);
                $ionicLoading.hide();
            };

            // This method is to get the user profile info from the facebook api
            var getFacebookProfileInfo = function (authResponse) {
                var info = $q.defer();
                facebookConnectPlugin.api('/me?fields=birthday,email,name,age_range&access_token=' + authResponse.accessToken, null,
                    function (response) {
                        $rootScope.c.debug(response);
                        info.resolve(response);
                    },
                    function (response) {
                        $rootScope.c.debug(response);
                        info.reject(response);
                    }
                );
                return info.promise;
            };

            var getLoginStatus = function(login){
                facebookConnectPlugin.getLoginStatus(function(success){
                    if(success.status === 'connected'){
                        // The user is logged in and has authenticated your app, and response.authResponse supplies
                        // the user's ID, a valid access token, a signed request, and the time the access token
                        // and signed request each expire
                        $rootScope.c.debug('getLoginStatus', success.status);

                        // Check if we have our user saved
                        //$rootScope.user = UserService.getUser();
                        //
                        //if($rootScope.user!=undefined && $rootScope.user.userID!=undefined){
                        //    fbLoginSuccess(success);
                        //}else{
                        //    //$state.go('app.home');
                        //    Layout.goHome();
                        //}
                        fbLoginSuccess(success);
                        $ionicLoading.hide();
                    } else if(success.status === 'not_authorized'){
                        $rootScope.c.debug('getLoginStatus', success.status);
                    } else {
                        // If (success.status === 'not_authorized') the user is logged in to Facebook,
                        // but has not authenticated your app
                        // Else the person is not logged into Facebook,
                        // so we're not sure if they are logged into this app or not.

                        $rootScope.c.debug('getLoginStatus', success.status);

                        if (login) {
                            $ionicLoading.show({
                                template: 'Logging in...'
                            });

                            // Ask the permissions you need. You can learn more about
                            // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
                            facebookConnectPlugin.login(['user_birthday', 'email', 'public_profile'], fbLoginSuccess, fbLoginError);
                        }
                    }
                });
            };

            //getLoginStatus();
            $rootScope.user = UserService.getUser();

            //This method is executed when the user press the "Login with facebook" button
            $rootScope.facebookSignIn = function() {
                $rootScope.c.debug('clicked facebookSignIn');
                getLoginStatus(true);
            };

            //This method is executed when the user press the "Logout" button
            $rootScope.showLogOutMenu = function() {
                var hideSheet = $ionicActionSheet.show({
                    destructiveText: 'Sair',
                    titleText: 'Realmente deseja sair?',
                    cancelText: 'Cancelar',
                    cancel: function() {},
                    buttonClicked: function(index) {
                        return true;
                    },
                    destructiveButtonClicked: function(){
                        $rootScope.c.debug('destructiveButtonClicked');
                        $ionicLoading.show({
                            template: 'Logging out...'
                        });

                        UserService.setUser();
                        $rootScope.user = undefined;
                        CartService.loadInitialData();

                        // Facebook logout
                        facebookConnectPlugin.logout(function(response){
                                $rootScope.c.debug('facebookConnectPlugin logout', response);
                                Layout.goHome();
                                $ionicLoading.hide();
                                hideSheet();
                                ////$state.go('welcome');
                            },
                            function(fail){
                                $rootScope.c.debug('facebookConnectPlugin logout failed', fail);
                                $ionicLoading.hide();
                                hideSheet();
                            });
                    }
                });
            };
        }

        function _init() {
            // Load the SDK asynchronously
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.6&appId="+AppConfig.facebookID;
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            $rootScope.user = UserService.getUser();

            // This is called with the results from from FB.getLoginStatus().
            var statusChangeCallback = function(response) {
                $rootScope.c.debug('statusChangeCallback');
                $rootScope.c.debug(response);
                // The response object is returned with a status field that lets the
                // app know the current login status of the person.
                // Full docs on the response object can be found in the documentation
                // for FB.getLoginStatus().
                if (response.status === 'connected') {
                    // Logged into your app and Facebook.
                    //testAPI();
                    $ionicLoading.show({
                        template: 'Logging in...'
                    });
                    var authResponse = response.authResponse;
                    $rootScope.c.debug('Welcome!  Fetching your information.... ');
                    FB.api('/me?fields=birthday,email,name,age_range&access_token=' + authResponse.accessToken, function(apiResponse) {
                        setUserFields(apiResponse, authResponse);
                        Layout.goHome();
                        $ionicLoading.hide();
                        //console.log('Successful login for: ' + response.name);
                        //document.getElementById('status').innerHTML =
                        //    'Thanks for logging in, ' + response.name + '!';
                    });
                } else if (response.status === 'not_authorized') {
                    // The person is logged into Facebook, but not your app.
                    $rootScope.c.debug('not_authorized');
                    //document.getElementById('status').innerHTML = 'Please log ' +
                    //    'into this app.';
                } else {
                    // The person is not logged into Facebook, so we're not sure if
                    // they are logged into this app or not.
                    $rootScope.c.debug('status else',response.status);
                    UserService.setUser();
                    $rootScope.user = undefined;
                    CartService.loadInitialData();
                    Layout.goHome();
                    $ionicLoading.hide();

                    //document.getElementById('status').innerHTML = 'Please log ' +
                    //    'into Facebook.';
                }
            };

            $window.fbAsyncInit = function(){
                // Executed when the SDK is loaded
                FB.init({
                    /*
                     The app id of the web app;
                     To register a new app visit Facebook App Dashboard
                     ( https://developers.facebook.com/apps/ )
                     */
                    appId: AppConfig.facebookID,

                    /*
                     Adding a Channel File improves the performance
                     of the javascript SDK, by addressing issues
                     with cross-domain communication in certain browsers.
                     */
                    //channelUrl: 'app/channel.html',

                    /*
                     Set if you want to check the authentication status
                     at the start up of the app
                     */
                    status: true,

                    /*
                     Enable cookies to allow the server to access
                     the session
                     */
                    cookie: true,

                    /* Parse XFBML */
                    xfbml: true,

                    version    : 'v2.6' // use version 2.2
                });

                FB.Event.subscribe('auth.authResponseChange', function(response) {
                    statusChangeCallback(response);
                });
            };
        }

        return returnObj;
    }

    module.exports = angularModule;
})();
},{}],10:[function(require,module,exports){
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
            getUserToCartData: _getUserToCartData,
            getUser: _getUser,
            updateUser: _updateUser,
            loadFromProviderId: _loadFromProviderId,
            setUser: _setUser
        };

        $localStorage = $localStorage.$default({
            //things: []
            starter_facebook_user: null
        });

        function srtDateToObj(str){
            var pattern = /(\d{2})(\/)(\d{2})(\/)(\d{4})/i;
            var d = str.match(pattern);
            if (d===null) return new Date();
            else return new Date(d[5],d[3],d[1]);
        }

        function _getUserToCartData() {
            if ($rootScope.user==undefined){
                $rootScope.user = _getUser();
            }
            if ($rootScope.user!=undefined){
                if ($rootScope.user.mandante!=undefined){
                    $rootScope.cartData.mandante = $rootScope.user.mandante;
                }
                if ($rootScope.user.partner_id!=undefined){
                    $rootScope.cartData.partner_id = $rootScope.user.partner_id;
                }
                if ($rootScope.user.partner_nome!=undefined){
                    //$rootScope.cartData.nome = $rootScope.user.partner_nome;
                } else $rootScope.cartData.nome = $rootScope.user.name;

                if ($rootScope.user.partner_data_nascimento!=undefined){
                    //$rootScope.cartData.data_nascimento = srtDateToObj($rootScope.user.partner_data_nascimento);
                } else if ($rootScope.user.birthday!=undefined && $rootScope.user.birthday.length==10) {
                    $rootScope.cartData.data_nascimento = srtDateToObj($rootScope.user.birthday);
                }

                if ($rootScope.user.partner_emails!=undefined){
                    //$rootScope.cartData.email = $rootScope.user.partner_emails[0];
                } else $rootScope.cartData.email = $rootScope.user.email;

                if ($rootScope.user.partner_telefones!=undefined){
                    //$rootScope.cartData.telefone = $rootScope.user.partner_telefones[0];
                }

                if ($rootScope.user.partner_whatsapps!=undefined){
                    //$rootScope.cartData.whatsapp = $rootScope.user.partner_whatsapps[0];
                }

                if ($rootScope.user.partner_addresses!=undefined){
                    $rootScope.cartData.addresses = $rootScope.user.partner_addresses;
                    $rootScope.cartData.address_id = $rootScope.user.partner_addresses[0].id;
                    //$rootScope.cartData.cep = $rootScope.user.partner_addresses[0].cep;
                    //$rootScope.cartData.endereco = $rootScope.user.partner_addresses[0].logradouro;
                    //$rootScope.cartData.bairro = $rootScope.user.partner_addresses[0].bairro;
                    //$rootScope.cartData.numero = $rootScope.user.partner_addresses[0].numero;
                    //$rootScope.cartData.complemento = $rootScope.user.partner_addresses[0].complemento;
                }
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
                        response_fields.partner_id = response.data.partner_id;
                        response_fields.partner_nome = response.data.partner_nome;
                        response_fields.partner_data_nascimento = response.data.partner_data_nascimento;
                        if (response.data.partner_emails!=undefined) response_fields.partner_emails = response.data.partner_emails;
                        if (response.data.partner_telefones!=undefined) response_fields.partner_telefones = response.data.partner_telefones;
                        if (response.data.partner_whatsapps!=undefined) response_fields.partner_whatsapps = response.data.partner_whatsapps;
                        if (response.data.partner_addresses!=undefined) response_fields.partner_addresses = response.data.partner_addresses;
                        _updateUser(response_fields);
                        $rootScope.user = _getUser();
                        _getUserToCartData();
                    }
                    else $rootScope.c.debug(response.data.message);
                });
        }

        return returnObj;
    }

    module.exports = angularModule;
})();
},{}],11:[function(require,module,exports){
angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("account/templates/tab-account.html","<ion-view view-title=\"Account\">\n  <ion-content>\n    <ion-list>\n    <ion-toggle  ng-model=\"settings.enableFriends\">\n        Enable Friends\n    </ion-toggle>\n    </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("cart/templates/cart.html","<ion-modal-view>\n    <ion-header-bar>\n        <h1 class=\"title\">Carrinho de Compras</h1>\n\n        <div class=\"buttons\" ng-if=\"minMediumScreens\">\n            <button class=\"button button-light\" ng-click=\"CartService.closeCart()\">Fechar</button>\n        </div>\n    </ion-header-bar>\n    <ion-content>\n        <div class=\"text-center\" ng-hide=\"CartService.existeItens()\">\n            <button class=\"button button-large button-full button-dark\" ng-click=\"CartService.closeCart()\">\n                Nenhum item selecionado\n            </button>\n        </div>\n\n        <div class=\"list list-inset\" ng-show=\"CartService.existeItens()\">\n            <div class=\"item item-divider\">Itens</div>\n            <div class=\"item item-button-right\" ng-repeat=\"item in cartItems\">\n                <p>{{ item.nome }}</p>\n                <span class=\"quantity\">{{ item.quantidade }} <small>x</small> </span><span class=\"price\">{{ item.valor | currency }}</span>\n                <button class=\"button button-light\" ng-click=\"removeItem(item.id)\">\n                    <i class=\"icon ion-close-circled\"></i>\n                </button>\n            </div>\n        </div>\n\n        <form class=\"cancelEnter\" ng-submit=\"CartService.doDelivery()\" ng-show=\"CartService.existeItens()\">\n            <div class=\"list\">\n                <div class=\"item item-divider\">Forma de Pagamento</div>\n\n                <div class=\"item text-center\">\n                    Valor Total: <span class=\"price\">{{ valorTotal | currency }}</span>\n                    <ion-list class=\"text-left\">\n                        <ion-radio name=\"pagamento\" ng-model=\"cartData.pagamento\" ng-value=\"\'dinheiro\'\">Dinheiro</ion-radio>\n                        <ion-radio name=\"pagamento\" ng-model=\"cartData.pagamento\" ng-value=\"\'debito\'\">\n                            <div class=\"pull-left\">Cartão Debito</div>\n                            <div class=\"pull-right\">\n                                <i class=\"fa fa-cc-visa fa-2x\"></i>\n                                <i class=\"fa fa-cc-mastercard fa-2x\"></i>\n                                <i class=\"fa fa-cc-diners-club fa-2x\"></i>\n                            </div>\n\n                        </ion-radio>\n                        <ion-radio name=\"pagamento\" ng-model=\"cartData.pagamento\" ng-value=\"\'credito\'\">\n                            <div class=\"pull-left\">Cartão Crédito</div>\n                            <div class=\"pull-right\">\n                                <i class=\"fa fa-cc-visa fa-2x\"></i>\n                                <i class=\"fa fa-cc-mastercard fa-2x\"></i>\n                                <i class=\"fa fa-cc-diners-club fa-2x\"></i>\n                            </div>\n                        </ion-radio>\n                    </ion-list>\n                </div>\n\n                <div class=\"item item-divider\">Dados da Entrega</div>\n\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Nome:</span>\n                    <label class=\"block\" ng-show=\"user.partner_nome.length>0\">{{user.partner_nome}}</label>\n                    <input type=\"text\" autocomplete=\"off\" name=\"nome\" ng-hide=\"user.partner_nome.length>0\" ng-model=\"cartData.nome\" placeholder=\"Ex.: João da Silva\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Nascimento: <small>(opcional)</small></span>\n                    <label class=\"block\" ng-show=\"user.partner_data_nascimento.length>0\">{{user.partner_data_nascimento}}</label>\n                    <input type=\"date\" autocomplete=\"off\" ng-hide=\"user.partner_data_nascimento.length>0\" name=\"data_nascimento\"\n                           ng-model=\"cartData.data_nascimento\"\n                           ng-value=\"cartData.data_nascimento\" placeholder=\"dd/mm/aaaa\">\n                </label>\n                <label class=\"item item-input item-stacked-label\" ng-class=\"{\'item-button-right\':(user.partner_emails.length>0)}\">\n                    <span class=\"input-label\">E-mail:</span>\n                    <!--<button type=\"button\" class=\"button button-light ion-edit\"-->\n                            <!--ng-show=\"user.partner_emails.length>0 && !cartData.emailChanged\" ng-click=\"cartData.emailChanged=true\"></button>-->\n                    <label class=\"block\" ng-show=\"user.partner_emails.length>0\">{{user.partner_emails[0]}}</label>\n                    <input type=\"email\" name=\"email\" ng-hide=\"user.partner_emails.length>0\" ng-model=\"cartData.email\" placeholder=\"Ex.: exemplo@gmail.com\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Telefone:</span>\n                    <label class=\"block\" ng-show=\"user.partner_telefones.length>0\">{{user.partner_telefones[0]}}</label>\n                    <input type=\"tel\" name=\"telefone\" ng-hide=\"user.partner_telefones.length>0\"\n                           ng-model=\"cartData.telefone\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Whatsapp:</span>\n                    <label class=\"block\" ng-show=\"user.partner_whatsapps.length>0\">{{user.partner_whatsapps[0]}}</label>\n                    <input type=\"tel\" name=\"whatsapp\" ng-hide=\"user.partner_whatsapps.length>0\"\n                           ng-model=\"cartData.whatsapp\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\" ng-show=\"cartData.addresses.length>0\">\n                    <div class=\"margin-left-off list list-inset\">\n                        <div class=\"item item-divider\">Endereços utilizados:</div>\n                        <ion-list class=\"text-left\">\n                            <ion-radio name=\"address\" ng-model=\"cartData.address_id\" ng-value=\"address.id\" class=\"address-item\"\n                                       ng-repeat=\"address in cartData.addresses\">\n                                {{address.logradouro}} {{address.numero}} {{address.complemento}} - CEP: {{address.cep}} - Bairro: {{address.bairro}}\n                            </ion-radio>\n                            <ion-radio name=\"address\" ng-model=\"cartData.address_id\" ng-value=\"false\">Criar Novo Endereço</ion-radio>\n                        </ion-list>\n                    </div>\n                </label>\n                <label class=\"item item-input item-stacked-label\" ng-show=\"cartData.address_id===false\">\n                    <span class=\"input-label\">CEP:</span>\n                    <input type=\"tel\"\n                           class=\"numbersOnly cancelEnter cepKeyUp\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.cep\" placeholder=\"Ex.: 28893818\"\n                           maxlength=\"8\">\n                </label>\n                <label class=\"item item-input item-stacked-label item-button-right\" ng-show=\"cartData.address_id===false\">\n                    <span class=\"input-label\">Endereço:</span>\n                    <input type=\"text\"\n                           class=\"cancelEnter enderecoKeyUp\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.endereco\" placeholder=\"Ex.: Av. Brasil\">\n                    <div class=\"list list-inset\" ng-show=\"cartData.matches.length>0\">\n                        <div class=\"item item-divider\">Endereços encontrados:</div>\n                        <label class=\"item address-item\" ng-repeat=\"address in cartData.matches\">\n                            <button class=\"button button-small button-light\" type=\"button\"\n                                    ng-click=\"CartService.selecionaEndereco(address)\">\n                                {{address.logradouro}} {{address.complemento}} - CEP: {{address.cep}} - Bairro: {{address.bairro}}\n                            </button>\n                        </label>\n                    </div>\n                </label>\n                <label class=\"item item-input item-stacked-label\" ng-show=\"cartData.address_id===false\">\n                    <span class=\"input-label\">Bairro:</span>\n                    <input type=\"text\" autocomplete=\"off\" name=\"bairro\" ng-model=\"cartData.bairro\" placeholder=\"Ex.: Centro\">\n                </label>\n                <label class=\"item item-input item-stacked-label\" ng-show=\"cartData.address_id===false\">\n                    <span class=\"input-label\">Número:</span>\n                    <input type=\"text\" autocomplete=\"off\" name=\"numero\" ng-model=\"cartData.numero\" placeholder=\"Ex.: 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\" ng-show=\"cartData.address_id===false\">\n                    <span class=\"input-label\">Complemento: <small>(opcional)</small></span>\n                    <input type=\"text\" autocomplete=\"off\" name=\"complemento\" ng-model=\"cartData.complemento\" placeholder=\"Ex.: apartamento 109\">\n                </label>\n\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Observação: <small>(opcional)</small></span>\n                    <input type=\"text\" autocomplete=\"off\" name=\"observacao\" ng-model=\"cartData.observacao\" placeholder=\"Ex.: enviar mensagem ao chegar\">\n                </label>\n\n                <label class=\"item\">\n                    <button class=\"button button-block button-positive\" type=\"submit\" ng-disabled=\"disableButton\">Solicitar Entrega</button>\n                </label>\n            </div>\n        </form>\n    </ion-content>\n</ion-modal-view>\n");
$templateCache.put("chat/templates/chat-detail.html","<!--\n  This template loads for the \'tab.friend-detail\' state (app.js)\n  \'friend\' is a $scope variable created in the FriendsCtrl controller (controllers.js)\n  The FriendsCtrl pulls data from the Friends service (service.js)\n  The Friends service returns an array of friend data\n-->\n<ion-view view-title=\"{{chat.name}}\">\n  <ion-content class=\"padding\">\n    <img ng-src=\"{{chat.face}}\" style=\"width: 64px; height: 64px\">\n    <p>\n      {{chat.lastText}}\n    </p>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("chat/templates/tab-chats.html","<ion-view view-title=\"Chats\">\n  <ion-content>\n    <ion-list>\n      <ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"chat in chats\" type=\"item-text-wrap\" href=\"#/tab/chats/{{chat.id}}\">\n        <img ng-src=\"{{chat.face}}\">\n        <h2>{{chat.name}}</h2>\n        <p>{{chat.lastText}}</p>\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\n\n        <ion-option-button class=\"button-assertive\" ng-click=\"remove(chat)\">\n          Delete\n        </ion-option-button>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("common/templates/menu.html","<ion-side-menus enable-menu-with-back-views=\"false\">\n    <ion-side-menu-content>\n        <ion-nav-bar class=\"bar-stable\">\n            <ion-nav-back-button></ion-nav-back-button>\n            <ion-nav-buttons side=\"left\">\n                <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"left\"\n                        ng-hide=\"$exposeAside.active\"></button>\n                <div class=\"delivery-bar-title title\">delivery24horas.com</div>\n            </ion-nav-buttons>\n            <ion-nav-buttons side=\"right\">\n                <button ng-if=\"cordova\" class=\"delivery-btn-social-header button button-positive btn-social\">\n                    <i class=\"ion-social-facebook\"></i>Entrar com Facebook\n                </button>\n\n                <!--<button class=\"button marging\" ng-class=\"{\'button-clear\': (valorTotal=0), \'button-balanced\': (valorTotal>0)}\">-->\n                <button class=\"button marging\"\n                        ng-click=\"CartService.showCart()\"\n                        ng-class=\"(valorTotal>0)?\'button-balanced\': \'button-clear\'\">\n                <!--<button class=\"button button-clear\">-->\n                    <i class=\"ion-android-cart\"></i> ({{ valorTotal | currency }})\n                </button>\n\n            </ion-nav-buttons>\n        </ion-nav-bar>\n        <ion-nav-view name=\"menuContent\"></ion-nav-view>\n    </ion-side-menu-content>\n\n    <ion-side-menu expose-aside-when=\"large\">\n        <ion-header-bar class=\"bar-stable\">\n            <h1 class=\"title\">Menu</h1>\n        </ion-header-bar>\n        <ion-content>\n            <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n            <div class=\"list list-inset\">\n                <div class=\"item item-divider\">Categorias</div>\n\n                <a href=\"#/app/productlist\" class=\"item item-icon-left\"\n                   menu-close ng-click=\"loadCategoria(\'Todas\');loadProducts()\">\n                    <i class=\"icon ion-beer\"></i>\n                    Todas\n                </a>\n                <a ng-repeat=\"item in categorias\" href=\"#/app/productlist\" class=\"item item-icon-left\"\n                   menu-close ng-click=\"loadCategoria(item.nome);loadProducts(item.id)\">\n                    <i class=\"{{ item.icon }}\"></i>\n                    {{ item.nome }}\n                </a>\n\n                <div class=\"item item-divider\">Relatórios</div>\n                <a href=\"#/app/report\" class=\"item item-icon-left\" menu-close>\n                    <i class=\"ion-document-text\"></i>\n                    Relatórios\n                </a>\n                <a href=\"#/app/browse\" class=\"item item-icon-left\" menu-close>\n                    <i class=\"ion-document-text\"></i>\n                    Browse\n                </a>\n\n                <div class=\"item item-divider\">Minha conta</div>\n                <div class=\"item\">Meus Dados</div>\n                <div class=\"item\">Trocar Senha</div>\n                <div class=\"item\">Sair</div>\n\n            </div>\n        </ion-content>\n    </ion-side-menu>\n</ion-side-menus>");
$templateCache.put("common/templates/tabs.html","<!--\nCreate tabs with an icon and label, using the tabs-positive style.\nEach tab\'s child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.\n-->\n<ion-tabs class=\"tabs-icon-top tabs-color-active-positive\">\n    <!-- Home Tab -->\n    <ion-tab title=\"Produtos\" icon-off=\"ion-ios-home-outline\" icon-on=\"ion-ios-home\" href=\"#/tab/home\">\n        <ion-nav-view name=\"tab-home\"></ion-nav-view>\n    </ion-tab>\n\n     <!--Dashboard Tab-->\n    <ion-tab title=\"Carrinho {{ valorTotal | currency }}\" icon-off=\"ion-ios-cart-outline\" icon-on=\"ion-ios-cart\" href=\"#/tab/cart\">\n        <ion-nav-view name=\"tab-cart\"></ion-nav-view>\n    </ion-tab>\n\n    <!-- Chats Tab -->\n    <ion-tab title=\"Ajuda\" icon-off=\"ion-ios-chatboxes-outline\" icon-on=\"ion-ios-chatboxes\" href=\"#/tab/chats\">\n        <ion-nav-view name=\"tab-chats\"></ion-nav-view>\n    </ion-tab>\n\n    <!-- Account Tab -->\n    <ion-tab title=\"Minha Conta\" icon-off=\"ion-ios-gear-outline\" icon-on=\"ion-ios-gear\" href=\"#/tab/account\">\n        <ion-nav-view name=\"tab-account\"></ion-nav-view>\n    </ion-tab>\n</ion-tabs>");
$templateCache.put("productlist/templates/productlist.html","<ion-view view-title=\"\">\n    <div class=\"bar item-input-inset\" ng-class=\"{\'bar-subheader\': minMediumScreens}\">\n        <label class=\"item-input-wrapper\">\n            <i class=\"icon ion-ios-search placeholder-icon\"></i>\n            <input type=\"search\" placeholder=\"Busca de produtos\" ng-model=\"query\">\n        </label>\n        <button ng-if=\"query.length\"\n                class=\"input-button button button-icon ion-close-circled\"\n                ng-click=\"clearSearch()\">\n        </button>\n        <!--<button class=\"button button-clear\" ng-click=\"query = \'\'\">-->\n            <!--Cancelar-->\n        <!--</button>-->\n    </div>\n    <ion-content ng-class=\"{\'has-subheader\': minMediumScreens, \'has-header\': handhelds}\">\n        <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n\n        <div class=\"list delivery-list delivery-list-with-menu\">\n            <div ng-if=\"cordova\" class=\"item item-button-right delivery-btn-social\">\n                <button ng-show=\"user==undefined\" class=\"button btn-social\" ng-click=\"facebookSignIn()\">\n                    <i class=\"ion-social-facebook\"></i>Entrar com Facebook\n                </button>\n                <button ng-show=\"user!=undefined\" class=\"button btn-social\" ng-click=\"showLogOutMenu()\">\n                    <i class=\"ion-social-facebook\"></i>Sair {{ user.name }} <img class=\"img-thumbnail-facebook\" ng-src=\"{{ user.picture }}\">\n                </button>\n            </div>\n            <div class=\"item\" ng-if=\"!cordova\">\n                <div id=\"fb-root\"></div>\n                <!--<fb:login-button scope=\"public_profile,email\" onlogin=\"console.log(angular);\">-->\n                <!--</fb:login-button>-->\n                <div class=\"fb-login-button\" data-max-rows=\"1\" data-size=\"medium\"\n                     data-scope=\"public_profile,email,user_birthday\" data-show-faces=\"true\" data-auto-logout-link=\"true\"></div>\n                <!--<div id=\"status\"></div>-->\n            </div>\n            <div class=\"item\">\n                <div class=\"delivery-logo-block\">\n                    <img ng-src=\"{{logoUrl+\'logo-delivery2-resized-compressed.png\'}}\">\n                    <!--<p ng-hide=\"$exposeAside.active\"><span class=\"ion-arrow-left-a\"></span> Acesse o Menu ao lado</p>-->\n                </div>\n            </div>\n\n        </div>\n\n        <div class=\"delivery-list-with-menu\">\n\n            <div ng-class=\"{card: minMediumScreens, list: handhelds, \'list-inset\': handhelds}\" class=\"padding-right\">\n                <div class=\"item item-divider\">{{ rootCategoriaSelecionada }}</div>\n                <div class=\"item resultCount\" ng-if=\"query.length\"><span>{{ filtered.length }} de {{ products.length }}</span></div>\n                <div class=\"delivery-product-item\" ng-class=\"{item: handhelds, \'item-thumbnail-left\': handhelds}\"\n                     ng-repeat=\"produto in filtered = (products | filter: query)\">\n                     <!--ng-repeat=\"produto in products | filter: query as filtered\">-->\n\n                    <img ng-src=\"{{ prepareImage(produto.imagem) }}\"\n                         alt=\"Imagem do produto {{ produto.nome }}\"\n                         title=\"Imagem do produto {{ produto.nome }}\">\n                    <div>\n                        <span class=\"price\">{{ produto.valor | currency }}<small ng-show=\"quantidade[produto.id]>0\"> x <span class=\"quantity\">{{ quantidade[produto.id] }}</span></small></span>\n                        <p>{{ produto.nome }}</p>\n                    </div>\n\n                    <div class=\"range\">\n                        <button ng-click=\"decrementa(produto.id)\" class=\"button button-light\"><i class=\"icon ion-chevron-left\"></i></button>\n                        <input type=\"range\" ng-change=\"somaTotal()\" id=\"quantidade[{{ produto.id }}]\"\n                               name=\"quantidade[{{ produto.id }}]\" ng-model=\"quantidade[produto.id]\"\n                               min=\"0\" max=\"{{ produto.max }}\">\n                        <button ng-click=\"incrementa(produto.id)\" class=\"button button-light\"><i class=\"icon ion-chevron-right\"></i></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"delivery-menu-left\">\n            <button ng-click=\"loadProducts();loadCategoria(\'Todas\');\"\n                    class=\"delivery-button button button-stable\">\n                <i class=\"icon fa fa-globe\"></i>\n                <p>Todas</p>\n            </button>\n            <button ng-click=\"loadProducts();loadCategoria(\'Favoritos\');\"\n                    class=\"delivery-button button button-stable\">\n                <i class=\"icon fa fa-star\"></i>\n                <p>Favoritos</p>\n            </button>\n            <button ng-click=\"loadProducts(item.id);loadCategoria(item.nome);\"\n                    ng-repeat=\"item in categorias\"\n                    class=\"delivery-button button button-stable\">\n                <i class=\"{{ item.icon }}\"></i>\n                <p>{{ item.nome }}</p>\n            </button>\n        </div>\n    </ion-content>\n\n</ion-view>");
$templateCache.put("report/templates/report.html","<ion-view view-title=\"Relatórios\">\n    <ion-content class=\"padding\">\n        <h1>{{ titulo }}</h1>\n        <p>\n            <a class=\"button icon icon-right ion-chevron-right\" href=\"#/app/report\">titulo</a>\n        </p>\n    </ion-content>\n</ion-view>");
$templateCache.put("browse.html","<ion-view view-title=\"Browse\">\n  <ion-content>\n    <h1>Browse</h1>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("loading.html","<div class=\"loading-container visible active\">\n    <div class=\"loading\">\n        <p>Carregando...</p><ion-spinner></ion-spinner>\n    </div>\n</div>");
$templateCache.put("login.html","<ion-modal-view>\n  <ion-header-bar>\n    <h1 class=\"title\">Login</h1>\n    <div class=\"buttons\">\n      <button class=\"button button-clear\" ng-click=\"closeLogin()\">Close</button>\n    </div>\n  </ion-header-bar>\n  <ion-content>\n    <form ng-submit=\"doLogin()\">\n      <div class=\"list\">\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Username</span>\n          <input type=\"text\" ng-model=\"loginData.username\">\n        </label>\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Password</span>\n          <input type=\"password\" ng-model=\"loginData.password\">\n        </label>\n        <label class=\"item\">\n          <button class=\"button button-block button-positive\" type=\"submit\">Log in</button>\n        </label>\n      </div>\n    </form>\n  </ion-content>\n</ion-modal-view>\n");
$templateCache.put("search.html","<ion-view view-title=\"Search\">\n  <ion-content>\n    <h1>Search</h1>\n  </ion-content>\n</ion-view>\n");}]);
},{}],12:[function(require,module,exports){
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
            customAlert: _customAlert
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
},{}],13:[function(require,module,exports){
(function () {
    'use strict';

    /* ***************************************************************************
     * ### Common API module ###
     *
     * This is a project common api service. It's used for sending all api requests in the application.
     * It handles success and error response by default, if it's not set custom callback function explicitly.
     */

    /*! */

    var apiModule = angular.module('App.Api');

    apiModule.factory('Api', [
        '$q',
        '$http',
        '$ionicLoading',
        'Helpers',
        'Layout',
        apiService
    ]);

    function apiService($q, $http, $ionicLoading, Helpers, Layout) {
        //Layout.check();
        var scope;
        scope = {
            sendRequest: _sendRequest
        };

        /*
         * ### *Public methods* ###
         */

        /*
         * Sends API request to the server and handles default success and error response.
         * Common function for every API request in the application.
         *
         * This implementation really depends of how you construct your backend logic but in general
         * you should have one place for API requests. Also, there's a 'Helpers' module with 'handleHttpResponse'
         * method, used to handle an API reaponse in case you don't specify a 'customCallback' function (inside the
         * params object). This way you can reduce a code repetition if you need to handle an API call on the same way
         * in multiple places.
         *
         * @param   {object} params
         * @return  {object}
         */
        function _sendRequest(params) {

            params.headers = {
                'Accept': 'application/json'
            };

            //'Cache-Control': 'no-cache',
            //'X-Requested-With': 'XMLHttpRequest',
            //'Host': 'api.localhost.com',
            //'Access-Control-Allow-Origin': '*',
            //'Content-Type': 'application/json',
            //'Accept-Encoding': 'gzip, deflate, sdch',
            //'Accept-Language': 'pt-BR,en-US;q=0.8,en;q=0.6',

            //$rootScope.c.debug(params);
            Helpers.handleHttpParams(params);
            return $http(params)
                .then(
                    function (response) {
                        //if (response) {
                            var responseData = (response.data && typeof response.data.Data !== 'undefined') ? response.data.Data : response.data;
                            return params.customCallback ? responseData : Helpers.handleHttpResponse(response);
                        //}
                    },
                    function(response) {
                        $ionicLoading.hide();
                        return Helpers.handleHttpErrorResponse(response);
                    });
        }
        return scope;
    }

    module.exports = apiModule;
})();
},{}],14:[function(require,module,exports){
(function () {
    'use strict';

    /* ***************************************************************************
     * ### Common API module ###
     *
     * This is a project common api service. It's used for sending all api requests in the application.
     * It handles success and error response by default, if it's not set custom callback function explicitly.
     */

    /*! */

    var moduleApp = angular.module('App.Directives');

    moduleApp.directive('numbersOnly', [
        'Alerts',
        numbersOnly
    ]);

    function numbersOnly(Alerts) {
        return {
            // atribuímos em forma de classe css nesse caso
            restrict: 'C',
            link: function (scope, element, attrs) {
                // atribuímos o plugin jQuery ao parâmetro `element`
                // nesse caso, o element do DOM que foi bindado a diretiva
                element.on('keypress', function (e) {
                    if (e.which != 13 && e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)){
                        Alerts.numbersOnly();
                        e.preventDefault();
                        return false;
                    }
                });
            }
        }
    }

    moduleApp.directive('cancelEnter', [
        '$rootScope',
        cancelEnter
    ]);

    function cancelEnter($rootScope) {
        return {
            // atribuímos em forma de classe css nesse caso
            restrict: 'C',
            link: function (scope, element, attrs) {
                // atribuímos o plugin jQuery ao parâmetro `element`
                // nesse caso, o element do DOM que foi bindado a diretiva
                element.on('keypress', function (e) {
                    if (e.which == 13){
                        $rootScope.c.debug('Cancelando ação do enter');
                        e.preventDefault();
                        return false;
                    }
                });
            }
        }
    }

    moduleApp.directive('cepKeyUp', [
        '$rootScope',
        'Api',
        'AppConfig',
        'Alerts',
        cepKeyUp
    ]);

    function cepKeyUp($rootScope, Api, AppConfig, Alerts) {
        return {
            // atribuímos em forma de classe css nesse caso
            restrict: 'C',
            link: function (scope, element, attrs) {
                // atribuímos o plugin jQuery ao parâmetro `element`
                // nesse caso, o element do DOM que foi bindado a diretiva
                element.on('keyup', function (e) {
                    if (e.which != 13 && element.val().length == 8) {
                        Api.sendRequest({
                                method: "GET",
                                url: AppConfig.servicoCep($rootScope.cartData.cep)
                            })
                            .then(function(response){
                                if (response.data.erro){
                                    $rootScope.cartData.endereco = '';
                                    $rootScope.cartData.bairro = '';
                                    Alerts.customAlert('CEP inválido', 'CEP '+$rootScope.cartData.cep+' não foi encontrado');
                                } else {
                                    if ($rootScope.cartData.cep<28890000 || $rootScope.cartData.cep>28899999)
                                        Alerts.customAlert('Alerta', 'Não atendemos esta área de CEP '+$rootScope.cartData.cep+'. Somente Rio das Ostras/RJ.');
                                    $rootScope.cartData.endereco = response.data.logradouro;
                                    $rootScope.cartData.bairro = response.data.bairro;
                                }
                            });
                    }
                });
            }
        }
    }

    moduleApp.directive('enderecoKeyUp', [
        '$rootScope',
        'AddressDataService',
        enderecoKeyUp
    ]);

    function enderecoKeyUp($rootScope, AddressDataService) {
        return {
            // atribuímos em forma de classe css nesse caso
            restrict: 'C',
            link: function (scope, element, attrs) {
                // atribuímos o plugin jQuery ao parâmetro `element`
                // nesse caso, o element do DOM que foi bindado a diretiva
                element.on('keyup', function (e) {
                    if (e.which != 13 && element.val().length >2) {
                        AddressDataService.searchAddress(element.val());
                    } else $rootScope.cartData.matches = [];
                });
            }
        }
    }

    moduleApp.directive('setClassWhenAtTop', [
        '$ionicScrollDelegate',
        setClassWhenAtTop
    ]);

    function setClassWhenAtTop($ionicScrollDelegate) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var topClass = attrs.setClassWhenAtTop; // get CSS class from directive's attribute value
                var offsetTop = 60; // get element's offset top relative to document
                //var offsetTop = element.offset().top; // get element's offset top relative to document
                //var offsetTop = $ionicScrollDelegate.getScrollPosition().top; // get element's offset top relative to document

                element.on('scroll', function (e) {
                    //console.log('element Scrolled!');
                    //console.log($ionicScrollDelegate.getScrollPosition().top);
                    if ($ionicScrollDelegate.getScrollPosition().top > offsetTop) {
                        element.addClass(topClass);
                    } else {
                        element.removeClass(topClass);
                    }
                });
            }
        };
    }

    moduleApp.directive('affixWithinContainer', [
        affixWithinContainer
    ]);
    function affixWithinContainer() {

        var transition = function(element, dy, executeImmediately) {
            element.style[ionic.CSS.TRANSFORM] == 'translate3d(0, -' + dy + 'px, 0)' ||
            executeImmediately ?
                element.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + dy + 'px, 0)' :
                ionic.requestAnimationFrame(function() {
                    element.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + dy + 'px, 0)';
                });
        };

        return {
            restrict: 'A',
            link: function($scope, $element, $attr) {
                var $affixContainer = $element.parent();
                var $elementClone = angular.element(document.getElementsByClassName($attr.affixWithinContainer));
                var $scrollContainer = angular.element(document.getElementsByClassName('scrollContainer'));

                var top = 0;
                var offsetTop = 0;
                var height = 0;
                var scrollMin = 0;
                var scrollMax = 0;
                var scrollTransition = 0;
                var affixedHeight = 0;
                var updateScrollLimits = function(newTop) {
                    top = $affixContainer[0].offsetTop;
                    height = $affixContainer[0].offsetHeight;
                    affixedHeight = $element[0].offsetHeight;
                    offsetTop = $element[0].offsetTop + newTop;
                    scrollMin = top;
                    scrollMax = scrollMin + height;
                    scrollTransition = scrollMax - affixedHeight;
                };

                var affix = null;
                var unaffix = null;
                var $affixedClone = null;
                var setupAffix = function() {
                    unaffix = null;
                    affix = function() {
                        var css = {
                            position: 'fixed',
                            top: offsetTop+5+'px'
                        };
                        $affixedClone = $elementClone.clone().css(css);
                        $scrollContainer.append($affixedClone);
                        setupUnaffix();
                    };
                };
                var cleanupAffix = function() {
                    $affixedClone && $affixedClone.remove();
                    $affixedClone = null;
                };
                var setupUnaffix = function() {
                    affix = null;
                    unaffix = function() {
                        cleanupAffix();
                        setupAffix();
                    };
                };
                $scope.$on('$destroy', cleanupAffix);
                setupAffix();

                var affixedJustNow;
                var scrollTop;
                $scrollContainer.on('scroll', function(event) {
                    offsetTop = (event.detail || event.originalEvent && event.originalEvent.detail).target.offsetTop;
                    scrollTop = (event.detail || event.originalEvent && event.originalEvent.detail).scrollTop;
                    updateScrollLimits(offsetTop);
                    if (scrollTop >= scrollMin && scrollTop <= scrollMax) {
                        affixedJustNow = affix ? affix() || true : false;
                        if (scrollTop > scrollTransition) {
                            transition($affixedClone[0], Math.floor(scrollTop-scrollTransition), affixedJustNow);
                        } else {
                            transition($affixedClone[0], 0, affixedJustNow);
                        }
                    } else {
                        unaffix && unaffix();
                    }
                });
            }
        }
    }

    module.exports = moduleApp;
})();
},{}],15:[function(require,module,exports){
(function () {
    'use strict';


    /* ***************************************************************************
     * ### Helper module ###
     *
     * Contains the utility and helper functions used through whole application.
     */

    /*! */

    var helperModule = angular.module('App.Helpers');

    helperModule.service('Helpers', [
        '$rootScope',
        'AppConfig',
        'globals',
        Helpers
    ]);

    /*!
     * Constructor function for all kinds of helper methods used through whole project.
     *
     * @return {object} this
     */
    function Helpers($rootScope, AppConfig, globals) {

        var scope;
        scope = {
            handleHttpResponse: _handleHttpResponse,
            handleHttpErrorResponse: _handleHttpErrorResponse,
            handleHttpParams: _handleHttpParams
        };

        /*
         * ### *Public methods* ###
         */

        /*
         * Handles all kinds of http responses if it's not required to be hendled inside the controller.
         * This implementation really depends of how you construct your backend logic but in general
         * you should have one place for handling API requests.
         *
         * @param   {object} response
         * @return  {object}
         */
        function _handleHttpResponse(response) {
            //$rootScope.c.debug('Response: ');
            $rootScope.c.debug('Response: '+JSON.stringify(response));
            //var message = '',
            //    type = '';
            //$rootScope.c.debug(response);
            //try {
            //    //message = (response.status && response.status !== 200) ? response.statusText : response.data.message;
            //    message = response.statusText;
            //    type = response.data.success ? 'success' : 'error';
            //    //$rootScope.c.log(message);
            //} catch (exception) {
            //    $rootScope.c.debug(exception);
            //    type = 'error';
            //    message = 'Server error';
            //}

            //if (message) {
            //    // Default logic for API responses
            //    //$rootScope.c.debug('Response: ' + message + 'Type: ' + type);
            //}
            //$rootScope.c.debug('Response: ' + response.statusText + ' Status: ' + response.status);
            return response;
        }
        function _handleHttpErrorResponse(response) {
            $rootScope.c.debug('Erro na requisição: ', JSON.stringify(response));
            $rootScope.c.debug('Status: ', response.status);
            $rootScope.c.debug('StatusText: ', response.statusText);
            $rootScope.c.debug('Url: ', response.config.url);
            $rootScope.c.debug('Headers: ', JSON.stringify(response.config.headers));
            response.data = {
                data: []
            };
            return response;
        }

        function _handleHttpParams(params) {
            $rootScope.c.debug('Parametros: ', JSON.stringify(params));
            //$rootScope.c.debug('Status: ', response.status);
            //$rootScope.c.debug('StatusText: ', response.statusText);
            //$rootScope.c.debug('Url: ', response.config.url);
            //$rootScope.c.debug('Headers: ', JSON.stringify(response.config.headers));
            //response.data = {
            //    data: []
            //};
            //return response;
        }

        return scope;
    }

    helperModule.service('AddressDataService', [
        'Api',
        'AppConfig',
        '$rootScope',
        searchAddress
    ]);

    function searchAddress(Api, AppConfig, $rootScope) {
        var searchAddress;
        searchAddress = {
            searchAddress: _handleResponse
        };

        function _handleResponse(searchFilter) {
            $rootScope.c.debug('Searching addresses for ' + searchFilter);
            return Api.sendRequest({
                    method: "GET",
                    url: AppConfig.servicoCep('RJ/Rio das Ostras/'+searchFilter)
                })
                .then(function(response){
                    //$rootScope.c.debug('Response: ' + response);
                    $rootScope.cartData.matches = response.data.filter(function (address) {
                        var removeAcentos = function(str){
                            str = str.toLowerCase();
                            var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç";
                            var to   = "aaaaaeeeeeiiiiooooouuuunc";
                            for (var i=0, l=from.length ; i<l ; i++) {
                                str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                            }
                            return str;
                        };
                        var searchIn = removeAcentos(address.logradouro);
                        var query = removeAcentos(searchFilter);
                        if (searchIn.indexOf(query) !== -1) return true;
                    });
                    return response;
                });
        };
        return searchAddress;
    }

    helperModule.service('ReportSystem', [
        'AppConfig',
        log
    ]);
    function log(AppConfig){
        //var response;
        if (AppConfig.debug) return console;
        else return {
            log: function () {},
            debug: function () {}
        };
    }
    module.exports = helperModule;
})();
},{}],16:[function(require,module,exports){
(function () {
    'use strict';

    // Orginal code from: http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
    // Copyrights: Ezekiel Victor

    // Modifies $httpProvider for correct server communication (POST variable format)

    var angularModule = angular.module('App.HttpPostFix');

    angularModule.config([
        '$httpProvider',
        HttpPostFix
    ]);

    function HttpPostFix($httpProvider) {
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data)
        {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function(obj)
            {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for(name in obj)
                {
                    value = obj[name];

                    if(value instanceof Array)
                    {
                        for(i=0; i<value.length; ++i)
                        {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if(value instanceof Object)
                    {
                        for(subName in value)
                        {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if(value !== undefined && value !== null)
                    {
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    }

    module.exports = angularModule;
})();
},{}],17:[function(require,module,exports){
(function () {
    'use strict';


    /* ***************************************************************************
     * ### Helper module ###
     *
     * Contains the utility and helper functions used through whole application.
     */

    /*! */

    var angularModule = angular.module('App.Services');

    angularModule.service('Categorias', [
        '$rootScope',
        'AppConfig',
        'Api',
        Categorias
    ]);

    /*!
     * Constructor function for all kinds of helper methods used through whole project.
     *
     * @return {object} this
     */
    function Categorias($rootScope, AppConfig, Api) {

        var returnObj;
        returnObj = {
            loadItems: _loadItems
        };

        /*
         * ### *Public methods* ###
         */

        /*
         * Handles all kinds of http responses if it's not required to be hendled inside the controller.
         * This implementation really depends of how you construct your backend logic but in general
         * you should have one place for handling API requests.
         *
         * @param   {object} response
         * @return  {object}
         */
        function _loadItems() {
            $rootScope.c.debug('Loading Categories...');
            Api.sendRequest({
                    method: "GET",
                    url: AppConfig.apiEndpoint + '/categorias/todas'
                })
                .then(function(response){
                    $rootScope.categorias = response.data.data;
                });
        }

        return returnObj;
    }

    angularModule.service('Produtos', [
        '$rootScope',
        'AppConfig',
        'Api',
        Produtos
    ]);

    /*!
     * Constructor function for all kinds of helper methods used through whole project.
     *
     * @return {object} this
     */
    function Produtos($rootScope, AppConfig, Api) {

        var returnObj;
        returnObj = {
            loadItems: _loadItems
        };

        /*
         * ### *Public methods* ###
         */

        /*
         * Handles all kinds of http responses if it's not required to be hendled inside the controller.
         * This implementation really depends of how you construct your backend logic but in general
         * you should have one place for handling API requests.
         *
         * @param   {object} response
         * @return  {object}
         */
        function _loadItems(idCategory) {
            if (idCategory===undefined) idCategory='todas';
            $rootScope.rootCategoriaAntiga = undefined;
            $rootScope.clearSearch();

            $rootScope.c.debug('Loading Produtos...');
            Api.sendRequest({
                    method: "GET",
                    url: AppConfig.apiEndpoint + '/produtosDelivery/'+idCategory
                })
                .then(function(response){
                    $rootScope.products = response.data.data;
                    if (idCategory=='todas')
                        $rootScope.allProducts = response.data.data;
                    else if ($rootScope.allProducts===undefined) {
                        Api.sendRequest({
                                method: "GET",
                                url: AppConfig.apiEndpoint + '/produtosDelivery/todas'
                            })
                            .then(function(response){
                                    $rootScope.allProducts = response.data.data;
                            });
                    }
                });
        }

        return returnObj;
    }

    angularModule.service('loadingMarker', [
        '$rootScope',
        loadingMarker
    ]);
    function loadingMarker($rootScope) {
        var service = this;

        service.request = function(config) {
            $rootScope.$broadcast('loading:show');
            return config;
        };

        service.response = function(response) {
            $rootScope.$broadcast('loading:hide');
            return response;
        };
    }

    angularModule.service('Chats', [
        Chats
    ]);
    function Chats() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        return {
            all: function() {
                return chats;
            },
            remove: function(chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function(chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    }

    angularModule.service('Layout', [
        '$rootScope',
        '$location',
        '$window',
        Layout
    ]);

    function Layout($rootScope, $location, $window) {
        var returnObj;
        returnObj = {
            goHome: _goHome,
            check: _check
        };

        function _goHome() {
            if ($rootScope.handhelds)
                $location.path($rootScope.handheldsUrl);
            if ($rootScope.minMediumScreens)
                $location.path($rootScope.minMediumScreensUrl);
        }

        function _check() {
            $rootScope.handheldsUrl = '/tab/home';
            $rootScope.minMediumScreensUrl = '/app/productlist';

            var switchLayout = function(value){
                $rootScope.c.debug('Checking: '+value);
                $rootScope.c.debug('Path: '+$location.path());
                if (value<=425) {
                    $rootScope.handhelds = true;
                    $rootScope.minMediumScreens = false;
                    if ($location.path()=="" || $location.path().indexOf("/app")!==-1) {
                        $rootScope.c.debug('Redirecting to: '+$rootScope.handheldsUrl);
                        $location.path($rootScope.handheldsUrl);
                    }
                } else {
                    $rootScope.handhelds = false;
                    $rootScope.minMediumScreens = true;
                    if ($location.path()=="" || $location.path().indexOf("/tab")!==-1) {
                        $rootScope.c.debug('Redirecting to: ' + $rootScope.minMediumScreensUrl);
                        $location.path($rootScope.minMediumScreensUrl);
                    }
                }
            };

            switchLayout($window.innerWidth);

            $rootScope.$watch(function(){
                return $window.innerWidth;
            }, function(value) {
                switchLayout(value);
            });
        }

        return returnObj;
    }

    module.exports = angularModule;
})();
},{}]},{},[1]);
