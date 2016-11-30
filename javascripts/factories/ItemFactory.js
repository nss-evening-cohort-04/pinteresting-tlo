"use strict";


app.factory("ItemFactory", function($q, $http, FIREBASE_CONFIG) {
	
	var getItemList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/pins.json?orderBy="uid"&equalTo="${userId}"`)
			.success(function(response){
				let items = [];
				Object.keys(response).forEach(function(key){
					response[key].id = key;
					items.push(response[key]);
				});
				console.log("items", items);
				resolve(items);
			})
			.error(function(errorResponse){
				reject(errorResponse);
			});
		});
	};

	return{getItemList:getItemList};
});
