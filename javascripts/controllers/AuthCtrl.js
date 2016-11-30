"use strict";

app.controller("AuthCtrl", function($scope, $location, $rootScope, AuthFactory, UserFactory){
  $scope.loginContainer = true; //these are just variables - this is setting the login container to be DEFAULT on page load
  $scope.registerContainer = false ; //these are just variables

  if($location.path() === "/logout"){  //$location is the current URL in your browser
    AuthFactory.logout();
    $rootScope.user = {};
    $location.url("/auth");  //takes you back to the auth page on logout -that is what this if statement is saying
  }

  let logMeIn = function(loginStuff){
     AuthFactory.authenticate(loginStuff).then(function(didLogin){
      console.log("didLogin", didLogin);
      return UserFactory.getUser(didLogin.uid);
    }).then(function(userCreds){
      $rootScope.user = userCreds;
      $scope.login = {};
      $scope.register = {};
      $location.url("/user-pins");
    });

  };

  $scope.setLoginContainer = function(){
    $scope.loginContainer = true;
    $scope.registerContainer = false ;  //flip flop between this one and the below so two forms wont populate at same time
  };

   $scope.setRegisterContainer = function(){
    $scope.loginContainer = false;
    $scope.registerContainer = true;
  };

  $scope.registerUser = function(registerNewUser){ //this gets called on click of the button and passes in register obj
    AuthFactory.registerWithEmail(registerNewUser).then(function(didRegister){ //userid is IN didRegister
      registerNewUser.uid = didRegister.uid;
      // console.log("didRegister", didRegister);
      return UserFactory.addUser(registerNewUser);
    }).then(function(registerComplete){
        logMeIn(registerNewUser);//LOGIN
    });
  };

  $scope.loginUser = function(loginNewUser){
    logMeIn(loginNewUser);
  };




});