'use strict';

(function(){

class DeckbuilderComponent {
  constructor($http, $filter, Auth) {
    this.$http = $http;
    this.$filter = $filter;

    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    this.cards = [];
    this.arenas = [];
    this.selectedArenas = [];
    this.deckCards = [];
    this.deck = {};
    this.description = '';
    this.name = '';
  }

  $onInit() {
    this.$http.get('/api/cards')
      .then(response => {
        this.cards = response.data;
      });
    this.$http.get('/api/arenas')
      .then(response => {
        this.arenas = response.data;
        angular.copy(this.arenas, this.selectedArenas);
      });
  }

  /*
  * Adds card to the deckCards array and remove it from the available cards array.
  */
  addCard(cardId) {
    if (this.deckCards.length < 8) {
      this.found = this.$filter('filter')(this.cards, {_id: cardId}, true);
      this.indexFound = this.cards.indexOf(this.found[0]);
      this.cards.splice(this.indexFound, 1);
      this.deckCards.push(this.found[0]);
    }
  }

  /*
  * Remove card from the deckCards array and add it to the available cards array.
  */
  removeCard(cardId) {
    if (this.deckCards.length > 0) {
      this.found = this.$filter('filter')(this.deckCards, {_id: cardId}, true);
      this.indexFound = this.deckCards.indexOf(this.found[0]);
      this.deckCards.splice(this.indexFound, 1);
      this.cards.push(this.found[0]);
    }
  }

  /*
  * Adds card to the deckCards array and remove it from the available cards array.
  */
  toggleArena(arenaId) {
    this.found = this.$filter('filter')(this.selectedArenas, {number: arenaId}, true);
    if (this.found.length > 0) {
      this.indexFound = this.selectedArenas.indexOf(this.found[0]);
      this.selectedArenas.splice(this.indexFound, 1);
    } else {
      this.found = this.$filter('filter')(this.arenas, {number: arenaId}, true);
      this.selectedArenas.push(this.found[0]);
    }
  }

  /*
  * Checks if an arena is selected
  */
  checkArena(arenaId) {
    return this.$filter('filter')(this.selectedArenas, {number: arenaId}, true).length > 0 || false;
  }

  /*
  * Submit a deck to the server
  */
  submitDeck() {
    console.log('Submitting');
    this.deck._creator = this.getCurrentUser;
    this.deck.arenas = this.selectedArenas;
    this.deck.cards = this.deckCards;
    this.deck.description = this.description;
    this.deck.name = this.name;
    //Do the post request
    this.$http.post('/api/decks', this.deck)
      .then(response => {
        console.log('POST success:', response);
      }, error => {
        console.log('POST error:', error);
      });
  }
}

angular.module('deckProjectApp')
  .component('deckbuilder', {
    templateUrl: 'app/deckbuilder/deckbuilder.html',
    controller: DeckbuilderComponent,
    controllerAs: 'Deckbuilder'
  });

})();
