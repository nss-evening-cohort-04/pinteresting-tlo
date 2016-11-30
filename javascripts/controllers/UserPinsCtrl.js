"use strict";



app.controller("UserPinsCtrl", function($scope, $rootScope, ItemFactory){
  $scope.welcome = "hello";     // this is like a console log AKA it tests it
  $scope.items = [];    //we put this info (data for people/to do items/etc) in FB database

  let getItems = function(){
    ItemFactory.getItemList($rootScope.user.uid).then(function(items){ //what is here needs to be right below this
      $scope.items = items;
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