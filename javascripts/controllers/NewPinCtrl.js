// "use strict";

// app.controller("NewPinCtrl", function($scope, $rootScope, $location, ItemFactory){
//   $scope.newPin = {}; // this is making a "new task" and assigning it an empty object


//   $scope.addNewPin = function(){
//     $scope.newPin.isCompleted = false; //you must define new task above (basically as a variable/empty obj) and set to false
//     $scope.newPin.uid = $rootScope.user.uid;
//     ItemFactory.postNewItem($scope.newPin).then(function(itemId){
//       $location.url("/user-new-pins");
//       $scope.newPin = {};
//     });
//   };

// });