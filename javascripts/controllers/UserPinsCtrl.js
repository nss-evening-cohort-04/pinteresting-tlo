"use strict";

app.controller("UserPinsCtrl", function($scope, $rootScope, ItemFactory){
  $scope.welcome = "hello";     // this is like a console log AKA it tests it
  $scope.boards = [];    //we put this info (data for people/to do items/etc) in FB database

  let getItems = function(){
    ItemFactory.getBoards($rootScope.user.uid).then(function(boards){ //what is here needs to be right below this
      $scope.boards = boards;
    });
    ItemFactory.getPins($rootScope.user.uid).then(function(pins){ //what is here needs to be right below this
      $scope.pins = pins;
    });
  };
  getItems();

  $scope.deleteItem = function(itemId){
    console.log('you deleted this');
    ItemFactory.deleteItem(itemId).then(function(response){
      getItems();
    });
  };


});
