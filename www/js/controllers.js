angular.module('starter.controllers', [])
    .controller('MainCtrl', function ($scope, $ionicSideMenuDelegate, $rootScope, Products, Categories) {
        $rootScope.$watch(
            function () {
                return Products.productsCheck();
            },
            function (newVal, oldVal) {
                if (typeof newVal !== 'undefined') {
                    $rootScope.products = Products.productsCheck();
                }
            }
        );

        $scope.$watch(
            function () {
                return Categories.categoriesCheck();
            },
            function (newVal, oldVal) {
                if (typeof newVal !== 'undefined') {
                    $rootScope.categorias = Categories.categoriesCheck();
                }
            }
        );

        $rootScope.rootCategoriaSelecionada = 'Todas';

        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $rootScope.loadCategoria = function ($nome) {
            $rootScope.rootCategoriaSelecionada = $nome;
        };

        $rootScope.loadProducts = function (idCategory) {
            if (typeof idCategory == 'undefined') idCategory = 'todas';
            Products.get(idCategory);
        };

        $rootScope.loadCategories = function () {
            Categories.all();
        };

    })

    .controller('CategoriesCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.loadItems = function () {
            $rootScope.loadCategories();
        };

        $scope.doRefresh = function () {
            $scope.loadItems();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };

        $scope.loadItems();
    }])

    .controller('ProductsCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.loadItems = function (idCategory) {
            $rootScope.loadProducts(idCategory);
        };

        $scope.doRefresh = function () {
            $scope.loadItems();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };
        $scope.loadItems();
    }]);
