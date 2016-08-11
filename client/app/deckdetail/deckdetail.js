'use strict';

angular.module('deckProjectApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('deckdetail', {
        url: '/deckdetail/:deckID',
        template: '<deckdetail></deckdetail>'
      });
  });
