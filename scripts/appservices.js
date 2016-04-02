angular.module('starter.appservices', [])

  .factory('App', function ($state) {
    return {
      isLogin: function () {
        return localStorage["ISLOGIN"];
      },
      checkLogin: function () {
        if (!localStorage["ISLOGIN"]) {
          $state.go("tab.login");
        } else if (localStorage["ISLOGIN"] != "TRUE") {
          $state.go("tab.login");
        }
      },
      getUser: function () {
        return JSON.parse(localStorage["LOGIN_USER"]);
      },
      setUser: function (userObj) {
        localStorage["LOGIN_USER"] = JSON.stringify(userObj);
      }
    }
  })

  .service('SysService', function ($state) {

  })
;
