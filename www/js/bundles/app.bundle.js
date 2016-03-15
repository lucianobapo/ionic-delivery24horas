(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('App.Config', []);
    angular.module('App.Helpers', []);
    angular.module('App.Common', []);
    angular.module('App.Api', []);
    //angular.module('App.Playlist', []);
    angular.module('App.ProductList', []);
    angular.module('templates', []);

    require('./common/config');
    require('./utility/helpers');
    require('./utility/api');
    require('./common/common');
    //require('./playlist/playlist');
    require('./productlist/productlist');
    require('./utility/templates');

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
        'templates'
    ]);

    appModule.config([
        '$stateProvider',
        '$urlRouterProvider',

        function ($stateProvider, $urlRouterProvider) {
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

                //.state('app.browse', {
                //    url: '/browse',
                //    views: {
                //        'menuContent': {
                //            templateUrl: 'browse.html'
                //        }
                //    }
                //})

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
        }
    ]);

    appModule.config(function($httpProvider) {
        $httpProvider.interceptors.push(function($rootScope) {
            return {
                request: function(config) {
                    $rootScope.$broadcast('loading:show');
                    return config;
                },
                response: function(response) {
                    $rootScope.$broadcast('loading:hide');
                    return response;
                }
            }
        });
    });

    appModule.run(function($rootScope, $ionicLoading) {
        $rootScope.$on('loading:show', function() {
            $ionicLoading.show({template: "<p>Carregando...</p><ion-spinner></ion-spinner>"});
        });

        $rootScope.$on('loading:hide', function() {
            $ionicLoading.hide();
        });
    });

    appModule.run([
        '$ionicPlatform',
        appMain
    ]);

    function appMain($ionicPlatform) {
        $ionicPlatform.ready(function () {
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
},{"./common/common":2,"./common/config":3,"./productlist/productlist":4,"./utility/api":5,"./utility/helpers":6,"./utility/templates":7}],2:[function(require,module,exports){
(function () {
    'use strict';

    var commonModule = angular.module('App.Common');

    commonModule.controller('CommonCtrl', [
        '$scope',
        '$rootScope',
        '$ionicModal',
        '$timeout',
        //'$state',
        'AppConfig',
        'Api',
        //'Helpers',
        commonCtrl
    ]);

    function commonCtrl($scope, $rootScope, $ionicModal, $timeout, /*$state, */AppConfig, Api/*, Helpers*/) {

        $rootScope.rootCategoriaSelecionada = 'Todas';
        $rootScope.loadCategoria = function ($nome) {
            $rootScope.rootCategoriaSelecionada = $nome;
        };

        $scope.loadItems = function () {
            //$rootScope.loadCategories();
            Api
                .sendRequest({
                    method: "GET",
                    url: AppConfig.apiEndpoint + '/categorias'
                })
                .then(function(response){
                    $scope.categorias = response.data;
                });
        };

        $scope.doRefresh = function () {
            $scope.loadItems();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };

        $scope.loadItems();

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
        apiEndpoint: 'http://api.delivery24horas.com/json',
        imagesUrl: 'https://s3.amazonaws.com/delivery-images/images/',
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
            productListCtrl
        ]);

    function productListCtrl($scope, $rootScope, AppConfig, Api) {
        console.debug('ProductList Controller: ', $scope.commonArray);

        $scope.logoUrl = AppConfig.logoUrl;
        $scope.imagesUrl = AppConfig.imagesUrl;

        $rootScope.loadProducts = function (idCategory) {
            //$rootScope.loadProducts(idCategory);
            Api
                .sendRequest({
                    method: "GET",
                    url: AppConfig.apiEndpoint + '/produtosDelivery/'+idCategory
                })
                .then(function(response){
                    $scope.products = response.data;
                });
        };

        $scope.doRefresh = function () {
            $rootScope.loadProducts();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };
        $rootScope.loadProducts();
    }

    module.exports = productListModule;
})();
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
    }

    module.exports = helperModule;
})();
},{}],7:[function(require,module,exports){
angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("common/templates/menu.html","<ion-side-menus enable-menu-with-back-views=\"false\">\n    <ion-side-menu-content>\n        <ion-nav-bar class=\"bar-stable\">\n            <ion-nav-back-button></ion-nav-back-button>\n            <ion-nav-buttons side=\"left\">\n                <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"left\"\n                        ng-hide=\"$exposeAside.active\"></button>\n                <div class=\"delivery-bar-title title\">delivery24horas.com</div>\n            </ion-nav-buttons>\n            <ion-nav-buttons side=\"right\">\n                <button class=\"delivery-btn-social-header button button-positive btn-social\">\n                    <i class=\"ion-social-facebook\"></i>Login com Facebook\n                </button>\n\n                <button class=\"button button-clear\">\n                    <i class=\"ion-android-cart\"></i> (Vazio)\n                </button>\n            </ion-nav-buttons>\n        </ion-nav-bar>\n        <ion-nav-view name=\"menuContent\"></ion-nav-view>\n    </ion-side-menu-content>\n\n    <ion-side-menu expose-aside-when=\"large\">\n        <ion-header-bar class=\"bar-stable\">\n            <h1 class=\"title\">Menu</h1>\n        </ion-header-bar>\n        <ion-content>\n            <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n            <div class=\"list list-inset\">\n                <div class=\"item item-divider\">Categorias</div>\n\n                <a href=\"#/event/home\" class=\"item item-icon-left\"\n                   menu-close ng-click=\"loadCategoria(\'Todas\');loadProducts()\">\n                    <i class=\"icon ion-beer\"></i>\n                    Todas\n                </a>\n                <a ng-repeat=\"item in categorias\" href=\"#/event/home\" class=\"item item-icon-left\"\n                   menu-close ng-click=\"loadCategoria(item.nome);loadProducts(item.id)\">\n                    <i class=\"{{ item.icon }}\"></i>\n                    {{ item.nome }}\n                </a>\n\n                <div class=\"item item-divider\">Minha conta</div>\n                <div class=\"item\">Meus Dados</div>\n                <div class=\"item\">Trocar Senha</div>\n                <div class=\"item\">Sair</div>\n\n            </div>\n        </ion-content>\n    </ion-side-menu>\n</ion-side-menus>");
$templateCache.put("productlist/templates/productlist.html","<ion-view view-title=\"\">\n    <div class=\"bar bar-subheader item-input-inset\">\n        <label class=\"item-input-wrapper\">\n            <i class=\"icon ion-ios-search placeholder-icon\"></i>\n            <input type=\"search\" placeholder=\"Busca de produtos\" ng-model=\"query\">\n        </label>\n        <button class=\"button button-clear\" ng-click=\"query = \'\'\">\n            Cancelar\n        </button>\n    </div>\n    <ion-content class=\"has-subheader\">\n        <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n\n        <div class=\"list delivery-list\">\n\n            <div class=\"item item-button-right\">\n                <button class=\"delivery-btn-social-top button button-positive btn-social\">\n                    <i class=\"ion-social-facebook\"></i>Login com Facebook\n                </button>\n            </div>\n            <div class=\"item\">\n                <div class=\"delivery-logo-block\">\n                    <img ng-src=\"{{logoUrl+\'logo-delivery2-compressed.png\'}}\">\n                    <p ng-hide=\"$exposeAside.active\"><span class=\"ion-arrow-left-a\"></span> Acesse o Menu ao lado</p>\n                </div>\n            </div>\n\n        </div>\n\n        <div class=\"card delivery-product-block\">\n            <div class=\"item item-divider\">{{ rootCategoriaSelecionada }}</div>\n            <div class=\"row\">\n                <div class=\"padding text-center\" ng-repeat=\"produto in products | filter: query\">\n                    <div class=\"thumbnail\">\n                        <img ng-src=\"{{ imagesUrl+produto.imagem }}\"\n                             alt=\"Imagem do produto {{ produto.nome }}\"\n                             title=\"Imagem do produto {{ produto.nome }}\">\n                        <h4 class=\"\">{{ produto.valorUnitVenda | currency }}</h4>\n                        <p>{{ produto.nome }}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"list list-inset delivery-product-list\">\n\n            <div class=\"item item-divider\">{{ rootCategoriaSelecionada }}</div>\n\n            <div class=\"item item-thumbnail-left\" ng-repeat=\"produto in products | filter: query\">\n                <img ng-src=\"{{ imagesUrl+produto.imagem }}\"\n                     alt=\"Imagem do produto {{ produto.nome }}\"\n                     title=\"Imagem do produto {{ produto.nome }}\">\n                <h2>{{ produto.nome }}</h2>\n                <p>{{ produto.valorUnitVenda | currency }}</p>\n            </div>\n\n        </div>\n    </ion-content>\n</ion-view>");
$templateCache.put("browse.html","<ion-view view-title=\"Browse\">\n  <ion-content>\n    <h1>Browse</h1>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("home.html","<ion-view view-title=\"\" ng-controller=\"ProductsCtrl\">\n    <div class=\"bar bar-subheader item-input-inset\">\n        <label class=\"item-input-wrapper\">\n            <i class=\"icon ion-ios-search placeholder-icon\"></i>\n            <input type=\"search\" placeholder=\"Busca de produtos\" ng-model=\"query\">\n        </label>\n        <button class=\"button button-clear\" ng-click=\"query = \'\'\">\n            Cancelar\n        </button>\n    </div>\n    <ion-content class=\"has-subheader\">\n        <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n\n        <div class=\"list delivery-list\">\n\n            <div class=\"item item-button-right\">\n                <button class=\"delivery-btn-social-top button button-positive btn-social\">\n                    <i class=\"ion-social-facebook\"></i>Login com Facebook\n                </button>\n            </div>\n            <div class=\"item\">\n                <div class=\"delivery-logo-block\">\n                    <img ng-src=\"{{logoUrl+\'logo-delivery2-compressed.png\'}}\">\n                    <p ng-hide=\"$exposeAside.active\"><span class=\"ion-arrow-left-a\"></span> Acesse o Menu ao lado</p>\n                </div>\n            </div>\n\n        </div>\n\n        <div class=\"card delivery-product-block\">\n            <div class=\"item item-divider\">{{ rootCategoriaSelecionada }}</div>\n            <div class=\"row\">\n                <div class=\"padding text-center\" ng-repeat=\"produto in products | filter: query\">\n                    <div class=\"thumbnail\">\n                        <img ng-src=\"{{ imagesUrl+produto.imagem }}\"\n                             alt=\"Imagem do produto {{ produto.nome }}\"\n                             title=\"Imagem do produto {{ produto.nome }}\">\n                        <h4 class=\"\">{{ produto.valorUnitVenda | currency }}</h4>\n                        <p>{{ produto.nome }}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"list list-inset delivery-product-list\">\n\n            <div class=\"item item-divider\">{{ rootCategoriaSelecionada }}</div>\n\n            <div class=\"item item-thumbnail-left\" ng-repeat=\"produto in products | filter: query\">\n                <img ng-src=\"{{ imagesUrl+produto.imagem }}\"\n                     alt=\"Imagem do produto {{ produto.nome }}\"\n                     title=\"Imagem do produto {{ produto.nome }}\">\n                <h2>{{ produto.nome }}</h2>\n                <p>{{ produto.valorUnitVenda | currency }}</p>\n            </div>\n\n        </div>\n\n    </ion-content>\n</ion-view>");
$templateCache.put("login.html","<ion-modal-view>\n  <ion-header-bar>\n    <h1 class=\"title\">Login</h1>\n    <div class=\"buttons\">\n      <button class=\"button button-clear\" ng-click=\"closeLogin()\">Close</button>\n    </div>\n  </ion-header-bar>\n  <ion-content>\n    <form ng-submit=\"doLogin()\">\n      <div class=\"list\">\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Username</span>\n          <input type=\"text\" ng-model=\"loginData.username\">\n        </label>\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Password</span>\n          <input type=\"password\" ng-model=\"loginData.password\">\n        </label>\n        <label class=\"item\">\n          <button class=\"button button-block button-positive\" type=\"submit\">Log in</button>\n        </label>\n      </div>\n    </form>\n  </ion-content>\n</ion-modal-view>\n");
$templateCache.put("search.html","<ion-view view-title=\"Search\">\n  <ion-content>\n    <h1>Search</h1>\n  </ion-content>\n</ion-view>\n");}]);
},{}]},{},[1]);
