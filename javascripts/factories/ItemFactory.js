"use strict";


app.factory("ItemFactory", function($q, $http, FIREBASE_CONFIG, IMGUR) {

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

    var searchIMGUR = function(searchPics) {
        var pics = [];
        return $q(function(resolve, reject){
            $http({
                headers:{"Authorization": "Client-ID " + IMGUR.client_id},
                url: `https://api.imgur.com/3/gallery/t/${searchPics}`,
                method: "GET"
            })
            .success(function(PicObject){
                pics = PicObject.data.items;
                console.log("test return", PicObject);
                resolve(pics);
            });
        });
    };

    var postNewPin = function(newPin){
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/pins.json`, JSON.stringify({
				uid: newPin.uid,
				boardid: newPin.boardid,
				url: newPin.url,
				imgtitle: newPin.imgtitle
			})
			)
			.success(function(postResponse){
				resolve(postResponse);
			})
			.error(function(postError){
				reject(postError);
			});
		});
	};

	var postNewBoard = function(newBoard){
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/pins.json`, JSON.stringify({
				boardid: newBoard.boardid,
				uid: newBoard.uid,
				title: newBoard.imgtitle
			})
			)
			.success(function(postResponse){
				resolve(postResponse);
			})
			.error(function(postError){
				reject(postError);
			});
		});
	};



                return{getBoards:getBoards, getPins:getPins, searchIMGUR:searchIMGUR, postNewPin:postNewPin, postNewBoard:postNewBoard};
            });