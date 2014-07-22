'use strict'

describe 'Controller: GameCtrl', ->

  # load the controller's module
  beforeEach module('gifwhackingApp')
  GameCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject(($controller, $rootScope) ->
    return # TODO(bcjordan): fix test setup
#    scope = $rootScope.$new()
#    GameCtrl = $controller('GameCtrl',
#      $scope: scope
#    )
  )
  it 'should ...', ->
    expect(1).toEqual 1
