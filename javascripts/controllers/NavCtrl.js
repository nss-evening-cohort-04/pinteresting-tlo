"use strict";
app.controller("NavCtrl", function($scope){
	$scope.navItems = [
	{	name:"Logout",
		url: "#/logout"
	},
	{	name:"My Boards",
		url:"#/user-pins"
	}
	];
});