'use strict'

angular.module('gifwhackingApp').controller 'GameCtrl', ($scope, $http, socket) ->
  $scope.message = 'Hello'

  $scope.gamesCache = []

  $http.get('/api/games').success (games) ->
    $scope.gamesCache = games
    socket.syncUpdates 'game', $scope.gamesCache

  $scope.addGame = ->
    return if $scope.newGame is ''
    $http.post '/api/games',
      name: $scope.newGame,
      state: 'open'

    $scope.newGame = ''

  $scope.deleteGame = (game) ->
    $http.delete '/api/games/' + game._id

  $scope.$on '$destroy', ->
    socket.unsyncUpdates 'game'
