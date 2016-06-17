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
            goVersion: _goVersion,
            check: _check
        };

        function _goHome() {
            if ($rootScope.handhelds)
                $location.path($rootScope.handheldsUrl);
            if ($rootScope.minMediumScreens)
                $location.path($rootScope.minMediumScreensUrl);
        }

        function _goVersion() {
            $location.path('/version');
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
                        if ($location.path().indexOf("/version")===-1){
                            $rootScope.c.debug('Redirecting to: '+$rootScope.handheldsUrl);
                            $location.path($rootScope.handheldsUrl);
                        }
                    }
                } else {
                    $rootScope.handhelds = false;
                    $rootScope.minMediumScreens = true;
                    if ($location.path()=="" || $location.path().indexOf("/tab")!==-1) {
                        if ($location.path().indexOf("/version")===-1){
                            $rootScope.c.debug('Redirecting to: ' + $rootScope.minMediumScreensUrl);
                            $location.path($rootScope.minMediumScreensUrl);
                        }
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