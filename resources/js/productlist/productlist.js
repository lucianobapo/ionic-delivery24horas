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

        $scope.quantidade = [];
        $scope.valor = [];
        $rootScope.valorTotal = 0;
        $scope.products = [];


        $scope.incrementa = function (id) {
            var max = document.getElementById('quantidade['+id+']').attributes['max'].value;
            if ($scope.quantidade[id] < max) {
                $scope.quantidade[id]++;
                $scope.somaTotal();
            }

        };
        $scope.decrementa = function (id) {
            var min = document.getElementById('quantidade['+id+']').attributes['min'].value;
            if ($scope.quantidade[id] > min) {
                $scope.quantidade[id]--;
                $scope.somaTotal();
            }
        };

        $scope.somaTotal = function () {
            $rootScope.valorTotal = 0;
            $scope.quantidade.forEach(function(valor, chave) {
                //console.log($scope.valor[chave]);
                if ($scope.quantidade[chave]>0)
                    $rootScope.valorTotal = $scope.valorTotal + ($scope.valor[chave]*$scope.quantidade[chave]);
            });
        };

        $scope.$watch(function(){
            return $scope.products;
        }, function(value) {
            if ($scope.quantidade.length == 0 && $scope.products.length > 0){
                $scope.products.forEach(function(item) {
                    $scope.quantidade[item.id] = 0;
                    $scope.valor[item.id] = item.valor;
                });
            }
        });

        $rootScope.loadProducts = function (idCategory) {
            //$rootScope.loadProducts(idCategory);

                Api
                .sendRequest({
                    method: "GET",
                    url: AppConfig.apiEndpoint + '/produtosDelivery/'+idCategory
                })
                .then(function(response){
                    $scope.products = response.data.data;

                    //console.log($scope.quant);
                    //$scope.products = aux;
                });
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