angular.module('starter.servicesApis', [])
    .factory('jsonApi', function ($http) {
        function get(url) {
            var path = jsonApiUrl+url;
            return $http.get(path);
        }
        return {
            get: get
        };
    })
    .factory('CategoriesApi', function (jsonApi) {
        function get() {
            return jsonApi.get('/json/categorias');
        }
        return {
            get: get
        };
    })

    .factory('ProductsApi', function (jsonApi) {
        function get(param) {
            return jsonApi.get('/json/produtosDelivery/'+param);
        }
        return {
            get: get
        };
    });
