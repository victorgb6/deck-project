'use strict';

angular.module('deckProjectApp.auth', ['deckProjectApp.constants', 'deckProjectApp.util',
    'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
