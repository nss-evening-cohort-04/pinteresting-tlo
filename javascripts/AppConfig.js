"use strict";
//THIS IS WHERE YOU PUT YOUR ROUTES AS WELL!!

let isAuth = (AuthFactory) => new Promise((resolve, reject)=>{
  if (AuthFactory.isAuthenticated()){
    resolve();
  } else {
    reject();
  }
});



// ****!!THIS IS WHERE WE WILL CALL FIREBASE!!****
app.run(function($rootScope, $location, FIREBASE_CONFIG, AuthFactory){ // this is where you are USING firebase DB
  firebase.initializeApp(FIREBASE_CONFIG);

  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRout){ //when the route of the URL changes, it will start this function - that is what routeChangeStart is

    let logged = AuthFactory.isAuthenticated();

    let appTo;

    if (currRoute.originalPath){
      appTo= currRoute.originalPath.indexOf('/auth') !== -1;
    }

    // console.log("appTo", appTo);

    if(!appTo && !logged){
      event.preventDefault();
      $location.path('/auth');
    }
  });


});


app.config(function($routeProvider){
  $routeProvider
    .when('/auth', {
      templateUrl: 'partials/auth.html', //see partials folder- auth- this logs in user
      controller: 'AuthCtrl' // see new controller file
    })
    .when('/search', {
      templateUrl: 'partials/search.html', //see partials folder
      controller: 'UserPinsCtrl', // see new controller file
      resolve: {isAuth}
    })
    .when('/boards', {
      templateUrl: 'partials/boards.html',
      controller: 'UserPinsCtrl',
      resolve: {isAuth}
    })
    .when('/new-pin', {
      templateUrl: 'partials/new-pin.html',
      controller: 'NewPinCtrl',
      resolve: {isAuth}
    })
    .otherwise('/auth');

});