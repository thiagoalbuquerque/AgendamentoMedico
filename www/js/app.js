// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $ionicConfigProvider) {
  $stateProvider
    .state('Home', {
      url: '/home',
      cache: false,
      controller: 'HomeCtrl',
      templateUrl: 'Templates/Home.html'
    })
    .state('Detalhes', {
      url: '/detalhes',
      cache: false,
      controller: 'DetalhesCtrl',
      templateUrl: 'Templates/Detalhes.html'
    })
    .state('ExameSangue', {
      url: '/sangue',
      cache: false,
      controller: 'ExameSangueCtrl',
      templateUrl: 'Templates/ExameSangue.html'
    })
    .state('ExameEsforco', {
      url: '/esforco',
      cache: false,
      controller: 'ExameEsforcoCtrl',
      templateUrl: 'Templates/ExameEsforco.html'
    })
    .state('ExameToxicologico', {
      url: '/drogas',
      cache: false,
      controller: 'ExameToxicologicoCtrl',
      templateUrl: 'Templates/ExameToxicologico.html'
    })
    .state('ExameEntrevista', {
      url: '/entrevista',
      cache: false,
      controller: 'ExameEntrevistaCtrl',
      templateUrl: 'Templates/ExameEntrevista.html'
    })
    .state('AgendamentoDetalhes', {
      url: '/agendamentoDetalhes',
      cache: false,
      controller: 'AgendamentoDetalhesCtrl',
      templateUrl: 'Templates/AgendamentoDetalhes.html'
    })
    
  $urlRouterProvider.otherwise('/home');
});