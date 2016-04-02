/*
 device -- url: 'http://123.57.90.89/opencenter/api.php?s=/devices/5',
 reg -- s=devices/registry {MAC:mac2, ProductCode:112, Uid=102}
 unreg -- s=devices/unregistry {MAC:mac2, ProductCode:112}
 */

app = {};
app.domain = "http://123.57.90.89/opencenter/api.php?s=";
app.deviceList = app.domain + "/devices/list";
app.deviceGet = app.domain + "/devices/{id}";

angular.module('starter.services', [])

  .constant('ApiEndpoint', {
    // domain: "http://123.57.90.89/opencenter/api.php?s="
  })

  .factory('AppHelper', function () {
    var domain = "http://123.57.90.89/opencenter/api.php?s=";

    return {
      get: function (module, params) {
        var req = {
          method: 'GET',
          url: domain + module,
          headers: {
            'Authorization': 'Token ' + localStorage["token"] + ''
          }
        }
        return $http(req);
      },
      getAuthentication: function () {
        return null;
      },
      getToken: function () {
        var tk;
        if (localStorage["token"] != null) {
          tk = localStorage["token"];
        } else {
          tk = "Unkonwn";
        }

        return tk;
      },
      getPath: function (path) {
        var r = "http://123.57.90.89/opencenter" + path;
        return r;
      }
    }
  })

  .factory('Light', function ($http) {
    var token = localStorage["token"];
    return {
      opt: function (device_sn, md_code, md_value) {
        if (!md_value)
          md_value = "";
        // http://123.57.90.89/opencenter/api.php?s=/devices/asyncommand
        var req = {
          method: 'POST',
          url: app.domain + '/devices/asyncommand',
          data: {
            "device_sn":device_sn,
            "md_code":md_code,
            "md_value":md_value
          },
          headers: {
            'Authorization': 'Token ' + localStorage["token"] + ''
          }
        }
        return $http(req);
      }
    };
  })


  .factory('Devices', function ($http) {

    //var users = [ {id: 1, fullName: 'Matt'}, {id: 2, fullName: 'Bob'} ];
    //window.localForage.setItem('users', users, function(result) {
    //  console.log(result);
    //});

    var token = localStorage["token"];
    var devices = [
      {id: 0, name: '客厅空气净化器', desc: '客厅空气净化器', pic: 'images/src/d1.png', status: '工作中'},
      {
        id: 1,
        name: '扫地机器人小强',
        desc: '扫地机器人',
        pic: 'images/src/d2.png',
        status: '工作中'
      },
      {id: 2, name: '我的充电桩', desc: '小区', pic: 'images/src/d3.png', status: '待机'}, {
        id: 3,
        name: '主卧空净',
        desc: '卧室空净',
        pic: 'images/src/d4.png',
        status: '故障'
      }];

    return {
      list: function () {
        var req = {
          method: 'GET',
          url: app.deviceList,
          headers: {
            'Authorization': 'Token ' + token + ''
          }
        }
        return $http(req);
      },
      get: function (deviceId) {
        var req = {
          method: 'POST',
          url: app.domain + '/devices/5',
          headers: {
            'Authorization': 'Token ' + localStorage["token"] + ''
          }
        }
        return $http(req);
      },
      opt: function (sn, optcode, md_value) {
        if (!md_value)
          md_value = "";
        // http://123.57.90.89/opencenter/api.php?s=/devices/asyncommand
        var req = {
          method: 'POST',
          url: app.domain + '/devices/asyncommand',
          data: {
            "device_sn": sn, //"82NTESTMAC",
            "md_code": optcode, //"POWER_ONOFF",
            "md_value": md_value
          },
          headers: {
            'Authorization': 'Token ' + localStorage["token"] + ''
          }
        }
        return $http(req);
      },
      status: function (sn, code) {
        //http://123.57.90.89/opencenter/api.php?s=/devices/82NTESTMAC/status
        var req = {
          method: 'GET',
          url: app.domain + '/devices/' + sn + '/' + code + '',
          headers: {
            'Authorization': 'Token ' + localStorage["token"] + ''
          }
        }
        return $http(req);
      },
      auth: function (sn, uid, authtype) {
        // /devices/auth
        // device_sn，user_id,auth_type
        var req = {
          method: 'POST',
          url: app.domain + '/devices/auth',
          data: {
            "device_sn": sn, //"82NTESTMAC",
            "user_id": uid, //"POWER_ONOFF",
            "auth_type": authtype
          },
          headers: {
            'Authorization': 'Token ' + localStorage["token"] + ''
          }
        }
        return $http(req);
      }
    };
  })


  .factory('Message', function ($http) {
    return {
      get: function (id) {
        var req = {
          method: 'GET',
          url: app.domain + 'message/get/30',
          headers: {
            'Authorization': 'Token ' + localStorage["token"] + ''
          }
        }
        return $http(req);
      },
      all: function (u, p) {
        var req = {
          method: 'GET',
          url: app.domain + 'message/list',
          headers: {
            'Authorization': 'Token ' + localStorage["token"] + ''
          }
        }
        return $http(req);
      }
    }
  })

  .factory('Account', function ($http) {
    return {
      get: function (id) {
        var req = {
          method: 'GET',
          url: app.domain + 'users/profile/' + id,
          headers: {
            'Authorization': 'Token ' + localStorage["token"] + ''
          }
        }
        return $http(req);
      },
      login: function (u, p) {
        var req = {
          method: 'POST',
          url: app.domain + '/users/login',
          data: {username: u, password: p},
          headers: {
            'Authorization': 'Token ' + localStorage["token"] + ''
          }
        }
        return $http(req);
      },
      reg: function (u, p) {
        var req = {
          method: 'POST',
          url: app.domain + '/users/reg',
          data: {username: u, password: p},
          headers: {
            'Authorization': 'Token ' + localStorage["token"] + ''
          }
        }
        return $http(req);
      }
    }
  })

  .factory('Version', function ($http) {

    return {
      get: function () {
        //var req = {
        //  method: 'GET',
        //  url: 'http://123.57.90.89/opencenter/api.php?s=system/appcurrentversion/ios/SmartAppliance',
        //  headers: {
        //    'Authorization': 'Token 1af538baa9045a84c0e889f672baf83ff24'
        //  }
        //}
        //
        //return $http(req);

        return $http({
          method: 'GET',
          url: app.domain + '/system/appversion/ios/smartappliance',
          headers: {
            'Authorization': 'Token 1af538baa9045a84c0e889f672baf83ff24'
          }
        });
      }
    }
  })

  .factory('Chats', function ($http) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: '扫地机器人故障',
      type: 'danger',
      lastText: '灰尘盒故障，请及时清理。',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: '卧室空气净化器',
      type: 'warning',
      lastText: '滤网1工作时间已超过2000小时，请注意及时更换。',
      face: 'img/max.png'
    }, {
      id: 2,
      name: '充电桩提示',
      type: 'info',
      lastText: '固件升级成功，最新版本v1.2.7',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: '客厅空气净化器提示',
      type: 'warning',
      lastText: '水位已低于建议标准，请及时补水',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: '扫地机器人故障',
      type: 'danger',
      lastText: '电力不足',
      face: 'img/mike.png'
    }];

    return {
      all: function () {
        var req = {
          method: 'GET',
          url: app.domain + '/message/list',
          headers: {
            'Authorization': 'Token ' + localStorage["token"] + ''
          }
        }
        return $http(req);
        // return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (id) {
        var req = {
          method: 'GET',
          url: app.domain + '/message/get/' + id,
          headers: {
            'Authorization': 'Token ' + localStorage["token"] + ''
          }
        }
        return $http(req);
      }
    };
  });
