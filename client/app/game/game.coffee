'use strict'

angular.module('gifwhackingApp').config ($stateProvider) ->
  $stateProvider.state 'game',
    url: '/game'
    templateUrl: 'app/game/game.html'
    controller: 'GameCtrl'
