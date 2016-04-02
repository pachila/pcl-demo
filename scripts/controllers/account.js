angular.module('starter.controllers.account', [])

  .controller('AboutCtrl', function ($scope, $state) {

    console.log("AboutCtrl ...");

  })

  .controller('LoginCtrl', function($scope, $state,Account, App){

    console.log("LoginCtrl...");

    $scope.loginData = {
      'username': 'admin',
      'password': '123456'
    };


    $scope.doLogin = function () {
      Account.login(
        $scope.loginData.username,
        $scope.loginData.password
      ).success(function (rv) {
          console.log(JSON.stringify(rv));
          localStorage["token"] = rv.result.token;
          localStorage["ISLOGIN"] = "TRUE";

          App.setUser(rv.result.user);

          $state.go('tab.device');
        });

    };

  })
;
