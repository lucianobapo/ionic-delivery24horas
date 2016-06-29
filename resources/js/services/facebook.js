(function () {
    'use strict';
    /* ***************************************************************************
     * ### FacebookService module ###
     *
     * Contains the utility and helper functions used through whole application.
     */

    var angularModule = angular.module('App.FacebookService');

    angularModule.service('Facebook', [
        '$window',
        'AppConfig',
        '$rootScope',
        'UserService',
        'Layout',
        '$ionicLoading',
        '$q',
        '$ionicActionSheet',
        'CartService',
        Facebook
    ]);

    function Facebook($window, AppConfig, $rootScope, UserService, Layout, $ionicLoading, $q, $ionicActionSheet, CartService) {
        var returnObj;
        returnObj = {
            initCordova: _initCordova,
            init: _init
        };
        var fbLogin;
        var fbLogout;

        //$rootScope.user = undefined;
        $rootScope.facebookLoginButtonText = 'Login Facebook';
        $rootScope.facebookLoginButtonDisabled = false;
        $rootScope.facebookLogoutButtonText = 'Sair';
        $rootScope.facebookLogoutButtonDisabled = false;

        function endLoginProcess(){
            Layout.goHome();
            $ionicLoading.hide();
            $rootScope.facebookLoginButtonText = 'Login Facebook';
            $rootScope.facebookLoginButtonDisabled = false;
            $rootScope.facebookLogoutButtonText = 'Sair';
            $rootScope.facebookLogoutButtonDisabled = false;
        }

        function setUserFields(apiResponse, authResponse){
            var fields = {
                authResponse: authResponse,
                userID: apiResponse.id,
                name: apiResponse.name,
                userEmail: apiResponse.email,
                picture : "https://graph.facebook.com/" + apiResponse.id + "/picture?type=small"
            };
            if (apiResponse.age_range!=undefined) fields.minAge = apiResponse.age_range.min;
            if (apiResponse.birthday!=undefined) fields.birthday = apiResponse.birthday;
            UserService.processUserFieldsFromFacebook(fields);

        }

        function _initCordova() {
            fbLogin = function(){
                facebookConnectPlugin.getLoginStatus(function(success){
                    if(success.status === 'connected'){
                        // The user is logged in and has authenticated your app, and response.authResponse supplies
                        // the user's ID, a valid access token, a signed request, and the time the access token
                        // and signed request each expire
                        $rootScope.c.debug('getLoginStatus', success.status);
                        fbLoginSuccess(success);
                    } else if(success.status === 'not_authorized'){
                        $rootScope.c.debug('getLoginStatus', success.status);
                    } else {
                        // If (success.status === 'not_authorized') the user is logged in to Facebook,
                        // but has not authenticated your app
                        // Else the person is not logged into Facebook,
                        // so we're not sure if they are logged into this app or not.
                        $rootScope.c.debug('getLoginStatus', success.status);
                        $ionicLoading.show({
                            template: 'Logging in...'
                        });
                        // Ask the permissions you need. You can learn more about
                        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
                        facebookConnectPlugin.login(['user_birthday', 'email', 'public_profile'], fbLoginSuccess, fbLoginError);
                    }
                });
            };

            fbLogout = function(){
                $ionicLoading.show({
                    template: 'Logging out...'
                });
                // Facebook logout
                facebookConnectPlugin.logout(function(response){
                        $rootScope.c.debug('facebookConnectPlugin logout', response);
                        endLoginProcess();
                    },
                    function(fail){
                        $rootScope.c.debug('facebookConnectPlugin logout failed', fail);
                        endLoginProcess();
                    });
            };

            // This is the success callback from the login method
            var fbLoginSuccess = function(response) {
                if (!response.authResponse){
                    fbLoginError("Cannot find the authResponse");
                    return;
                }

                var authResponse = response.authResponse;

                $rootScope.c.debug('getFacebookProfileInfo');
                getFacebookProfileInfo(authResponse)
                    .then(function(profileInfo) {
                        // For the purpose of this example I will store user data on local storage
                        setUserFields(profileInfo, authResponse);
                        endLoginProcess();
                    }, function(fail){
                        // Fail get profile info
                        $rootScope.c.debug('profile info fail', fail);
                        endLoginProcess();
                    });
            };

            // This is the fail callback from the login method
            var fbLoginError = function(error){
                $rootScope.c.debug('fbLoginError', error);
                endLoginProcess();
            };

            // This method is to get the user profile info from the facebook api
            var getFacebookProfileInfo = function (authResponse) {
                var info = $q.defer();
                facebookConnectPlugin.api('/me?fields=birthday,email,name,age_range&access_token=' + authResponse.accessToken, null,
                    function (response) {
                        $rootScope.c.debug(response);
                        info.resolve(response);
                    },
                    function (response) {
                        $rootScope.c.debug(response);
                        info.reject(response);
                    }
                );
                return info.promise;
            };
        }

        function _init() {
            // Load the SDK asynchronously
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.6&appId="+AppConfig.facebookID;
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            fbLogin = function(){
                FB.getLoginStatus(function(response) {
                    $rootScope.c.debug('FB.getLoginStatus', response);
                    if (response.status === 'connected') {
                        $rootScope.c.debug('Logged in.');
                        statusChangeCallback(response);
                    }
                    else {
                        $ionicLoading.show({
                            template: 'Logging in...'
                        });
                        FB.login(function(response) {
                            // user is now logged in
                            $rootScope.c.debug('FB.login', response);
                            endLoginProcess();
                        });
                    }
                });
            };

            fbLogout = function(){
                FB.getLoginStatus(function(response) {
                    $rootScope.c.debug('FB.getLoginStatus', response);
                    if (response.status === 'connected') {
                        $ionicLoading.show({
                            template: 'Logging out...'
                        });
                        FB.logout(function(response) {
                            // user is now logged out
                            $rootScope.c.debug('FB.logout', response);
                            endLoginProcess();
                        });
                    }
                });
            };

            // This is called with the results from from FB.getLoginStatus().
            var statusChangeCallback = function(response) {
                $rootScope.c.debug('statusChangeCallback');
                $rootScope.c.debug(response);
                // The response object is returned with a status field that lets the
                // app know the current login status of the person.
                // Full docs on the response object can be found in the documentation
                // for FB.getLoginStatus().
                if (response.status === 'connected') {
                    // Logged into your app and Facebook.
                    //testAPI();
                    $ionicLoading.show({
                        template: 'Logging in...'
                    });
                    var authResponse = response.authResponse;
                    $rootScope.c.debug('Welcome!  Fetching your information.... ');
                    FB.api('/me?fields=birthday,email,name,age_range&access_token=' + authResponse.accessToken, function(apiResponse) {
                        setUserFields(apiResponse, authResponse);
                        endLoginProcess();
                    });
                } else if (response.status === 'not_authorized') {
                    // The person is logged into Facebook, but not your app.
                    $rootScope.c.debug('not_authorized');
                    //document.getElementById('status').innerHTML = 'Please log ' +
                    //    'into this app.';
                } else {
                    // The person is not logged into Facebook, so we're not sure if
                    // they are logged into this app or not.
                    $rootScope.c.debug('status else',response.status);
                    UserService.setUser();
                    $rootScope.user = null;
                    endLoginProcess();

                    //document.getElementById('status').innerHTML = 'Please log ' +
                    //    'into Facebook.';
                }
            };

            $window.fbAsyncInit = function(){
                // Executed when the SDK is loaded
                FB.init({
                    /*
                     The app id of the web app;
                     To register a new app visit Facebook App Dashboard
                     ( https://developers.facebook.com/apps/ )
                     */
                    appId: AppConfig.facebookID,

                    /*
                     Adding a Channel File improves the performance
                     of the javascript SDK, by addressing issues
                     with cross-domain communication in certain browsers.
                     */
                    //channelUrl: 'app/channel.html',

                    /*
                     Set if you want to check the authentication status
                     at the start up of the app
                     */
                    status: false,

                    /*
                     Enable cookies to allow the server to access
                     the session
                     */
                    cookie: true,

                    /* Parse XFBML */
                    xfbml: true,

                    version    : 'v2.6' // use version 2.2
                });

                FB.Event.subscribe('auth.authResponseChange', function(response) {
                    statusChangeCallback(response);
                });
            };
        }

        //This method is executed when the user press the "Login with facebook" button
        $rootScope.facebookLogIn = function() {
            $rootScope.facebookLoginButtonText = 'Processando...';
            $rootScope.facebookLoginButtonDisabled = true;
            $rootScope.c.debug('clicked facebookLogIn');
            fbLogin();
        };

        //This method is executed when the user press the "Logout" button
        $rootScope.facebookLogOut = function() {
            $rootScope.facebookLogoutButtonText = 'Processando...';
            $rootScope.facebookLogoutButtonDisabled = true;
            $rootScope.c.debug('clicked facebookLogOut');
            var hideSheet = $ionicActionSheet.show({
                titleText: 'Deseja fazer Logout com Facebook?',
                buttons: [
                    { text: 'Cancelar' }
                ],
                buttonClicked: function(index) {
                    endLoginProcess();
                    return true;
                },
                cancelText: 'Cancelar',
                cancel: function() {
                    endLoginProcess();
                },
                destructiveText: 'Logout',
                destructiveButtonClicked: function(){
                    $rootScope.c.debug('destructiveButtonClicked');
                    //fbLogout();
                    CartService.loadInitialData();
                    UserService.resetUser();
                    hideSheet();
                    endLoginProcess();
                }
            });
        };

        return returnObj;
    }

    module.exports = angularModule;
})();