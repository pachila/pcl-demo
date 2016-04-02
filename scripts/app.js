// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
// , 'ui.bootstrap'
angular.module('starter', ['ionic', 'ngCordova', 'ui.bootstrap', 'starter.controllers', 'app.controllers', 'starter.services', 'starter.directives', 'starter.appservices', 'ngIOS9UIWebViewPatch'])

  .run(function ($ionicPlatform, $state, $rootScope, $timeout, $cordovaSplashscreen, App) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      $cordovaSplashscreen.hide();
      //$timeout(function(){
      //  $cordovaSplashscreen.hide();
      //},3000);

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
          //console.log("$stateChangeStart...from:" + fromState.url + ", to:" +toState.url);
          //event.preventDefault();
          // transitionTo() promise will be rejected with
          // a 'transition prevented' error
        })

      // $state.go('tab.login');
      App.checkLogin();
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    //
    $ionicConfigProvider.tabs.position("bottom");
    // $ionicConfigProvider.backButton.text("返回");
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.navBar.alignTitle("center");

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: './templates/menu/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.device', {
        url: '/devices',
        views: {
          'tab-dash': {
            cache: false,
            templateUrl: './templates/devices/device.html',
            controller: 'DeviceCtrl'
          }
        }
      })
      .state('tab.test', {
        url: '/test',
        views: {
          'tab-others': {
            templateUrl: './templates/pcla/test.html',
            controller: 'TestCtrl'
          }
        }
      })
      .state('tab.device-detail', {
        url: '/device/:deviceId',
        views: {
          'tab-dash': {
            templateUrl: './templates/devices/device-detail.html',
            controller: 'DeviceDetailCtrl'
          }
        }
      })
      .state('tab.device-detect', {
        url: '/dvc-detect',
        views: {
          'tab-dash': {
            templateUrl: './templates/devices/device-detect.html',
            controller: 'DeviceDetectCtrl'
          }
        }
      })
      .state('tab.device-aircleaner', {
        url: '/dvc-aircleaner',
        views: {
          'tab-dash': {
            templateUrl: './templates/devices/device-aircleaner.html',
            controller: 'DeviceAirCleanerCtrl'
          }
        }
      })
      .state('tab.device-light', {
        url: '/dvc-light',
        views: {
          'tab-dash': {
            templateUrl: './templates/devices/device-light.html',
            controller: 'DevicePlugCtrl'
          }
        }
      })
      .state('tab.device-spanel', {
        url: '/dvc-spanel/:ctgid/:sn',
        views: {
          'tab-dash': {
            templateUrl: './templates/devices/device-spanel.html',
            controller: 'DeviceSpanelCtrl'
          }
        }
      })
      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: './templates/chats/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: './templates/chats/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.reg', {
        url: '/reg',
        views: {
          'tab-account': {
            templateUrl: './templates/account/reg.html',
            controller: 'RegCtrl'
          }
        }
      })

      .state('tab.about', {
        url: '/about',
        views: {
          'tab-account': {
            templateUrl: './templates/account/about.html',
            controller: 'AboutCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: './templates/account/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })

      .state('tab.login', {
        url: '/login',
        views: {
          'tab-others': {
            templateUrl: './templates/account/login.html',
            controller: 'LoginCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/devices');

  });

// 02-16 14:25:58.316: I/SICON(4138): clientId is:8ac63a4d7f2ed2e3822a8f282ae8416c
