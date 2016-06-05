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
        'UserService',
        bodyController
    ]);
    function bodyController($scope, $rootScope, $ionicModal, CartService, Categorias, Layout, Facebook, AppConfig, UserService) {
        $rootScope.CartService = CartService;
        $rootScope.CartService.initCart();
        Categorias.loadItems();
        Layout.check();
        UserService.initUser();

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