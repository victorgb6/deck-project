'use strict';

(function(){

class DecklistComponent {
  constructor($http, Auth) {
    this.$http = $http;
    
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;


    this.decks = [];
  }

  $onInit() {
    this.$http.get('/api/decks')
      .then(response => {
        this.decks = response.data;
      });
  }
}

angular.module('deckProjectApp')
  .component('decklist', {
    templateUrl: 'app/decklist/decklist.html',
    controller: DecklistComponent,
    controllerAs: 'Decklist'
  });

})();
