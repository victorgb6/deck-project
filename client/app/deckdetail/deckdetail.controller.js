'use strict';

(function(){

class DeckdetailComponent {
  constructor($http, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.cards = [];
  }

  $onInit() {
    var self = this;
    this.$http.get('/api/decks/'+this.$stateParams.deckID)
      .then(response => {
        this.deck = response.data;
        this.deck.cards.map(cardId => {
          self.getCard(cardId).then(response => {
              self.cards.push(response.data);
          })
        });
      });
  }
  
  /*
  * Gets the card data from api
  */
  getCard(id) {
    return this.$http.get('/api/cards/'+id);
  }

}

angular.module('deckProjectApp')
  .component('deckdetail', {
    templateUrl: 'app/deckdetail/deckdetail.html',
    controller: DeckdetailComponent,
    controllerAs: 'Deckdetail'
  });

})();
