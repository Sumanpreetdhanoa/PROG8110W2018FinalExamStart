// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

  .controller('firebaseCtl', function ($scope, $firebaseObject) {
    $scope.initializeFirebase = function(){
      var ref = new Firebase("https://march20prog8110.firebaseio.com/projects/" + $scope.sKey + "/");
      $scope.projects = $firebaseObject(ref);  
    }

    $scope.sKey = localStorage.getItem("sMD5");
    if($scope.sKey != null){
      $scope.initializeFirebase();
    }

    $scope.model = {};

    $scope.initializeStorage = function () {
      sMd5 = CryptoJS.MD5($scope.model.uname + $scope.model.password + "topSecret");
      localStorage.setItem("sMD5", sMd5);
      $scope.sKey = localStorage.getItem("sMD5");
      $scope.initializeFirebase();
    }
    $scope.addProject = function () {
      $scope.projects[uuid.v4()] = { name: $scope.model.project };
      $scope.model.project = "";
      $scope.projects.$save();
    }
    $scope.addTask = function (project) {
      if (!project.hasOwnProperty("tasks")) {
        project.tasks = {};
      }
      project.tasks[uuid.v4()] = { name: project.task };
      delete project.task;
      $scope.projects.$save();
    }
  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
