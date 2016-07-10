'use strict';

(function(){

class DeckbuilderComponent {
  constructor($http, $filter) {
    this.$http = $http;
    this.$filter = $filter;
    this.cards = [];
    this.arenas = [];
    this.deckCards = [];
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

  addCard(cardId) {
    if (this.deckCards.length < 8) {
      this.found = this.$filter('filter')(this.cards, {_id: cardId}, true);
      this.indexFound = this.cards.indexOf(this.found[0]);
      this.cards.splice(this.indexFound, 1);
      this.deckCards.push(this.found[0]);
    }
  }

  removeCard(cardId) {
    if (this.deckCards.length > 0) {
      this.found = this.$filter('filter')(this.deckCards, {_id: cardId}, true);
      this.indexFound = this.deckCards.indexOf(this.found[0]);
      this.deckCards.splice(this.indexFound, 1);
      this.cards.push(this.found[0]);
    }
  }
}

angular.module('deckProjectApp')
  .component('deckbuilder', {
    templateUrl: 'app/deckbuilder/deckbuilder.html',
    controller: DeckbuilderComponent,
    controllerAs: 'Deckbuilder'
  });

})();
