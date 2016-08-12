'use strict';

angular.module('deckProjectApp', ['deckProjectApp.auth', 'deckProjectApp.admin',
    'deckProjectApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router',
    'ui.bootstrap', 'validation.match','textAngular'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

  });
