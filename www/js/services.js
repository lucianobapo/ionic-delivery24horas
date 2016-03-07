angular.module('starter.services', [])
    .factory('Categories', function (CategoriesApi) {
        var categories = '';
        return {
            categoriesCheck: function(){
                return categories;
            },
            all: function () {
                CategoriesApi
                    .get()
                    .success(function (data) {
                        categories = data;
                    });
            }
        };
    })
    .factory('Products', function (ProductsApi) {
        var products = '';
        return {
            productsCheck: function(){
                return products;
            },
            all: function () {
                ProductsApi
                    .get()
                    .success(function (data) {
                        products = data;
                    });
            },
            get: function (param) {
                ProductsApi
                    .get(param)
                    .success(function (data) {
                        products = data;
                    });
            }
        };
    });
