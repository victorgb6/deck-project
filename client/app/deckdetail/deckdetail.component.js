'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './deckdetail.routes';

export class DeckdetailComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('deckProjectApp.deckdetail', [uiRouter])
  .config(routes)
  .component('deckdetail', {
    templateUrl: 'app/deckdetail/deckdetail.html',
    controller: DeckdetailComponent,
    controllerAs: 'deckdetailCtrl'
  })
  .name;
