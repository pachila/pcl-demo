angular.module('starter.controllers.device', [])

  .controller('DeviceSpanelCtrl', function ($scope, $state, $stateParams, Devices) {

    console.log("DeviceSpanelCtrl ...");

    console.log($stateParams.ctgid);
    console.log($stateParams.sn);

    var cur_sn = $stateParams.sn;

    $scope.device = {
      name: "智能灯",
      current_node: null,
      parmobj: "0",
      root: app.domain,
      opts: dev_opts
    };

    $.each(dev_opts, function (k, v) {
      //console.log("md_code:" + v.md_code + "\n");
      //console.log("md_info:" + JSON.stringify(v.md_info));
    });

    $scope.opt = function (obj) {
      // console.log("opt:" + JSON.stringify(obj));

      // 0:不传参数 1:数值 2:字符 3:枚举
      $scope.device.current_node = obj;

      $scope.device.parmobj = "";

      if ($scope.device.current_node.md_info.md_value_type == "0") {
        console.log("submit...with param:: ");
        Devices.opt(cur_sn, obj.md_code, "");
      }
    };

    $scope.opt_submit = function () {
      console.log("submit...with param::" + $scope.device.parmobj);
      // $scope.device.parmobj = {};
      if ($scope.device.current_node.md_info.md_value_type != "0") {
        Devices.opt(cur_sn, $scope.device.current_node.md_code, $scope.device.parmobj);
      }
    };

  });
;

/*
 "md_info": {
 "id": "14",
 "status": "1",
 "create_time": "1452822333",
 "update_time": "1452822333",
 "md_type": "1",		// 1: ［功能／传感／状态］／错误
 "md_code": "QUERY_POWER", // rootPath + md_code
 "md_name": "查询开关机状态",
 "md_value_type": "0",	// 0:不传参数 1:数值 2:字符 3:枚举
 "md_scope": "1",
 "md_description": "",
 "md_owner_code": ""
 },
 */
