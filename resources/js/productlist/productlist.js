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
            $rootScope.clearSearch();
            $rootScope.loadProducts();
            $rootScope.loadCategoria('Todas');
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