"use strict";

app.controller("NewPinCtrl", function($scope, $rootScope, $location, ItemFactory){
  // $scope.newPin = {}; // this is making a "new task" and assigning it an empty object


  $scope.addNewPin = function(){
  	let test = "test";
   //you must define new task above (basically as a variable/empty obj) and set to false
    // $scope.newPin.uid = $rootScope.user.uid;
    console.log("button clicked", test);
    $location.url("/new-pin");
    // ItemFactory.postNewItem($scope.newPin).then(function(itemId){
    //   $location.url("/new-pin");
    //   $scope.newPin = {};
    // });
  };

});