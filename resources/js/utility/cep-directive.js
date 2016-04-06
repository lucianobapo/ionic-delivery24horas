(function () {
    'use strict';

    /* ***************************************************************************
     * ### Common API module ###
     *
     * This is a project common api service. It's used for sending all api requests in the application.
     * It handles success and error response by default, if it's not set custom callback function explicitly.
     */

    /*! */

    var module = angular.module('App.cepDirective');

    module.directive('cepa', function () {
        return {
            restrict: 'C',
            link: function (scope, element, attrs) {
                element.bind('change', function () {
                    console.log(element.val());
                });
            }
        }
    });


    //function cep() {
    //    return {
    //        restrict: 'C',
    //        link: function (scope, element, attrs) {
    //            element.bind('change', function () {
    //                console.log(element.val());
    //                if (element.val().length == (attrs.maxlength)) {
    //                    if ( (parseInt(element.val())<28890000)||((parseInt(element.val())>28899999)) ){
    //                        //element.tooltip({
    //                        //    animation: true,//'fade',
    //                        //    title: "{{ trans('app.angular.cepForaFaixa') }}",
    //                        //    html:true,
    //                        //    trigger: 'manual'//'custom'
    //                        //});
    //                        //element.tooltip('show');
    //                        //element.on('shown.bs.tooltip', function(){
    //                        //    setTimeout(function () {
    //                        //        element.tooltip('destroy');
    //                        //    }, 2000);
    //                        //});
    //                    } else {
    //                        $('input[name=endereco]').empty();
    //                        $('input[name=endereco]').attr("disabled","true");
    //                        $('input[name=bairro]').empty();
    //                        $('input[name=bairro]').attr("disabled","true");
    //                        //$('input[name=cidade]').empty();
    //                        //$('input[name=cidade]').attr("disabled","true");
    //                        //$('input[name=estado]').empty();
    //                        //$('input[name=estado]').attr("disabled","true");
    //
    //                        $('#cep_spinner').attr("class","icon spinner spinner-android ng-show");
    //                        $.get('//viacep.com.br/ws/'+element.val()+'/json/', function (endereco){
    //                            if (endereco['erro']) {
    //                                //element.tooltip({
    //                                //    animation: true,//'fade',
    //                                //    title: "{{ trans('app.angular.cepInvalido') }}",
    //                                //    html:true,
    //                                //    trigger: 'manual'//'custom'
    //                                //});
    //                                //element.tooltip('show');
    //                                //element.on('shown.bs.tooltip', function(){
    //                                //    setTimeout(function () {
    //                                //        element.tooltip('destroy');
    //                                //    }, 2000);
    //                                //});
    //                            }else{
    //                                $('input[name=endereco]').val(endereco['logradouro']);
    //                                $('input[name=bairro]').val(endereco['bairro']);
    //                                //$('input[name=cidade]').val(endereco['localidade']);
    //                                //$('input[name=estado]').val(endereco['uf']);
    //                            }
    //
    //                            $('input[name=endereco]').removeAttr("disabled","true");
    //                            $('input[name=bairro]').removeAttr("disabled","true");
    //                            //$('input[name=cidade]').removeAttr("disabled","true");
    //                            //$('input[name=estado]').removeAttr("disabled","true");
    //                            $('#cep_spinner').attr("class","form-control-feedback ng-hide");
    //                        }).fail(function() {
    //                            $('input[name=endereco]').removeAttr("disabled","true");
    //                            $('input[name=bairro]').removeAttr("disabled","true");
    //                            //$('input[name=cidade]').removeAttr("disabled","true");
    //                            //$('input[name=estado]').removeAttr("disabled","true");
    //                            $('#cep_loading').attr("class","icon spinner spinner-android ng-hide");
    //                            //element.tooltip({
    //                            //    animation: true,//'fade',
    //                            //    title: "{{ trans('app.angular.cepInvalido') }}",
    //                            //    html:true,
    //                            //    trigger: 'manual'//'custom'
    //                            //});
    //                            //element.tooltip('show');
    //                            //element.on('shown.bs.tooltip', function(){
    //                            //    setTimeout(function () {
    //                            //        element.tooltip('destroy');
    //                            //    }, 2000);
    //                            //});
    //                        });
    //                    }
    //
    //                }
    //            });
    //        }
    //    }
    //}

    module.exports = module;
})();