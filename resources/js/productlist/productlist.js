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