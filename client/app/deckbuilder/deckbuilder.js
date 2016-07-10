'use strict';

angular.module('deckProjectApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('deckbuilder', {
        url: '/deckbuilder',
        template: '<deckbuilder></deckbuilder>'
      });
  });
