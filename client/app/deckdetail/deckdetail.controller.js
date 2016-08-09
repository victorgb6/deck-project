'use strict';

(function(){

class DeckdetailComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('deckProjectApp')
  .component('deckdetail', {
    templateUrl: 'app/deckdetail/deckdetail.html',
    controller: DeckdetailComponent,
    controllerAs: 'Deckdetail'
  });

})();
