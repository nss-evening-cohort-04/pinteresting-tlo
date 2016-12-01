"use strict";
app.controller("NavCtrl", function($scope){
	$scope.navItems = [
	{	name:"Logout",
		url: "#/logout"
	},
   {
      name:"All Pins",
      url:"#/user-pins"
  },
    {
      name:"New Pins",
      url:"#/user-new-pins"
  }
	];
});