"use strict";

app.controller("UserPinsCtrl", function($scope, $rootScope, ItemFactory){
  $scope.welcome = "hello";     // this is like a console log AKA it tests it
  $scope.boards = [];    //we put this info (data for people/to do items/etc) in FB database
  $scope.pics = [];

  $scope.BoardContainer = true;
  $scope.SelectedBoard = false;

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

  $scope.selectedBoard = function(Boardid,Title){
    $scope.BoardContainer = false;
    $scope.SelectedBoard = true;
    console.log("boardid", Boardid);
    $scope.SelectedBoardID = Boardid;
    $scope.SelectedBoardTitle = Title;
};

  $scope.imgurResults = [];

  $scope.searchIMGURclick = function() {
    console.log("clicked search");
    ItemFactory.searchIMGUR($scope.searchText)
      .then(function(searchResults){
        $scope.imgurResults = searchResults;
        console.log("hello", $scope.imgurResults);
      });
  };


});
