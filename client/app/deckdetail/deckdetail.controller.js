'use strict';

(function(){

class DeckdetailComponent {
  constructor($http, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.cards = [];
    this.arenas = [];
    this.deck = {};
  }

  $onInit() {
    var self = this;
    this.$http.get('/api/decks/'+this.$stateParams.deckID)
      .then(response => {
        self.deck = response.data;
        self.deck.cards.map(cardId => {
          self.getCard(cardId).then(response => {
              self.cards.push(response.data);
          });
        });
        self.deck.arenas.map(arenaId => {
          self.getArena(arenaId).then(response => {
            self.arenas.push(response.data);
          });
        });
      });
  }

  /*
  * Gets the card data from api
  */
  getCard(id) {
    return this.$http.get('/api/cards/'+id);
  }

  /*
  * Gets the arena data from api
  */
  getArena(id) {
    return this.$http.get('/api/arenas/'+id);
  }

}

angular.module('deckProjectApp')
  .component('deckdetail', {
    templateUrl: 'app/deckdetail/deckdetail.html',
    controller: DeckdetailComponent,
    controllerAs: 'Deckdetail'
  });

})();
