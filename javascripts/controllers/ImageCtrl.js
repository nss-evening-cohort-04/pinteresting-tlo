"use strict";

app.controller("ImageCtrl", function($scope, $rootScope, ItemFactory){

	$scope.items = [];

	let getItems = function(){
		console.log("test test");
		ItemFactory.getBoards($rootScope.users.uid).then(function(fbItems) {
			$scope.items = fbItems;
		});
	};

	getItems();

});


