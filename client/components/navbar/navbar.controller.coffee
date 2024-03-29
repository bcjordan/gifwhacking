'use strict'

angular.module 'gifwhackingApp'
.controller 'NavbarCtrl', ['$scope', '$location', 'Auth', ($scope, $location, Auth) ->
  $scope.menu = [
    {
     title: 'Home',
     state: 'main'
    }
    {
      title: 'Play Now',
      state: 'game.list.waiting'
    }
  ]
  $scope.isCollapsed = true
  $scope.isLoggedIn = Auth.isLoggedIn
  $scope.isAdmin = Auth.isAdmin
  $scope.getCurrentUser = Auth.getCurrentUser

  $scope.logout = ->
    Auth.logout()
    $location.path '/login'

  $scope.isActive = (route) ->
    route is $location.path()
]
