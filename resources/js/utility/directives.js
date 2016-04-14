(function () {
    'use strict';

    /* ***************************************************************************
     * ### Common API module ###
     *
     * This is a project common api service. It's used for sending all api requests in the application.
     * It handles success and error response by default, if it's not set custom callback function explicitly.
     */

    /*! */

    var moduleApp = angular.module('App.Directives');

    moduleApp.directive('numbersOnly', [
        'Alerts',
        numbersOnly
    ]);

    function numbersOnly(Alerts) {
        return {
            // atribuímos em forma de classe css nesse caso
            restrict: 'C',
            link: function (scope, element, attrs) {
                // atribuímos o plugin jQuery ao parâmetro `element`
                // nesse caso, o element do DOM que foi bindado a diretiva
                element.on('keypress', function (e) {
                    if (e.which != 13 && e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)){
                        Alerts.numbersOnly();
                        e.preventDefault();
                        return false;
                    }
                });
            }
        }
    }

    moduleApp.directive('cancelEnter', [
        '$rootScope',
        cancelEnter
    ]);

    function cancelEnter($rootScope) {
        return {
            // atribuímos em forma de classe css nesse caso
            restrict: 'C',
            link: function (scope, element, attrs) {
                // atribuímos o plugin jQuery ao parâmetro `element`
                // nesse caso, o element do DOM que foi bindado a diretiva
                element.on('keypress', function (e) {
                    if (e.which == 13){
                        $rootScope.c.debug('Cancelando ação do enter');
                        e.preventDefault();
                        return false;
                    }
                });
            }
        }
    }

    moduleApp.directive('cepKeyUp', [
        '$rootScope',
        'Api',
        'AppConfig',
        'Alerts',
        cepKeyUp
    ]);

    function cepKeyUp($rootScope, Api, AppConfig, Alerts) {
        return {
            // atribuímos em forma de classe css nesse caso
            restrict: 'C',
            link: function (scope, element, attrs) {
                // atribuímos o plugin jQuery ao parâmetro `element`
                // nesse caso, o element do DOM que foi bindado a diretiva
                element.on('keyup', function (e) {
                    if (e.which != 13 && element.val().length == 8) {
                        Api.sendRequest({
                                method: "GET",
                                url: AppConfig.servicoCep($rootScope.cartData.cep)
                            })
                            .then(function(response){
                                if (response.data.erro){
                                    $rootScope.cartData.endereco = '';
                                    $rootScope.cartData.bairro = '';
                                    Alerts.customAlert('CEP inválido', 'CEP '+$rootScope.cartData.cep+' não foi encontrado');
                                } else {
                                    if ($rootScope.cartData.cep<28890000 || $rootScope.cartData.cep>28899999)
                                        Alerts.customAlert('Alerta', 'Não atendemos esta área de CEP '+$rootScope.cartData.cep+'. Somente Rio das Ostras/RJ.');
                                    $rootScope.cartData.endereco = response.data.logradouro;
                                    $rootScope.cartData.bairro = response.data.bairro;
                                }
                            });
                    }
                });
            }
        }
    }

    moduleApp.directive('enderecoKeyUp', [
        '$rootScope',
        'AddressDataService',
        enderecoKeyUp
    ]);

    function enderecoKeyUp($rootScope, AddressDataService) {
        return {
            // atribuímos em forma de classe css nesse caso
            restrict: 'C',
            link: function (scope, element, attrs) {
                // atribuímos o plugin jQuery ao parâmetro `element`
                // nesse caso, o element do DOM que foi bindado a diretiva
                element.on('keyup', function (e) {
                    if (e.which != 13 && element.val().length >2) {
                        AddressDataService.searchAddress(element.val());
                    } else $rootScope.cartData.matches = [];
                });
            }
        }
    }


    moduleApp.directive('setClassWhenAtTop', [
        '$ionicScrollDelegate',
        setClassWhenAtTop
    ]);

    function setClassWhenAtTop($ionicScrollDelegate) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var topClass = attrs.setClassWhenAtTop; // get CSS class from directive's attribute value
                var offsetTop = 60; // get element's offset top relative to document
                //var offsetTop = element.offset().top; // get element's offset top relative to document
                //var offsetTop = $ionicScrollDelegate.getScrollPosition().top; // get element's offset top relative to document

                element.on('scroll', function (e) {
                    //console.log('element Scrolled!');
                    //console.log($ionicScrollDelegate.getScrollPosition().top);
                    if ($ionicScrollDelegate.getScrollPosition().top > offsetTop) {
                        element.addClass(topClass);
                    } else {
                        element.removeClass(topClass);
                    }
                });
            }
        };
    }

    moduleApp.directive('affixWithinContainer', [
        '$document',
        '$ionicScrollDelegate',
        affixWithinContainer
    ]);
    function affixWithinContainer($document, $ionicScrollDelegate) {

        var transition = function(element, dy, executeImmediately) {
            element.style[ionic.CSS.TRANSFORM] == 'translate3d(0, -' + dy + 'px, 0)' ||
            executeImmediately ?
                element.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + dy + 'px, 0)' :
                ionic.requestAnimationFrame(function() {
                    element.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + dy + 'px, 0)';
                });
        };

        return {
            restrict: 'A',
            require: '^$ionicScroll',
            link: function($scope, $element, $attr, $ionicScroll) {
                var $affixContainer = $element.parent();
                //var $affixContainer = $element.closest($attr.affixWithinContainer) || $element.parent();

                var top = 0;
                var offsetTop = 0;
                var height = 0;
                var scrollMin = 0;
                var scrollMax = 0;
                var scrollTransition = 0;
                var affixedHeight = 0;
                var updateScrollLimits = function(newTop) {
                    top = $affixContainer[0].offsetTop;
                    height = $affixContainer[0].offsetHeight;
                    affixedHeight = $element[0].offsetHeight;
                    offsetTop = $element[0].offsetTop + newTop;
                    scrollMin = top;
                    scrollMax = scrollMin + height;
                    scrollTransition = scrollMax - affixedHeight;
                };
                //var updateScrollLimits = _.throttle(function(scrollTop) {
                //    top = $affixContainer.offset().top;
                //    height = $affixContainer.outerHeight(false);
                //    affixedHeight = $element.outerHeight(false);
                //    scrollMin = scrollTop + top;
                //    scrollMax = scrollMin + height;
                //    scrollTransition = scrollMax - affixedHeight;
                //}, 500, {
                //    trailing: false
                //});

                var affix = null;
                var unaffix = null;
                var $affixedClone = null;
                var setupAffix = function() {
                    unaffix = null;
                    affix = function() {
                        var css = {
                            position: 'fixed',
                            top: offsetTop+'px'
                        };
                        $affixedClone = $element.clone().css(css);
                        $ionicScroll.$element.append($affixedClone);

                        setupUnaffix();
                    };
                };
                var cleanupAffix = function() {
                    $affixedClone && $affixedClone.remove();
                    $affixedClone = null;
                };
                var setupUnaffix = function() {
                    affix = null;
                    unaffix = function() {
                        cleanupAffix();
                        setupAffix();
                    };
                };
                $scope.$on('$destroy', cleanupAffix);
                setupAffix();

                var affixedJustNow;
                var scrollTop;
                $ionicScroll.$element.on('scroll', function(event) {
                    offsetTop = (event.detail || event.originalEvent && event.originalEvent.detail).target.offsetTop;
                    scrollTop = (event.detail || event.originalEvent && event.originalEvent.detail).scrollTop;
                    updateScrollLimits(offsetTop);
                    if (scrollTop >= scrollMin && scrollTop <= scrollMax) {
                        affixedJustNow = affix ? affix() || true : false;
                        if (scrollTop > scrollTransition) {
                            transition($affixedClone[0], Math.floor(scrollTop-scrollTransition), affixedJustNow);
                        } else {
                            transition($affixedClone[0], 0, affixedJustNow);
                        }
                    } else {
                        unaffix && unaffix();
                    }
                });
            }
        }
    }

    module.exports = moduleApp;
})();