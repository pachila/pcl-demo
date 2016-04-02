angular.module("app.controllers", ["starter.controllers.account", "starter.controllers.test", 'starter.controllers.device']);

angular.module('starter.controllers', [])

  .controller('DeviceCtrl', function ($scope, $state, $cordovaSplashscreen, Devices, AppHelper, App) {

    App.checkLogin();

    console.log("DeviceCtrl ...");
    //alert('Device control');

    Devices.list().success(function (r) {
      $scope.devices = r.result;
    });

    $scope.getDesc = function (type) {
      var rv = "正常"
      switch (type) {
        case "1":
          rv = "正常";
          break;
        default :
          rv = "其他：" + type;
          break;
      }
      return "设备状态：" + rv;
    };

    // go to control index page with href
    $scope.getCtrlIdx = function (typeCode) {

      var rv = "device"
      switch (typeCode) {
        case "99":
          rv = "dvc-plug";
          break;
        default :
          rv = "device";
          break;
      }
      return rv;
    };

    // go to control index page with category
    $scope.go2CtrlIdx = function (idx, sn) {
      return;
      console.log(sn);
      localStorage["current_sn"] = sn;
      switch (idx) {
        case "FLYCO_AIRCLEANER":
          console.log("IDX:FLYCO_AIRCLEANER");
          $state.go("tab.device-detail");
          break;
        case "SMART_LIGHT":
          console.log("SMART_LIGHT");
          $state.go("tab.device-light");
          break;
        default:
          console.log("IDX:default");
          $state.go("tab.device-detail");
          break;
      }
    };

    $scope.gp = AppHelper.getPath;

    $scope.go2detect = function () {
      $state.go('tab.device-detect');
    };
  })

  .controller('DeviceDetailCtrl', function ($scope, $stateParams, Devices) {

    //$scope.optMode = {speed: false, light: false, onoff: true, timer: false, filter: false};

    //$scope.device = Devices.get($stateParams.deviceId);

    console.log("DeviceDetailCtrl ...");


    var sn = "18FE34A2E9B0";

    var t = true;
    $scope.devicestatus = {
      "product_code": "FLYCO_AIRCLEANER",
      "owner_code": "admin",
      "online_status": "false",
      "POWER_STATUS": "OFF",
      "PM25": "81",
      "TEMPERATURE": "19.2",
      "HUMIDITY": "28.8",
      "RUN_MODE": "SLEEP_MODE",
      "ION_STATUS": "CLOSE",
      "LIGHT_STATUS": "LIGHT_OPEN",
      "TIMING_STATUS": "1"
    };
    $scope.device = {name: "智能家庭"};
    $scope.currentopt = "mode";
    $scope.optstuats = {};
    $scope.optstuats.switch = "POWER_OFF";
    $scope.optstuats.ionic == "OPEN_ION";

    $scope.timer = {"value": "180"};

    $scope.opt = function (optcode, isopt, value) {
      console.log(optcode);

      // show corresponding control panel.
      if (isopt == true)
        $scope.currentopt = optcode;

      switch (optcode) {
        case "switch":
          if ($scope.optstuats.switch == "POWER_OFF")
            $scope.optstuats.switch = "POWER_ON";
          else
            $scope.optstuats.switch = "POWER_OFF";

          console.log("$scope.optstuats.switch:" + $scope.optstuats.switch);

          Devices.opt(sn, $scope.optstuats.switch);
          break;
        case "ionic":
          if ($scope.optstuats.ionic == "CLOSE_ION")
            $scope.optstuats.ionic = "OPEN_ION";
          else
            $scope.optstuats.ionic = "CLOSE_ION";

          Devices.opt(sn, $scope.optstuats.ionic);
          break;
        case "SWITCH_MODE_AUTO":
        case "SWITCH_MODE_STRONG":
        case "SWITCH_MODE_SLEEP":
        case "OPEN_LIGHT":
        case "WEAK_LIGHT":
        case "CLOSE_LIGHT":
          Devices.opt(sn, optcode);
          break;
        case "SET_TIME":
          Devices.opt(sn, optcode, value);
          break;
        default :
          break;
      }

      // get status
      Devices.status(sn, "status").success(function (r) {
        $scope.devicestatus = r.result;
      });

    };

    //timer
  })

  .controller('DeviceAirCleanerCtrl', function ($scope, $stateParams, Devices) {

    //$scope.optMode = {speed: false, light: false, onoff: true, timer: false, filter: false};

    //$scope.device = Devices.get($stateParams.deviceId);

    $scope.device = {name: "空气净化器"};

    var wheel = new wheelnav("wheelDiv");

    //This is the place for code snippets from the documentation -> http://wheelnavjs.softwaretailoring.net/documentation.html

    wheel.createWheel(["模式", "离子", "定时", "滤网", "灯效"]);
    wheel.navigateWheel(2);

  })

  .controller('DeviceDetectCtrl', function ($scope, $timeout, Devices, App) {

    $scope.SSID = {ssid: 'pls wait ...', pwd: ''};
    /*
     if (window.plugins.EspressifConnect) {
     window.plugins.EspressifConnect.getSSid(function (r) {
     $timeout(function () {
     $scope.SSID.ssid = r;
     }, 0, true);
     }, function (e) {
     alert(e);
     });
     }

     $scope.connect = function () {
     console.log("SP:" + $scope.SSID.ssid + ":" + $scope.SSID.pwd);
     window.plugins.EspressifConnect.Push2Dvc($scope.SSID.ssid, $scope.SSID.pwd, function (r) {
     $timeout(function () {
     var mac = r;
     var uid = App.getUser().uid;
     Devices.auth(r, uid, 1).success(function () {
     $state.go("tab.device");
     });
     }, 0, true);
     }, function (e) {
     alert(e);
     });
     };
     */

    console.log("you are now in connecting....");
    $scope.connect = function () {
      console.log("connect...");
      window.plugins.EspressifConnect.getSSid(function (r) {
        console.log("success...");
        $timeout(function () {
          $scope.SSID.ssid = r;
        }, 0, true);
      }, function (e) {
        console.log("failed...");
        alert(e);
      });
    };
  })

  .controller('DevicePlugCtrl', function ($scope, $http, $stateParams, Light) {

    $scope.player = $stateParams.playerId;

    $scope.light = {"value": 1};
    $scope.lcolor = {"value": "#ff887c"};

    function opt(r, l) {

      console.log(r);
      console.log(l);

      var cr = parseInt(r.substring(1, 3), 16);
      var cg = parseInt(r.substring(3, 5), 16);
      var cb = parseInt(r.substring(5, 7), 16);
      var cl = l;

      cr = parseInt(cr * 22222 / 255);
      cg = parseInt(cg * 22222 / 255);
      cb = parseInt(cb * 22222 / 255);
      cl = parseInt((cl - 1) * 22222 / 10);

      console.log(cr + "," + cg + "," + cb);

      var device_sn = localStorage["current_sn"]; //18FE34A109BD
      var md_code = "LIGHT_COLOR";
      var md_value = {"rgb": {"red": cr, "green": cg, "blue": cb, "white": cl}};
      Light.opt(device_sn, md_code, md_value);
    };

    var colors = [
      {name: "Green", value: '#7bd148'},
      {name: "BoldBlue", value: '#5484ed'},
      {name: "Blue", value: '#a4bdfc'},
      {name: "Turquoise", value: '#46d6db'},
      {name: "LightGreen", value: '#7ae7bf'},
      {name: "BoldGreen", value: '#51b749'},
      {name: "Yellow", value: '#fbd75b'},
      {name: "Orange", value: '#ffb878'},
      {name: "Red", value: '#ff887c'},
      {name: "BoldRed", value: '#dc2127'},
      {name: "Purple", value: '#dbadff'},
      {name: "Gray", value: '#e1e1e1'}
    ];

    $scope.selectedColor = colors[0];
    $scope.EventColors = colors;
    $scope.picker = false;

    $scope.OnChangeL = function () {
      opt($scope.lcolor.value, $scope.light.value);
    };

    $scope.OnChange = function (r) {
      console.log(r);
      $scope.lcolor.value = r.value;
      opt($scope.lcolor.value, $scope.light.value);
    };

    $scope.device = {name: "智能灯"};
    $scope.light = {color: {"R": 255, "G": 255, "B": 255}};

    $scope.power = function () {
      //var client_name =	"1723237626@qq.com";
      //var client_id =	"O7P8rt8qii460N77";
      //var client_secret =	"742Ovq6UFsC4vQp1";
      var r = 0;
      var g = 0;
      var b = 0;

      var cv = selectedColor.value.substring(1, 6);
      console.log(cv);
      console.log(cv.substring(0, 1));
      console.log(cv.substring(2, 3));
      console.log(cv.substring(4, 5));

      r = parseInt(r * 255 / 22222);
      g = parseInt(g * 255 / 22222);
      b = parseInt(b * 255 / 22222);


      $scope.light = {color: selectedColor.name};

      console.log("S:" + $scope.selectedColor.name);


      var device_sn = "5CCF7F0A1422";
      var md_code = "LIGHT_COLOR";
      var md_value = {"rgb": {"red": 5000, "green": 10000, "blue": 22222, "white": 22222}};

      Light.opt(device_sn, md_code, md_value);
    };
  })

  .controller('RegCtrl', function ($scope, $state, Account) {

    $scope.loginData = {
      username: '',
      password: ''
    };

    $scope.doReg = function () {
      Account.reg($scope.loginData.username, $scope.loginData.password).success(
        function (r) {
          //alert("注册成功:" + r);
          console.log(JSON.stringify(r));
          $state.go('tab.login');
        }
      );

    };
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    //Chats.all().success(
    //  function (r) {
    //    console.log("Chats ctrl success...");
    //    $scope.chats = r;
    //  }
    //);
    //$scope.chats = Chats.all();
    Chats.all().success(
      function (r) {
        $scope.msgs = r.result;
      }
    );
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    Chats.get($stateParams.chatId).success(function (r) {
      console.log(JSON.stringify(r));
      $scope.msg = r.result[0];
    });
  })

  .controller('AccountCtrl', function ($scope, $state, $ionicModal, $timeout, $cordovaCamera, Account, Version, App) {

    console.log('AccountCtrl ...');
    $scope.settings = {
      enableFriends: true
    };

    $scope.checkversion = function () {
      var rv = Version.get().success(
        function (r) {
          console.log(JSON.stringify(r));
        }
      );
      //console.log(rv.msg);
    }

    $scope.test = function () {

    }

    $scope.login = function () {
      $state.go('tab.login');
    }

  });
