'use strict'

angular.module('gifwhackingApp').config ($stateProvider) ->
  $stateProvider.state 'game',
    abstract: true,
    templateUrl: 'app/game/layout.html',
    controller: 'GameCtrl'

  $stateProvider.state 'game.list',
    url: '/games'
    templateUrl: 'app/game/list.html'
    controller: 'GameCtrl'

  $stateProvider.state 'game.list.waiting',
    url: '/waiting'
    templateUrl: 'app/game/waiting.html'
    controller: 'GameCtrl'

  $stateProvider.state 'game.playing',
    url: '/game/:id/playing'
    templateUrl: 'app/game/playing.html'
    controller: ($scope, $stateParams) ->
      $scope.gameId = $stateParams.id

  $stateProvider.state 'game.watching',
    url: '/game/:id/watching'
    templateUrl: 'app/game/watching.html'
    controller: ($scope, $stateParams) ->
      $scope.gameId = $stateParams.id
