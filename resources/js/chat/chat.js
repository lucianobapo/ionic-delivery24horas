(function () {
    'use strict';

    var angularModule = angular.module('App.Chat');

    angularModule.controller('ChatsCtrl', [
        '$scope',
        'Chats',
        ChatsCtrl
    ]);

    function ChatsCtrl($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
    }

    angularModule.controller('ChatDetailCtrl', [
        '$scope',
        '$stateParams',
        'Chats',
        ChatDetailCtrl
    ]);

    function ChatDetailCtrl($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    }

    module.exports = angularModule;
})();