"use strict";

app.controller("UserPinsCtrl", function($scope, $rootScope, $location, ItemFactory){
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

  $scope.addNewPin = function(picLink){
    $location.url("/new-pin");
    picLink = picLink;
    console.log("img url being passed", picLink);
    imgLink = picLink;
    console.log("img", imgLink);
  };

  let imgLink = [];

  $scope.addPinToBoard = function(Boardid){
    console.log("board id to pin to", Boardid);
    $scope.newPin.uid = $rootScope.user.uid;
    $scope.newPin.boardid = Boardid;
    $scope.newPin.url = imgLink;
    ItemFactory.postNewPin($scope.newPin).then(function(itemId){
      $scope.newPin = {};
      });
  };

  $scope.addNewBoard = function(){
    $scope.newBoard.uid = $rootScope.user.uid;
    $scope.newBoard.boardid = $scope.newBoard.title;
    ItemFactory.postNewBoard($scope.newBoard).then(function(itemId){
      $scope.newBoard = {};
      });
  };

});
