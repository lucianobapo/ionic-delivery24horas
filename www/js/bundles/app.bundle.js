(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('App.Config', []);
    angular.module('templates', []);
    angular.module('App.Helpers', []);
    angular.module('App.Api', []);
    angular.module('App.Directives', []);
    angular.module('App.Services', []);
    angular.module('App.Alerts', []);
    angular.module('App.CartService', []);

    angular.module('App.Common', []);
    //angular.module('App.Playlist', []);
    angular.module('App.ProductList', []);
    angular.module('App.Chat', []);
    angular.module('App.Report', []);

    require('./config-build');
    require('./templates-build');
    require('./utility/helpers');
    require('./utility/api');
    require('./utility/directives');
    require('./utility/services');
    require('./utility/alerts');
    require('./cart/cart-service');

    require('./common/common');
    require('./productlist/productlist');
    require('./chat/chat');
    require('./report/report');

    //require('./playlist/playlist');

    var appModule = angular.module('App', [

        // Ionic and angular modules
        'ionic',
        //'ion-affix',

        // Project modules
        'App.Config',
        'App.Helpers',
        'App.Common',
        'App.Api',
        'App.Directives',
        'App.Services',
        'App.Alerts',
        'App.CartService',
        //'App.Playlist',
        'App.ProductList',
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
                    templateUrl: 'tabs/tabs.html'
                })
                // Each tab has its own nav history stack:

                .state('tab.cart', {
                    url: '/cart',
                    views: {
                        'tab-cart': {
                            templateUrl: 'tabs/tab-cart.html'
                            //controller: 'DashCtrl'
                        }
                    }
                })

                .state('tab.chats', {
                    url: '/chats',
                    views: {
                        'tab-chats': {
                            templateUrl: 'chat/template/tab-chats.html',
                            controller: 'ChatsCtrl'
                        }
                    }
                })
                .state('tab.chat-detail', {
                    url: '/chats/:chatId',
                    views: {
                        'tab-chats': {
                            templateUrl: 'chat/template/chat-detail.html',
                            controller: 'ChatDetailCtrl'
                        }
                    }
                })

                .state('tab.account', {
                    url: '/account',
                    views: {
                        'tab-account': {
                            templateUrl: 'account/template/tab-account.html'//,
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
                //.state('tab.productlist2', {
                //    url: '/productlist2',
                //    views: {
                //        'menuContent': {
                //            templateUrl: 'productlist/templates/productlist2.html'
                //        }
                //    }
                //})

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
        '$window',
        'CartService',
        'Categorias',
        '$location',
        bodyController
    ]);
    function bodyController($scope, $rootScope, $ionicModal, $window, CartService, Categorias, $location) {
        CartService.initCart();
        Categorias.loadItems();

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

        $rootScope.$watch(function(){
            return $window.innerWidth;
        }, function(value) {
            if (value<=425) {
                $rootScope.handhelds = true;
                $rootScope.minMediumScreens = false;
                if ($location.path().indexOf("/app")!==-1) $location.path("/tab/home");
            } else {
                $rootScope.handhelds = false;
                $rootScope.minMediumScreens = true;
                if ($location.path().indexOf("/tab")!==-1) $location.path("/app/productlist");
            }
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

        //console.log(C);
        //$rootScope.c.log('teste');
        //$rootScope.c.debug('teste');

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
},{"./cart/cart-service":2,"./chat/chat":3,"./common/common":4,"./config-build":5,"./productlist/productlist":6,"./report/report":7,"./templates-build":8,"./utility/alerts":9,"./utility/api":10,"./utility/directives":11,"./utility/helpers":12,"./utility/services":13}],2:[function(require,module,exports){
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
            'Api',
            '$ionicLoading',
            productListCtrl
        ]);

    function productListCtrl($scope, $rootScope, AppConfig, Api) {
        $rootScope.c.debug('ProductList Controller: ', $scope.commonArray);

        $scope.logoUrl = AppConfig.logoUrl;
        $scope.imagesUrl = AppConfig.imagesUrl;

        $rootScope.cartItems = [];
        $rootScope.quantidade = [];
        $rootScope.valorTotal = 0;
        $scope.products = [];


        $rootScope.removeCartItem = function (id) {
            if ($rootScope.quantidade[id] > 0) {
                $rootScope.quantidade[id]=0;
                $scope.somaTotal();
            }
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
            if (idCategory===undefined) idCategory='todas';
            Api
                .sendRequest({
                    method: "GET",
                    url: AppConfig.apiEndpoint + '/produtosDelivery/'+idCategory
                })
                .then(function(response){
                    $scope.products = response.data.data;
                    if (idCategory=='todas')
                        $rootScope.allProducts = response.data.data;
                });
            if ($rootScope.allProducts===undefined && idCategory!='todas'){
                Api
                    .sendRequest({
                        method: "GET",
                        url: AppConfig.apiEndpoint + '/produtosDelivery/todas'
                    })
                    .then(function(response){
                        if (response.data!==null)
                            $rootScope.allProducts = response.data.data;
                    });
            }
        };

        $scope.doRefresh = function () {
            $rootScope.loadProducts();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };
        $rootScope.loadProducts();

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
angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("account/template/tab-account.html","<ion-view view-title=\"Account\">\n  <ion-content>\n    <ion-list>\n    <ion-toggle  ng-model=\"settings.enableFriends\">\n        Enable Friends\n    </ion-toggle>\n    </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("cart/templates/cart.html","<ion-modal-view>\n    <ion-header-bar>\n        <h1 class=\"title\">Carrinho de Compras</h1>\n\n        <div class=\"buttons\">\n            <button class=\"button button-clear\" ng-click=\"closeCart()\">Fechar</button>\n        </div>\n    </ion-header-bar>\n    <ion-content>\n        <div class=\"text-center\" ng-hide=\"valorTotal>0\">\n            <button class=\"button button-large button-full button-dark\" ng-click=\"closeCart()\">\n                Nenhum item selecionado\n            </button>\n        </div>\n\n        <div class=\"list list-inset\" ng-show=\"valorTotal>0\">\n            <div class=\"item item-divider\">Itens</div>\n            <div class=\"item item-button-right\" ng-repeat=\"item in cartItems\">\n                <p>{{ item.nome }}</p>\n                <span class=\"quantity\">{{ item.quantidade }} <small>x</small> </span><span class=\"price\">{{ item.valor | currency }}</span>\n                <button class=\"button button-light\" ng-click=\"removeCartItem(item.id)\">\n                    <i class=\"icon ion-close-circled\"></i>\n                </button>\n            </div>\n        </div>\n\n        <form class=\"cancelEnter\" ng-submit=\"doDelivery()\" ng-show=\"valorTotal>0\">\n            <div class=\"list\">\n                <div class=\"item item-divider\">Forma de Pagamento</div>\n\n                <div class=\"item text-center\">\n                    Valor Total: <span class=\"price\">{{ valorTotal | currency }}</span>\n                    <ion-list class=\"text-left\">\n                        <ion-radio ng-model=\"cartData.pagamento\" ng-value=\"\'dinheiro\'\">Dinheiro</ion-radio>\n                        <ion-radio ng-model=\"cartData.pagamento\" ng-value=\"\'debito\'\">\n                            <div class=\"pull-left\">Cartão Debito</div>\n                            <div class=\"pull-right\">\n                                <i class=\"fa fa-cc-visa fa-2x\"></i>\n                                <i class=\"fa fa-cc-mastercard fa-2x\"></i>\n                                <i class=\"fa fa-cc-diners-club fa-2x\"></i>\n                            </div>\n\n                        </ion-radio>\n                        <ion-radio ng-model=\"cartData.pagamento\" ng-value=\"\'credito\'\">\n                            <div class=\"pull-left\">Cartão Crédito</div>\n                            <div class=\"pull-right\">\n                                <i class=\"fa fa-cc-visa fa-2x\"></i>\n                                <i class=\"fa fa-cc-mastercard fa-2x\"></i>\n                                <i class=\"fa fa-cc-diners-club fa-2x\"></i>\n                            </div>\n                        </ion-radio>\n                    </ion-list>\n                </div>\n                <div class=\"item\">\n\n                </div>\n\n                <div class=\"item item-divider\">Dados da Entrega</div>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Nome:</span>\n                    <input type=\"text\" name=\"nome\" ng-model=\"cartData.nome\" placeholder=\"Ex.: João da Silva\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">E-mail:</span>\n                    <input type=\"email\" name=\"email\" ng-model=\"cartData.email\" placeholder=\"Ex.: exemplo@gmail.com\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Telefone:</span>\n                    <input type=\"tel\" name=\"telefone\" ng-model=\"cartData.telefone\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Whatsapp:</span>\n                    <input type=\"tel\" name=\"whatsapp\" ng-model=\"cartData.whatsapp\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">CEP:</span>\n                    <input type=\"tel\"\n                           class=\"numbersOnly cancelEnter cepKeyUp\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.cep\" placeholder=\"Ex.: 28893818\"\n                           maxlength=\"8\">\n                </label>\n                <label class=\"item item-input item-stacked-label item-button-right\">\n                    <span class=\"input-label\">Endereço:</span>\n                    <input type=\"text\"\n                           class=\"cancelEnter enderecoKeyUp\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.endereco\" placeholder=\"Ex.: Av. Brasil\">\n                    <div class=\"list list-inset\" ng-show=\"cartData.matches.length>0\">\n                        <div class=\"item item-divider\">Endereços encontrados:</div>\n                        <label class=\"item address-item\" ng-repeat=\"address in cartData.matches\">\n                            <button class=\"button button-small button-light\" type=\"button\"\n                                    ng-click=\"selecionaEndereco(address)\">\n                                {{address.logradouro}} {{address.complemento}} - CEP: {{address.cep}} - Bairro: {{address.bairro}}\n                            </button>\n                        </label>\n                    </div>\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Bairro:</span>\n                    <input type=\"text\" name=\"bairro\" ng-model=\"cartData.bairro\" placeholder=\"Ex.: Centro\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Número:</span>\n                    <input type=\"text\" name=\"numero\" ng-model=\"cartData.numero\" placeholder=\"Ex.: 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Complemento: <small>(opcional)</small></span>\n                    <input type=\"text\" name=\"complemento\" ng-model=\"cartData.complemento\" placeholder=\"Ex.: apartamento 109\">\n                </label>\n\n                <label class=\"item\">\n                    <button class=\"button button-block button-positive\" type=\"submit\">Solicitar Entrega</button>\n                </label>\n            </div>\n        </form>\n    </ion-content>\n</ion-modal-view>\n");
$templateCache.put("chat/template/chat-detail.html","<!--\n  This template loads for the \'tab.friend-detail\' state (app.js)\n  \'friend\' is a $scope variable created in the FriendsCtrl controller (controllers.js)\n  The FriendsCtrl pulls data from the Friends service (service.js)\n  The Friends service returns an array of friend data\n-->\n<ion-view view-title=\"{{chat.name}}\">\n  <ion-content class=\"padding\">\n    <img ng-src=\"{{chat.face}}\" style=\"width: 64px; height: 64px\">\n    <p>\n      {{chat.lastText}}\n    </p>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("chat/template/tab-chats.html","<ion-view view-title=\"Chats\">\n  <ion-content>\n    <ion-list>\n      <ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"chat in chats\" type=\"item-text-wrap\" href=\"#/tab/chats/{{chat.id}}\">\n        <img ng-src=\"{{chat.face}}\">\n        <h2>{{chat.name}}</h2>\n        <p>{{chat.lastText}}</p>\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\n\n        <ion-option-button class=\"button-assertive\" ng-click=\"remove(chat)\">\n          Delete\n        </ion-option-button>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("common/templates/menu.html","<ion-side-menus enable-menu-with-back-views=\"false\">\n    <ion-side-menu-content>\n        <ion-nav-bar class=\"bar-stable\">\n            <ion-nav-back-button></ion-nav-back-button>\n            <ion-nav-buttons side=\"left\">\n                <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"left\"\n                        ng-hide=\"$exposeAside.active\"></button>\n                <div class=\"delivery-bar-title title\">delivery24horas.com</div>\n            </ion-nav-buttons>\n            <ion-nav-buttons side=\"right\">\n                <button class=\"delivery-btn-social-header button button-positive btn-social\">\n                    <i class=\"ion-social-facebook\"></i>Login com Facebook\n                </button>\n\n                <!--<button class=\"button marging\" ng-class=\"{\'button-clear\': (valorTotal=0), \'button-balanced\': (valorTotal>0)}\">-->\n                <button class=\"button marging\"\n                        ng-click=\"showCart()\"\n                        ng-class=\"(valorTotal>0)?\'button-clear button-balanced\': \'button-clear\'\">\n                <!--<button class=\"button button-clear\">-->\n                    <i class=\"ion-android-cart\"></i> ({{ valorTotal | currency }})\n                </button>\n            </ion-nav-buttons>\n        </ion-nav-bar>\n        <ion-nav-view name=\"menuContent\"></ion-nav-view>\n    </ion-side-menu-content>\n\n    <ion-side-menu expose-aside-when=\"large\">\n        <ion-header-bar class=\"bar-stable\">\n            <h1 class=\"title\">Menu</h1>\n        </ion-header-bar>\n        <ion-content>\n            <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n            <div class=\"list list-inset\">\n                <div class=\"item item-divider\">Categorias</div>\n\n                <a href=\"#/app/productlist\" class=\"item item-icon-left\"\n                   menu-close ng-click=\"loadCategoria(\'Todas\');loadProducts()\">\n                    <i class=\"icon ion-beer\"></i>\n                    Todas\n                </a>\n                <a ng-repeat=\"item in categorias\" href=\"#/app/productlist\" class=\"item item-icon-left\"\n                   menu-close ng-click=\"loadCategoria(item.nome);loadProducts(item.id)\">\n                    <i class=\"{{ item.icon }}\"></i>\n                    {{ item.nome }}\n                </a>\n\n                <div class=\"item item-divider\">Relatórios</div>\n                <a href=\"#/app/report\" class=\"item item-icon-left\" menu-close>\n                    <i class=\"ion-document-text\"></i>\n                    Relatórios\n                </a>\n                <a href=\"#/app/browse\" class=\"item item-icon-left\" menu-close>\n                    <i class=\"ion-document-text\"></i>\n                    Browse\n                </a>\n\n                <div class=\"item item-divider\">Minha conta</div>\n                <div class=\"item\">Meus Dados</div>\n                <div class=\"item\">Trocar Senha</div>\n                <div class=\"item\">Sair</div>\n\n            </div>\n        </ion-content>\n    </ion-side-menu>\n</ion-side-menus>");
$templateCache.put("productlist/templates/productlist.html","<ion-view view-title=\"\">\n    <div class=\"bar item-input-inset\" ng-class=\"{\'bar-subheader\': minMediumScreens}\">\n        <label class=\"item-input-wrapper\">\n            <i class=\"icon ion-ios-search placeholder-icon\"></i>\n            <input type=\"search\" placeholder=\"Busca de produtos\" ng-model=\"query\">\n        </label>\n        <button class=\"button button-clear\" ng-click=\"query = \'\'\">\n            Cancelar\n        </button>\n    </div>\n    <ion-content ng-class=\"{\'has-subheader\': minMediumScreens, \'has-header\': handhelds}\"\n                 set-class-when-at-top=\"fix-to-top\" overflow-scroll=\"false\">\n        <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n\n        <div class=\"list delivery-list\">\n\n            <div class=\"item item-button-right delivery-btn-social\">\n                <button class=\"button button-positive btn-social\">\n                    <i class=\"ion-social-facebook\"></i>Login com Facebook\n                </button>\n            </div>\n            <div class=\"item\" ng-show=\"minMediumScreens\">\n                <div class=\"delivery-logo-block\">\n                    <img ng-src=\"{{logoUrl+\'logo-delivery2-resized-compressed.png\'}}\">\n                    <p ng-hide=\"$exposeAside.active\"><span class=\"ion-arrow-left-a\"></span> Acesse o Menu ao lado</p>\n                </div>\n            </div>\n\n        </div>\n\n        <div class=\"delivery-list-with-menu\">\n            <div affix-within-container=\".delivery-list-with-menu\" class=\"delivery-menu-left\">\n                <!--<button ng-click=\"loadCategoria(\'Todas\');loadProducts()\"-->\n                        <!--class=\"delivery-button button button-outline button-positive\">-->\n                    <!--<i class=\"{{ item.icon }}\"></i>-->\n                    <!--<p>Todas</p>-->\n                <!--</button>-->\n                <!--<div ion-affix data-affix-within-parent-with-class=\"delivery-menu-left\"-->\n                <button ng-repeat=\"item in categorias\" ng-click=\"loadCategoria(item.nome);loadProducts(item.id)\"\n                        class=\"delivery-button button button-outline button-positive\">\n                    <i class=\"{{ item.icon }}\"></i>\n                    <p>{{ item.nome }}</p>\n                </button>\n            </div>\n\n            <div ng-class=\"{card: minMediumScreens, list: handhelds, \'list-inset\': handhelds}\">\n                <div class=\"item item-divider\">{{ rootCategoriaSelecionada }}</div>\n                <div class=\"delivery-product-item\" ng-class=\"{item: handhelds, \'item-thumbnail-left\': handhelds}\"\n                     ng-repeat=\"produto in products | filter: query\">\n\n                    <img ng-src=\"{{ prepareImage(produto.imagem) }}\"\n                         alt=\"Imagem do produto {{ produto.nome }}\"\n                         title=\"Imagem do produto {{ produto.nome }}\">\n                    <div>\n                        <span class=\"price\">{{ produto.valor | currency }}<small ng-show=\"quantidade[produto.id]>0\"> x <span class=\"quantity\">{{ quantidade[produto.id] }}</span></small></span>\n                        <p>{{ produto.nome }}</p>\n                    </div>\n\n                    <div class=\"range\">\n                        <button ng-click=\"decrementa(produto.id)\" class=\"button button-light\"><i class=\"icon ion-chevron-left\"></i></button>\n                        <input type=\"range\" ng-change=\"somaTotal()\" id=\"quantidade[{{ produto.id }}]\"\n                               name=\"quantidade[{{ produto.id }}]\" ng-model=\"quantidade[produto.id]\"\n                               min=\"0\" max=\"{{ produto.max }}\">\n                        <button ng-click=\"incrementa(produto.id)\" class=\"button button-light\"><i class=\"icon ion-chevron-right\"></i></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </ion-content>\n</ion-view>");
$templateCache.put("report/templates/report.html","<ion-view view-title=\"Relatórios\">\n    <ion-content class=\"padding\">\n        <h1>{{ titulo }}</h1>\n        <p>\n            <a class=\"button icon icon-right ion-chevron-right\" href=\"#/app/report\">titulo</a>\n        </p>\n    </ion-content>\n</ion-view>");
$templateCache.put("browse.html","<ion-view view-title=\"Browse\">\n  <ion-content>\n    <h1>Browse</h1>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("loading.html","<div class=\"loading-container visible active\">\n    <div class=\"loading\">\n        <p>Carregando...</p><ion-spinner></ion-spinner>\n    </div>\n</div>");
$templateCache.put("login.html","<ion-modal-view>\n  <ion-header-bar>\n    <h1 class=\"title\">Login</h1>\n    <div class=\"buttons\">\n      <button class=\"button button-clear\" ng-click=\"closeLogin()\">Close</button>\n    </div>\n  </ion-header-bar>\n  <ion-content>\n    <form ng-submit=\"doLogin()\">\n      <div class=\"list\">\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Username</span>\n          <input type=\"text\" ng-model=\"loginData.username\">\n        </label>\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Password</span>\n          <input type=\"password\" ng-model=\"loginData.password\">\n        </label>\n        <label class=\"item\">\n          <button class=\"button button-block button-positive\" type=\"submit\">Log in</button>\n        </label>\n      </div>\n    </form>\n  </ion-content>\n</ion-modal-view>\n");
$templateCache.put("search.html","<ion-view view-title=\"Search\">\n  <ion-content>\n    <h1>Search</h1>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("tabs/tab-cart.html","<ion-view>\n    <ion-header-bar>\n        <h1 class=\"title\">Carrinho de Compras</h1>\n\n        <div class=\"buttons\">\n            <button class=\"button button-clear\" ng-click=\"closeCart()\">Fechar</button>\n        </div>\n    </ion-header-bar>\n    <ion-content>\n        <div class=\"text-center\" ng-hide=\"valorTotal>0\">\n            <button class=\"button button-large button-full button-dark\" ng-click=\"closeCart()\">\n                Nenhum item selecionado\n            </button>\n        </div>\n\n        <div class=\"list list-inset\" ng-show=\"valorTotal>0\">\n            <div class=\"item item-divider\">Itens</div>\n            <div class=\"item item-button-right\" ng-repeat=\"item in cartItems\">\n                <p>{{ item.nome }}</p>\n                <span class=\"quantity\">{{ item.quantidade }} <small>x</small> </span><span class=\"price\">{{ item.valor | currency }}</span>\n                <button class=\"button button-light\" ng-click=\"removeCartItem(item.id)\">\n                    <i class=\"icon ion-close-circled\"></i>\n                </button>\n            </div>\n        </div>\n\n        <form class=\"cancelEnter\" ng-submit=\"doDelivery()\" ng-show=\"valorTotal>0\">\n            <div class=\"list\">\n                <div class=\"item item-divider\">Forma de Pagamento</div>\n\n                <div class=\"item text-center\">\n                    Valor Total: <span class=\"price\">{{ valorTotal | currency }}</span>\n                    <ion-list class=\"text-left\">\n                        <ion-radio ng-model=\"cartData.pagamento\" ng-value=\"\'dinheiro\'\">Dinheiro</ion-radio>\n                        <ion-radio ng-model=\"cartData.pagamento\" ng-value=\"\'debito\'\">\n                            <div class=\"pull-left\">Cartão Debito</div>\n                            <div class=\"pull-right\">\n                                <i class=\"fa fa-cc-visa fa-2x\"></i>\n                                <i class=\"fa fa-cc-mastercard fa-2x\"></i>\n                                <i class=\"fa fa-cc-diners-club fa-2x\"></i>\n                            </div>\n\n                        </ion-radio>\n                        <ion-radio ng-model=\"cartData.pagamento\" ng-value=\"\'credito\'\">\n                            <div class=\"pull-left\">Cartão Crédito</div>\n                            <div class=\"pull-right\">\n                                <i class=\"fa fa-cc-visa fa-2x\"></i>\n                                <i class=\"fa fa-cc-mastercard fa-2x\"></i>\n                                <i class=\"fa fa-cc-diners-club fa-2x\"></i>\n                            </div>\n                        </ion-radio>\n                    </ion-list>\n                </div>\n                <div class=\"item\">\n\n                </div>\n\n                <div class=\"item item-divider\">Dados da Entrega</div>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Nome:</span>\n                    <input type=\"text\" name=\"nome\" ng-model=\"cartData.nome\" placeholder=\"Ex.: João da Silva\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">E-mail:</span>\n                    <input type=\"email\" name=\"email\" ng-model=\"cartData.email\" placeholder=\"Ex.: exemplo@gmail.com\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Telefone:</span>\n                    <input type=\"tel\" name=\"telefone\" ng-model=\"cartData.telefone\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Whatsapp:</span>\n                    <input type=\"tel\" name=\"whatsapp\" ng-model=\"cartData.whatsapp\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">CEP:</span>\n                    <input type=\"tel\"\n                           class=\"numbersOnly cancelEnter cepKeyUp\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.cep\" placeholder=\"Ex.: 28893818\"\n                           maxlength=\"8\">\n                </label>\n                <label class=\"item item-input item-stacked-label item-button-right\">\n                    <span class=\"input-label\">Endereço:</span>\n                    <input type=\"text\"\n                           class=\"cancelEnter enderecoKeyUp\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.endereco\" placeholder=\"Ex.: Av. Brasil\">\n                    <div class=\"list list-inset\" ng-show=\"cartData.matches.length>0\">\n                        <div class=\"item item-divider\">Endereços encontrados:</div>\n                        <label class=\"item address-item\" ng-repeat=\"address in cartData.matches\">\n                            <button class=\"button button-small button-light\" type=\"button\"\n                                    ng-click=\"selecionaEndereco(address)\">\n                                {{address.logradouro}} {{address.complemento}} - CEP: {{address.cep}} - Bairro: {{address.bairro}}\n                            </button>\n                        </label>\n                    </div>\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Bairro:</span>\n                    <input type=\"text\" name=\"bairro\" ng-model=\"cartData.bairro\" placeholder=\"Ex.: Centro\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Número:</span>\n                    <input type=\"text\" name=\"numero\" ng-model=\"cartData.numero\" placeholder=\"Ex.: 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Complemento: <small>(opcional)</small></span>\n                    <input type=\"text\" name=\"complemento\" ng-model=\"cartData.complemento\" placeholder=\"Ex.: apartamento 109\">\n                </label>\n\n                <label class=\"item\">\n                    <button class=\"button button-block button-positive\" type=\"submit\">Solicitar Entrega</button>\n                </label>\n            </div>\n        </form>\n    </ion-content>\n</ion-view>\n");
$templateCache.put("tabs/tab-dash.html","<ion-view view-title=\"Dashboard\">\n  <ion-content class=\"padding\">\n    <h2>Welcome to Ionic</h2>\n    <p>\n    This is the Ionic starter for tabs-based apps. For other starters and ready-made templates, check out the <a href=\"http://market.ionic.io/starters\" target=\"_blank\">Ionic Market</a>.\n    </p>\n    <p>\n      To edit the content of each tab, edit the corresponding template file in <code>www/templates/</code>. This template is <code>www/templates/tab-dash.html</code>\n    </p>\n    <p>\n    If you need help with your app, join the Ionic Community on the <a href=\"http://forum.ionicframework.com\" target=\"_blank\">Ionic Forum</a>. Make sure to <a href=\"http://twitter.com/ionicframework\" target=\"_blank\">follow us</a> on Twitter to get important updates and announcements for Ionic developers.\n    </p>\n    <p>\n      For help sending push notifications, join the <a href=\"https://apps.ionic.io/signup\" target=\"_blank\">Ionic Platform</a> and check out <a href=\"http://docs.ionic.io/docs/push-overview\" target=\"_blank\">Ionic Push</a>. We also have other services available.\n    </p>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("tabs/tabs.html","<!--\nCreate tabs with an icon and label, using the tabs-positive style.\nEach tab\'s child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.\n-->\n<ion-tabs class=\"tabs-icon-top tabs-color-active-positive\">\n    <!-- Home Tab -->\n    <ion-tab title=\"Produtos\" icon-off=\"ion-ios-home-outline\" icon-on=\"ion-ios-home\" href=\"#/tab/home\">\n        <ion-nav-view name=\"tab-home\"></ion-nav-view>\n    </ion-tab>\n\n     <!--Dashboard Tab-->\n    <ion-tab title=\"Carrinho {{ valorTotal | currency }}\" icon-off=\"ion-ios-cart-outline\" icon-on=\"ion-ios-cart\" href=\"#/tab/cart\">\n        <ion-nav-view name=\"tab-cart\"></ion-nav-view>\n    </ion-tab>\n\n    <!-- Chats Tab -->\n    <ion-tab title=\"Ajuda\" icon-off=\"ion-ios-chatboxes-outline\" icon-on=\"ion-ios-chatboxes\" href=\"#/tab/chats\">\n        <ion-nav-view name=\"tab-chats\"></ion-nav-view>\n    </ion-tab>\n\n    <!-- Account Tab -->\n    <ion-tab title=\"Minha Conta\" icon-off=\"ion-ios-gear-outline\" icon-on=\"ion-ios-gear\" href=\"#/tab/account\">\n        <ion-nav-view name=\"tab-account\"></ion-nav-view>\n    </ion-tab>\n</ion-tabs>");}]);
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
        '$rootScope',
        'Helpers',
        apiService
    ]);

    function apiService($q, $http, $rootScope, Helpers) {

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
                        return Helpers.handleHttpErrorResponse(response);
                    });
        }
        return scope;
    }

    module.exports = apiModule;
})();
},{}],11:[function(require,module,exports){
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
        '$document',
        '$ionicScrollDelegate',
        affixWithinContainer
    ]);
    function affixWithinContainer($document, $ionicScrollDelegate) {

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
            require: '^$ionicScroll',
            link: function($scope, $element, $attr, $ionicScroll) {
                var $affixContainer = $element.parent();
                //var $affixContainer = $element.closest($attr.affixWithinContainer) || $element.parent();

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
                //var updateScrollLimits = _.throttle(function(scrollTop) {
                //    top = $affixContainer.offset().top;
                //    height = $affixContainer.outerHeight(false);
                //    affixedHeight = $element.outerHeight(false);
                //    scrollMin = scrollTop + top;
                //    scrollMax = scrollMin + height;
                //    scrollTransition = scrollMax - affixedHeight;
                //}, 500, {
                //    trailing: false
                //});

                var affix = null;
                var unaffix = null;
                var $affixedClone = null;
                var setupAffix = function() {
                    unaffix = null;
                    affix = function() {
                        var css = {
                            position: 'fixed',
                            top: offsetTop+'px'
                        };
                        $affixedClone = $element.clone().css(css);
                        $ionicScroll.$element.append($affixedClone);

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
                $ionicScroll.$element.on('scroll', function(event) {
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
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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

    module.exports = angularModule;
})();
},{}]},{},[1]);
