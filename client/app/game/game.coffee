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
    controller: ($scope, $stateParams, $http, socket) ->
      $scope.newTerms = {}
      $scope.gameId = $stateParams.id

      $http.get('/api/games').success (games) ->
        $scope.gamesCache = games
        socket.syncUpdates 'game', $scope.gamesCache

      $scope.playTerms = ->
        return if $scope.newTerms.text is ''
        $http.put '/api/games/' + $scope.gameId + '/message',
          message: $scope.newTerms.text

        $scope.newTerms.text = ''

      $scope.$on '$destroy', ->
        socket.unsyncUpdates 'message'


  $stateProvider.state 'game.watching',
    url: '/game/:id/watching'
    templateUrl: 'app/game/watching.html'
    controller: ($scope, $stateParams) ->
      $scope.gameId = $stateParams.id
