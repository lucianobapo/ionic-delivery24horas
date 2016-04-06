(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('App.Config', []);
    angular.module('templates', []);
    angular.module('App.Helpers', []);
    angular.module('App.Api', []);
    angular.module('App.cepDirective', []);

    angular.module('App.Common', []);
    //angular.module('App.Playlist', []);
    angular.module('App.ProductList', []);
    angular.module('App.Report', []);

    require('./config-build');
    require('./templates-build');
    require('./utility/helpers');
    require('./utility/api');
    require('./utility/cep-directive');

    require('./common/common');
    require('./productlist/productlist');
    require('./report/report');
    //require('./playlist/playlist');

    var appModule = angular.module('App', [

        // Ionic and angular modules
        'ionic',

        // Project modules
        'App.Config',
        'App.Helpers',
        'App.Common',
        'App.Api',
        //'App.Playlist',
        'App.ProductList',
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

            $urlRouterProvider.otherwise('/app/productlist');
            //$urlRouterProvider.otherwise('/app/report');

        }
    ]);

    appModule.service('loadingMarker', [
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

    appModule.controller('bodyController', [
        '$scope',
        '$rootScope',
        '$ionicModal',
        bodyController
    ]);
    function bodyController($scope, $rootScope, $ionicModal) {
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
    }

    appModule.run([
        '$ionicPlatform',
        '$rootScope',
        '$ionicLoading',
        appMain
    ]);

    function appMain($ionicPlatform, $rootScope, $ionicLoading) {
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
},{"./common/common":2,"./config-build":3,"./productlist/productlist":4,"./report/report":5,"./templates-build":6,"./utility/api":7,"./utility/cep-directive":8,"./utility/helpers":9}],2:[function(require,module,exports){
(function () {
    'use strict';

    var commonModule = angular.module('App.Common');

    commonModule.controller('CommonCtrl', [
        '$scope',
        '$rootScope',
        '$ionicModal',
        '$timeout',
        //'$state',
        '$ionicPopup',
        'AppConfig',
        'Api',
        '$window',
        'AddressDataService',
        //'Helpers',
        commonCtrl
    ]);

    function commonCtrl($scope, $rootScope, $ionicModal, $timeout, /*$state, */$ionicPopup, AppConfig, Api, $window, AddressDataService/*, Helpers*/) {
        $rootScope.$watch(function(){
            return $window.innerWidth;
        }, function(value) {
            //console.log(value);
            if (value<=425) {
                $rootScope.handhelds = true;
                $rootScope.minMediumScreens = false;
            } else {
                $rootScope.handhelds = false;
                $rootScope.minMediumScreens = true;
            }
        });

        $rootScope.rootCategoriaSelecionada = 'Todas';
        $rootScope.loadCategoria = function ($nome) {
            $rootScope.rootCategoriaSelecionada = $nome;
        };

        $scope.loadItems = function () {
            Api.sendRequest({
                method: "GET",
                url: AppConfig.apiEndpoint + '/categorias'
            })
            .then(function(response){
                $scope.categorias = response.data.data;
            });
        };

        $scope.doRefresh = function () {
            $scope.loadItems();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };

        $scope.loadItems();

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('cart.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.cartModal = modal;
        });
        // Triggered in the login modal to close it
        $scope.closeCart = function () {
            $scope.cartModal.hide();
        };
        // Open the login modal
        $scope.showCart = function () {
            $scope.cartModal.show();
        };
        // Form data for the login modal
        $rootScope.cartData = {};

        $scope.cepKeyup = function (e) {
            if ($scope.cartData.cep.length == 8) {
                Api.sendRequest({
                        method: "GET",
                        url: AppConfig.servicoCep($scope.cartData.cep)
                    })
                    .then(function(response){
                        console.log(response);
                        if (response.data.erro){
                            $scope.cartData.endereco = '';
                            $scope.cartData.bairro = '';
                            $scope.showAlert($scope.cartData.cep);
                        } else {
                            $scope.cartData.endereco = response.data.logradouro;
                            $scope.cartData.bairro = response.data.bairro;
                        }
                    });
            }
        };

        // An alert dialog
        $scope.showAlert = function(cep) {
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
                console.log('CEP:'+cep+' inválido');
            });
        };

        $rootScope.cartData.matches = [];
        $scope.selecionaEndereco = function (address) {
            //console.log(address);
            $rootScope.cartData.matches = [];
            $scope.cartData.cep = address.cep.replace('-','');
            $scope.cartData.endereco = address.logradouro;
            $scope.cartData.bairro = address.bairro;
        };

        $scope.enderecoKeyup = function () {
            if ($rootScope.cartData.endereco.length > 2) {
                AddressDataService.searchAddress($rootScope.cartData.endereco);
            } else $rootScope.cartData.matches = [];
        };

        $scope.commonArray = [4, 5, 6];
        console.log('Common Controller');

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
},{}],3:[function(require,module,exports){
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
        servicoCep: function(query){ return 'https://viacep.com.br/ws/'+query+'/json/'; },
        apiEndpoint: 'http://api.delivery24horas.com/json',
        imagesUrl: 'https://s3.amazonaws.com/delivery-images/thumbnails/',
        logoUrl: 'https://s3.amazonaws.com/delivery-images/logo/'
    });
    configModule.value("globals", {});

    module.exports = configModule;
})();
},{}],4:[function(require,module,exports){
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
        console.debug('ProductList Controller: ', $scope.commonArray);

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
                });
            if ($rootScope.allProducts===undefined){
                Api
                    .sendRequest({
                        method: "GET",
                        url: AppConfig.apiEndpoint + '/produtosDelivery/todas'
                    })
                    .then(function(response){
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
            if (img==null) return 'http://placehold.it/80x80';
            return AppConfig.imagesUrl+img;
        };
    }

    module.exports = productListModule;
})();
},{}],5:[function(require,module,exports){
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
        console.debug('Report Controller: ', $scope.commonArray);

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
},{}],6:[function(require,module,exports){
angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("common/templates/menu.html","<ion-side-menus enable-menu-with-back-views=\"false\">\n    <ion-side-menu-content>\n        <ion-nav-bar class=\"bar-stable\">\n            <ion-nav-back-button></ion-nav-back-button>\n            <ion-nav-buttons side=\"left\">\n                <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"left\"\n                        ng-hide=\"$exposeAside.active\"></button>\n                <div class=\"delivery-bar-title title\">delivery24horas.com</div>\n            </ion-nav-buttons>\n            <ion-nav-buttons side=\"right\">\n                <button class=\"delivery-btn-social-header button button-positive btn-social\">\n                    <i class=\"ion-social-facebook\"></i>Login com Facebook\n                </button>\n\n                <!--<button class=\"button marging\" ng-class=\"{\'button-clear\': (valorTotal=0), \'button-balanced\': (valorTotal>0)}\">-->\n                <button class=\"button marging\"\n                        ng-click=\"showCart()\"\n                        ng-class=\"(valorTotal>0)?\'button-clear button-balanced\': \'button-clear\'\">\n                <!--<button class=\"button button-clear\">-->\n                    <i class=\"ion-android-cart\"></i> ({{ valorTotal | currency }})\n                </button>\n            </ion-nav-buttons>\n        </ion-nav-bar>\n        <ion-nav-view name=\"menuContent\"></ion-nav-view>\n    </ion-side-menu-content>\n\n    <ion-side-menu expose-aside-when=\"large\">\n        <ion-header-bar class=\"bar-stable\">\n            <h1 class=\"title\">Menu</h1>\n        </ion-header-bar>\n        <ion-content>\n            <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n            <div class=\"list list-inset\">\n                <div class=\"item item-divider\">Categorias</div>\n\n                <a href=\"#/app/productlist\" class=\"item item-icon-left\"\n                   menu-close ng-click=\"loadCategoria(\'Todas\');loadProducts()\">\n                    <i class=\"icon ion-beer\"></i>\n                    Todas\n                </a>\n                <a ng-repeat=\"item in categorias\" href=\"#/app/productlist\" class=\"item item-icon-left\"\n                   menu-close ng-click=\"loadCategoria(item.nome);loadProducts(item.id)\">\n                    <i class=\"{{ item.icon }}\"></i>\n                    {{ item.nome }}\n                </a>\n\n                <div class=\"item item-divider\">Relatórios</div>\n                <a href=\"#/app/report\" class=\"item item-icon-left\" menu-close>\n                    <i class=\"ion-document-text\"></i>\n                    Relatórios\n                </a>\n                <a href=\"#/app/browse\" class=\"item item-icon-left\" menu-close>\n                    <i class=\"ion-document-text\"></i>\n                    Browse\n                </a>\n\n                <div class=\"item item-divider\">Minha conta</div>\n                <div class=\"item\">Meus Dados</div>\n                <div class=\"item\">Trocar Senha</div>\n                <div class=\"item\">Sair</div>\n\n            </div>\n        </ion-content>\n    </ion-side-menu>\n</ion-side-menus>");
$templateCache.put("productlist/templates/productlist.html","<ion-view view-title=\"\">\n    <div class=\"bar bar-subheader item-input-inset\">\n        <label class=\"item-input-wrapper\">\n            <i class=\"icon ion-ios-search placeholder-icon\"></i>\n            <input type=\"search\" placeholder=\"Busca de produtos\" ng-model=\"query\">\n        </label>\n        <button class=\"button button-clear\" ng-click=\"query = \'\'\">\n            Cancelar\n        </button>\n    </div>\n    <ion-content class=\"has-subheader\">\n        <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n\n        <div class=\"list delivery-list\">\n\n            <div class=\"item item-button-right delivery-btn-social\">\n                <button class=\"button button-positive btn-social\">\n                    <i class=\"ion-social-facebook\"></i>Login com Facebook\n                </button>\n            </div>\n            <div class=\"item\">\n                <div class=\"delivery-logo-block\">\n                    <img ng-src=\"{{logoUrl+\'logo-delivery2-compressed.png\'}}\">\n                    <p ng-hide=\"$exposeAside.active\"><span class=\"ion-arrow-left-a\"></span> Acesse o Menu ao lado</p>\n                </div>\n            </div>\n\n        </div>\n\n        <div ng-class=\"{card: minMediumScreens, list: handhelds, \'list-inset\': handhelds}\">\n            <div class=\"item item-divider\">{{ rootCategoriaSelecionada }}</div>\n            <div class=\"delivery-product-item\" ng-class=\"{item: handhelds, \'item-thumbnail-left\': handhelds}\"\n                 ng-repeat=\"produto in products | filter: query\">\n\n                <img ng-src=\"{{ prepareImage(produto.imagem) }}\"\n                     alt=\"Imagem do produto {{ produto.nome }}\"\n                     title=\"Imagem do produto {{ produto.nome }}\">\n                <div>\n                    <span class=\"price\">{{ produto.valor | currency }}<small ng-show=\"quantidade[produto.id]>0\"> x <span class=\"quantity\">{{ quantidade[produto.id] }}</span></small></span>\n                    <p>{{ produto.nome }}</p>\n                </div>\n\n                <div class=\"range\">\n                    <button ng-click=\"decrementa(produto.id)\" class=\"button button-light\"><i class=\"icon ion-chevron-left\"></i></button>\n                    <input type=\"range\" ng-change=\"somaTotal()\" id=\"quantidade[{{ produto.id }}]\"\n                           name=\"quantidade[{{ produto.id }}]\" ng-model=\"quantidade[produto.id]\"\n                           min=\"0\" max=\"{{ produto.max }}\">\n                    <button ng-click=\"incrementa(produto.id)\" class=\"button button-light\"><i class=\"icon ion-chevron-right\"></i></button>\n                </div>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>");
$templateCache.put("report/templates/report.html","<ion-view view-title=\"Relatórios\">\n    <ion-content class=\"padding\">\n        <h1>{{ titulo }}</h1>\n        <p>\n            <a class=\"button icon icon-right ion-chevron-right\" href=\"#/app/report\">titulo</a>\n        </p>\n    </ion-content>\n</ion-view>");
$templateCache.put("browse.html","<ion-view view-title=\"Browse\">\n  <ion-content>\n    <h1>Browse</h1>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("cart.html","<ion-modal-view>\n    <ion-header-bar>\n        <h1 class=\"title\">Carrinho</h1>\n\n        <div class=\"buttons\">\n            <button class=\"button button-clear\" ng-click=\"closeCart()\">Fechar</button>\n        </div>\n    </ion-header-bar>\n    <ion-content>\n        <div class=\"text-center\" ng-hide=\"valorTotal>0\">\n            <button class=\"button button-large button-full button-dark\" ng-click=\"closeCart()\">\n                Carrinho de Compras Vazio\n            </button>\n        </div>\n\n        <div class=\"list list-inset\" ng-show=\"valorTotal>0\">\n            <div class=\"item item-divider\">Itens</div>\n            <div class=\"item item-button-right\" ng-repeat=\"item in cartItems\">\n                <p>{{ item.nome }}</p>\n                <span class=\"quantity\">{{ item.quantidade }} <small>x</small> </span><span class=\"price\">{{ item.valor | currency }}</span>\n                <button class=\"button button-light\" ng-click=\"removeCartItem(item.id)\">\n                    <i class=\"icon ion-close-circled\"></i>\n                </button>\n            </div>\n        </div>\n\n        <form ng-submit=\"doDelivery()\" ng-show=\"valorTotal>0\">\n            <div class=\"list\">\n                <div class=\"item item-divider\">Valor Total</div>\n                <div class=\"item text-center\"><span class=\"price\">{{ valorTotal | currency }}</span></div>\n                <div class=\"item item-divider\">Dados da Entrega</div>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Nome:</span>\n                    <input type=\"text\" name=\"nome\" ng-model=\"cartData.nome\" placeholder=\"Ex.: João da Silva\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">E-mail:</span>\n                    <input type=\"email\" name=\"email\" ng-model=\"cartData.email\" placeholder=\"Ex.: exemplo@gmail.com\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Telefone:</span>\n                    <input type=\"tel\" name=\"telefone\" ng-model=\"cartData.telefone\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Whatsapp:</span>\n                    <input type=\"tel\" name=\"whatsapp\" ng-model=\"cartData.whatsapp\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">CEP:</span>\n                    <input type=\"text\"\n                           ng-keyup=\"cepKeyup($event)\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.cep\" placeholder=\"Ex.: 28893818\"\n                           maxlength=\"8\">\n                </label>\n                <label class=\"item item-input item-stacked-label item-button-right\">\n                    <span class=\"input-label\">Endereço:</span>\n                    <input type=\"text\"\n                           ng-keyup=\"enderecoKeyup()\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.endereco\" placeholder=\"Ex.: Av. Brasil\">\n                    <div class=\"list list-inset\" ng-show=\"cartData.matches.length>0\">\n                        <div class=\"item item-divider\">Endereços encontrados:</div>\n                        <label class=\"item address-item\" ng-repeat=\"address in cartData.matches\">\n                            <button class=\"button button-small button-light\" type=\"button\" ng-click=\"selecionaEndereco(address)\">\n                                {{address.logradouro}} - CEP: {{address.cep}} - Bairro: {{address.bairro}}\n                            </button>\n                        </label>\n                    </div>\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Número:</span>\n                    <input type=\"text\" name=\"numero\" ng-model=\"cartData.numero\" placeholder=\"Ex.: 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Complemento:</span>\n                    <input type=\"text\" name=\"complemento\" ng-model=\"cartData.complemento\" placeholder=\"Ex.: apartamento 109\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Bairro:</span>\n                    <input type=\"text\" name=\"bairro\" ng-model=\"cartData.bairro\" placeholder=\"Ex.: Centro\">\n                </label>\n                <label class=\"item\">\n                    <button class=\"button button-block button-positive\" type=\"submit\">Solicitar Entrega</button>\n                </label>\n            </div>\n        </form>\n    </ion-content>\n</ion-modal-view>\n");
$templateCache.put("home.html","<ion-view view-title=\"\" ng-controller=\"ProductsCtrl\">\n    <div class=\"bar bar-subheader item-input-inset\">\n        <label class=\"item-input-wrapper\">\n            <i class=\"icon ion-ios-search placeholder-icon\"></i>\n            <input type=\"search\" placeholder=\"Busca de produtos\" ng-model=\"query\">\n        </label>\n        <button class=\"button button-clear\" ng-click=\"query = \'\'\">\n            Cancelar\n        </button>\n    </div>\n    <ion-content class=\"has-subheader\">\n        <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n\n        <div class=\"list delivery-list\">\n\n            <div class=\"item item-button-right\">\n                <button class=\"delivery-btn-social-top button button-positive btn-social\">\n                    <i class=\"ion-social-facebook\"></i>Login com Facebook\n                </button>\n            </div>\n            <div class=\"item\">\n                <div class=\"delivery-logo-block\">\n                    <img ng-src=\"{{logoUrl+\'logo-delivery2-compressed.png\'}}\">\n                    <p ng-hide=\"$exposeAside.active\"><span class=\"ion-arrow-left-a\"></span> Acesse o Menu ao lado</p>\n                </div>\n            </div>\n\n        </div>\n\n        <div class=\"card delivery-product-block\">\n            <div class=\"item item-divider\">{{ rootCategoriaSelecionada }}</div>\n            <div class=\"row\">\n                <div class=\"padding text-center\" ng-repeat=\"produto in products | filter: query\">\n                    <div class=\"thumbnail\">\n                        <img ng-src=\"{{ imagesUrl+produto.imagem }}\"\n                             alt=\"Imagem do produto {{ produto.nome }}\"\n                             title=\"Imagem do produto {{ produto.nome }}\">\n                        <h4 class=\"\">{{ produto.valorUnitVenda | currency }}</h4>\n                        <p>{{ produto.nome }}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"list list-inset delivery-product-list\">\n\n            <div class=\"item item-divider\">{{ rootCategoriaSelecionada }}</div>\n\n            <div class=\"item item-thumbnail-left\" ng-repeat=\"produto in products | filter: query\">\n                <img ng-src=\"{{ imagesUrl+produto.imagem }}\"\n                     alt=\"Imagem do produto {{ produto.nome }}\"\n                     title=\"Imagem do produto {{ produto.nome }}\">\n                <h2>{{ produto.nome }}</h2>\n                <p>{{ produto.valorUnitVenda | currency }}</p>\n            </div>\n\n        </div>\n\n    </ion-content>\n</ion-view>");
$templateCache.put("loading.html","<div class=\"loading-container visible active\">\n    <div class=\"loading\">\n        <p>Carregando...</p><ion-spinner></ion-spinner>\n    </div>\n</div>");
$templateCache.put("login.html","<ion-modal-view>\n  <ion-header-bar>\n    <h1 class=\"title\">Login</h1>\n    <div class=\"buttons\">\n      <button class=\"button button-clear\" ng-click=\"closeLogin()\">Close</button>\n    </div>\n  </ion-header-bar>\n  <ion-content>\n    <form ng-submit=\"doLogin()\">\n      <div class=\"list\">\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Username</span>\n          <input type=\"text\" ng-model=\"loginData.username\">\n        </label>\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Password</span>\n          <input type=\"password\" ng-model=\"loginData.password\">\n        </label>\n        <label class=\"item\">\n          <button class=\"button button-block button-positive\" type=\"submit\">Log in</button>\n        </label>\n      </div>\n    </form>\n  </ion-content>\n</ion-modal-view>\n");
$templateCache.put("search.html","<ion-view view-title=\"Search\">\n  <ion-content>\n    <h1>Search</h1>\n  </ion-content>\n</ion-view>\n");}]);
},{}],7:[function(require,module,exports){
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
        'Helpers',
        apiService
    ]);

    function apiService($q, $http, Helpers) {

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
            //params.headers = {
            //    'X-Requested-With': 'XMLHttpRequest'
            //};

            return $http(params)
                .then(function (response) {
                    if (response) {
                        var responseData = (response.data && typeof response.data.Data !== 'undefined') ? response.data.Data : response.data;
                        return params.customCallback ? responseData : Helpers.handleHttpResponse(response);
                    }
                })
                .catch(function (response) {
                    $q.reject('HTTP status: ' + response.status);
                    return params.customCallback ? response.data : Helpers.handleHttpResponse(response);
                });
        }
        return scope;
    }

    module.exports = apiModule;
})();
},{}],8:[function(require,module,exports){
(function () {
    'use strict';

    /* ***************************************************************************
     * ### Common API module ###
     *
     * This is a project common api service. It's used for sending all api requests in the application.
     * It handles success and error response by default, if it's not set custom callback function explicitly.
     */

    /*! */

    var module = angular.module('App.cepDirective');

    module.directive('cepa', function () {
        return {
            restrict: 'C',
            link: function (scope, element, attrs) {
                element.bind('change', function () {
                    console.log(element.val());
                });
            }
        }
    });


    //function cep() {
    //    return {
    //        restrict: 'C',
    //        link: function (scope, element, attrs) {
    //            element.bind('change', function () {
    //                console.log(element.val());
    //                if (element.val().length == (attrs.maxlength)) {
    //                    if ( (parseInt(element.val())<28890000)||((parseInt(element.val())>28899999)) ){
    //                        //element.tooltip({
    //                        //    animation: true,//'fade',
    //                        //    title: "{{ trans('app.angular.cepForaFaixa') }}",
    //                        //    html:true,
    //                        //    trigger: 'manual'//'custom'
    //                        //});
    //                        //element.tooltip('show');
    //                        //element.on('shown.bs.tooltip', function(){
    //                        //    setTimeout(function () {
    //                        //        element.tooltip('destroy');
    //                        //    }, 2000);
    //                        //});
    //                    } else {
    //                        $('input[name=endereco]').empty();
    //                        $('input[name=endereco]').attr("disabled","true");
    //                        $('input[name=bairro]').empty();
    //                        $('input[name=bairro]').attr("disabled","true");
    //                        //$('input[name=cidade]').empty();
    //                        //$('input[name=cidade]').attr("disabled","true");
    //                        //$('input[name=estado]').empty();
    //                        //$('input[name=estado]').attr("disabled","true");
    //
    //                        $('#cep_spinner').attr("class","icon spinner spinner-android ng-show");
    //                        $.get('//viacep.com.br/ws/'+element.val()+'/json/', function (endereco){
    //                            if (endereco['erro']) {
    //                                //element.tooltip({
    //                                //    animation: true,//'fade',
    //                                //    title: "{{ trans('app.angular.cepInvalido') }}",
    //                                //    html:true,
    //                                //    trigger: 'manual'//'custom'
    //                                //});
    //                                //element.tooltip('show');
    //                                //element.on('shown.bs.tooltip', function(){
    //                                //    setTimeout(function () {
    //                                //        element.tooltip('destroy');
    //                                //    }, 2000);
    //                                //});
    //                            }else{
    //                                $('input[name=endereco]').val(endereco['logradouro']);
    //                                $('input[name=bairro]').val(endereco['bairro']);
    //                                //$('input[name=cidade]').val(endereco['localidade']);
    //                                //$('input[name=estado]').val(endereco['uf']);
    //                            }
    //
    //                            $('input[name=endereco]').removeAttr("disabled","true");
    //                            $('input[name=bairro]').removeAttr("disabled","true");
    //                            //$('input[name=cidade]').removeAttr("disabled","true");
    //                            //$('input[name=estado]').removeAttr("disabled","true");
    //                            $('#cep_spinner').attr("class","form-control-feedback ng-hide");
    //                        }).fail(function() {
    //                            $('input[name=endereco]').removeAttr("disabled","true");
    //                            $('input[name=bairro]').removeAttr("disabled","true");
    //                            //$('input[name=cidade]').removeAttr("disabled","true");
    //                            //$('input[name=estado]').removeAttr("disabled","true");
    //                            $('#cep_loading').attr("class","icon spinner spinner-android ng-hide");
    //                            //element.tooltip({
    //                            //    animation: true,//'fade',
    //                            //    title: "{{ trans('app.angular.cepInvalido') }}",
    //                            //    html:true,
    //                            //    trigger: 'manual'//'custom'
    //                            //});
    //                            //element.tooltip('show');
    //                            //element.on('shown.bs.tooltip', function(){
    //                            //    setTimeout(function () {
    //                            //        element.tooltip('destroy');
    //                            //    }, 2000);
    //                            //});
    //                        });
    //                    }
    //
    //                }
    //            });
    //        }
    //    }
    //}

    module.exports = module;
})();
},{}],9:[function(require,module,exports){
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
            handleHttpResponse: _handleHttpResponse
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
            var message = '',
                type = '';
            try {
                message = (response.status && response.status !== 200) ? response.statusText : response.data.message;
                type = response.data.success ? 'success' : 'error';
            } catch (exception) {
                type = 'error';
                message = 'Server error';
            }

            if (message) {
                // Default logic for API responses
            }

            return response;
        };

        return scope;
    };

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
            //console.log('Searching addresses for ' + searchFilter);
            Api.sendRequest({
                    method: "GET",
                    url: AppConfig.servicoCep('RJ/Rio das Ostras/'+searchFilter)
                })
                .then(function(response){
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
                });
        };
        return searchAddress;
    }

    module.exports = helperModule;
})();
},{}]},{},[1]);
