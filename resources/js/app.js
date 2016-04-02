(function () {
    'use strict';

    angular.module('App.Config', []);
    angular.module('App.Helpers', []);
    angular.module('App.Common', []);
    angular.module('App.Api', []);
    //angular.module('App.Playlist', []);
    angular.module('App.ProductList', []);
    angular.module('App.Report', []);
    angular.module('templates', []);

    //require('./common/config');
    require('./config-build');
    require('./utility/helpers');
    require('./utility/api');
    require('./common/common');
    //require('./playlist/playlist');
    require('./productlist/productlist');
    require('./report/report');
    //require('./utility/templates');
    require('./templates-build');

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

            $httpProvider.interceptors.push('loadingMarker');
        }
    ]);

    appModule.service('loadingMarker', function($rootScope) {
        var service = this;

        service.request = function(config) {
            $rootScope.$broadcast('loading:show');
            return config;
        };

        service.response = function(response) {
            $rootScope.$broadcast('loading:hide');
            return response;
        };
    });

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