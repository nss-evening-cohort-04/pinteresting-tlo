"use strict";


app.factory("ItemFactory", function($q, $http, FIREBASE_CONFIG) {
	
	var getBoards = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/boards.json?orderBy="uid"&equalTo="${userId}"`)
			.success(function(response){
				let boards = [];
				Object.keys(response).forEach(function(key){
					response[key].id = key;
					boards.push(response[key]);
				});
				console.log("boards", boards);
				resolve(boards);
			})
			.error(function(errorResponse){
				reject(errorResponse);
			});
		});
	};

	var getPins = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/pins.json?orderBy="uid"&equalTo="${userId}"`)
			.success(function(response){
				let pins = [];
				Object.keys(response).forEach(function(key){
					response[key].id = key;
					pins.push(response[key]);
				});
				console.log("pins", pins);
				resolve(pins);
			})
			.error(function(errorResponse){
				reject(errorResponse);
			});
		});
	};


	return{getBoards:getBoards, getPins:getPins};
});
