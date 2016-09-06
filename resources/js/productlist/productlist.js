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

        $scope.returnAlert = false;
        $scope.logoUrl = AppConfig.logoUrl;
        $scope.imagesUrl = AppConfig.imagesUrl;

        $rootScope.cartItems = [];
        $rootScope.quantidade = [];
        $rootScope.max = [];
        $rootScope.valor = [];
        $rootScope.valorTotal = 0;
        $rootScope.products = [];

        $scope.noMoreItemsAvailable = false;
        $scope.enableInfiniteScroll = AppConfig.enableInfiniteScroll;

        $rootScope.removeItem = function (id) {
            if ($rootScope.quantidade[id] > 0) {
                $rootScope.quantidade[id]=0;
            }
            var tempCartItems = [];
            $rootScope.cartItems.forEach(function(item, chave) {
                if (item.id!=id) tempCartItems.push(item);
            });
            $rootScope.cartItems = tempCartItems;
            $scope.somaTotal();
        };

        $rootScope.removeTodosItens = function () {
            $rootScope.quantidade.forEach(function(valor, chave) {
                if ($rootScope.quantidade[chave] > 0) {
                    $rootScope.quantidade[chave]=0;
                }
            });
            $rootScope.cartItems = [];
            $scope.somaTotal();
        };

        $scope.updateCartItem = function (id) {
            var cartItemSelected = $scope.searchCartItemById(id);
            if (cartItemSelected===false) {
                var productSelected = $scope.searchProductById(id);
                if (productSelected !==false ) {
                    $rootScope.cartItems.push({
                        id: productSelected.id,
                        nome: productSelected.nome,
                        quantidade: $rootScope.quantidade[id],
                        valor: productSelected.valor
                    });
                }
            } else {
                $rootScope.cartItems.forEach(function(item, chave) {
                    if (item.id==id)
                        item.quantidade = $rootScope.quantidade[id];
                });
            }

            $scope.somaTotal();
        };
        $scope.incrementa = function (id) {
            if ($rootScope.quantidade[id] < $rootScope.max[id]) {
                $rootScope.quantidade[id]++;
                $scope.updateCartItem(id);
            }
        };
        $scope.decrementa = function (id) {
            if ($rootScope.quantidade[id] > 1) {
                $rootScope.quantidade[id]--;
                $scope.updateCartItem(id);
            }else if ($rootScope.quantidade[id] == 1) {
                $scope.removeItem(id);
            }
        };

        $scope.rangeChange = function (id) {
            if ($rootScope.quantidade[id] > 0) {
                $scope.updateCartItem(id);
            }else if ($rootScope.quantidade[id] == 0) {
                $scope.removeItem(id);
            }
        }
;
        $scope.somaTotal = function () {
            $rootScope.valorTotal = 0;

            $rootScope.cartItems.forEach(function(item, chave) {
                $rootScope.valorTotal = $rootScope.valorTotal +
                    (item.valor*item.quantidade);
            });
        };

        $scope.searchProductById = function (id) {
            var result = false;
            $rootScope.products.forEach(function(item) {
                if (item.id==id) result = item;
            });
            return result;
        };

        $scope.searchCartItemById = function (id) {
            var result = false;
            $rootScope.cartItems.forEach(function(item) {
                if (item.id==id) result = item;
            });
            return result;
        };

        $rootScope.clearSearch = function () {
            $scope.query='';
            $scope.noMoreItemsAvailable = false;
        };

        $scope.$watch(function(){
            return $scope.query;
        }, function(value) {
            if ($scope.query && $scope.query.length>0){
                $scope.noMoreItemsAvailable = true;
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

        $rootScope.noMoreItemsAvailable = function () {
            $scope.noMoreItemsAvailable = true;
        };
        $rootScope.loadProducts = function (idCategory) {
            $scope.noMoreItemsAvailable = false;
            Produtos.loadMoreItems(true, idCategory);
        };

        $scope.loadMoreData = function () {
            if ($rootScope.lastCategory!=undefined)
                Produtos.loadMoreItems(false, $rootScope.lastCategory);
            else
                Produtos.loadMoreItems();
            if ($rootScope.products.length>=$rootScope.totalProducts)
                $scope.noMoreItemsAvailable = true;
        };

        $scope.doRefresh = function () {
            $rootScope.clearSearch();
            $rootScope.loadProducts();
            $rootScope.loadCategoria('Todas');
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };

        if(!$scope.enableInfiniteScroll) Produtos.loadMoreItems();

        $scope.prepareImage = function (img) {
            if (img==null || AppConfig.debug) return 'http://placehold.it/80x80';
            return AppConfig.imagesUrl+img;
        };
    }

    module.exports = productListModule;
})();