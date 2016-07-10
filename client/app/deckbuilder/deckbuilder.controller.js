'use strict';

(function(){

class DeckbuilderComponent {
  constructor() {
    this.cards = [],
    this.arenas = []
  }

  $onInit() {
    this.$http.get('/api/cards')
      .then(response => {
        this.cards = response.data;
      });
    this.$http.get('/api/arenas')
      .then(response => {
        this.arenas = response.data;
      });
  }
}

angular.module('deckProjectApp')
  .component('deckbuilder', {
    templateUrl: 'app/deckbuilder/deckbuilder.html',
    controller: DeckbuilderComponent,
    controllerAs: Deckbuilder
  });

})();
