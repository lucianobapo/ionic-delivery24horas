(function () {
    'use strict';
    /* ***************************************************************************
     * ### Service module ###
     *
     * Contains the utility and helper functions used through whole application.
     */

    var angularModule = angular.module('App.ProductService');

    angularModule.service('Produtos', [
        '$rootScope',
        '$timeout',
        'AppConfig',
        'Api',
        Produtos
    ]);

    /*!
     * Constructor function for all kinds of helper methods used through whole project.
     *
     * @return {object} this
     */
    function Produtos($rootScope, $timeout, AppConfig, Api) {

        var returnObj;
        returnObj = {
            loadMoreItems: _loadMoreItems
        };

        function processResponse(object, clear){
            if (object.data.length>0){
                object.data.forEach(function(item) {
                    if ($rootScope.quantidade[item.id]==undefined){
                        $rootScope.max[item.id] = item.max;
                        $rootScope.quantidade[item.id] = 0;
                        $rootScope.valor[item.id] = item.valor;
                    }
                });

                if (clear) $rootScope.products=(object.data);
                else $rootScope.products=$rootScope.products.concat(object.data);

                $rootScope.totalProducts=object.data[0].totalProducts;
            } else $rootScope.noMoreItemsAvailable();
        }
        /*
         * ### *Public methods* ###
         */

        function _loadMoreItems(clearItems, idCategory, begin, end) {
            if ($rootScope.productLastItemLoaded===undefined)
                begin=$rootScope.products.length;
            else begin=$rootScope.productLastItemLoaded;

            if (clearItems) begin=0;

            if (end===undefined) end=10;
            $rootScope.productLastItemLoaded = begin+end;

            if (idCategory===undefined) idCategory='todas';
            else $rootScope.lastCategory = idCategory;

            $rootScope.rootCategoriaAntiga = undefined;
            $rootScope.clearSearch();

            $rootScope.c.debug('Loading More Produtos...');

            var urlProducts;
            if (AppConfig.enableInfiniteScroll)
                urlProducts = AppConfig.apiEndpoint + '/produtosDelivery/'+idCategory+'/'+begin+'/'+end;
            else
                urlProducts = AppConfig.apiEndpoint + '/produtosDelivery/'+idCategory;
            Api.sendRequest({
                    method: "GET",
                    url: urlProducts
                })
                .then(function(response){
                    processResponse(response.data, clearItems);
                    $rootScope.$broadcast('scroll.infiniteScrollComplete');
                });
        }

        return returnObj;
    }

    module.exports = angularModule;
})();