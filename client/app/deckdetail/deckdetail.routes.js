'use strict';

/*@ngInject*/
export default function($stateProvider) {
  $stateProvider
    .state('deckdetail', {
      url: '/deckdetail',
      template: '<deckdetail></deckdetail>'
    });
}
