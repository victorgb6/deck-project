'use strict';

angular.module('deckProjectApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('decklist', {
        url: '/decklist',
        template: '<decklist></decklist>'
      });
  });
