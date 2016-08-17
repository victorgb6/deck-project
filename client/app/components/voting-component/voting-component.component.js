'use strict';

(function(){

  class votingComponentComponent {
    /*@ngInject*/
    constructor($http, Auth) {
      this.$http = $http;

      this.isLoggedIn = Auth.isLoggedIn;
      this.isAdmin = Auth.isAdmin;
      this.getCurrentUser = Auth.getCurrentUser;
      this.userId = this.getCurrentUser()._id;

      this.netvotes = 0;
      this.deck = null;
    }

    $onInit() {

    }

    $onChanges(changesObj) {
      if (this.deck != undefined) {
        this.netvotes = this.deck.meta.upvotes.length - this.deck.meta.downvotes.length;
      }
    }

    /*
    * This function saves an upvote
    */
    saveVote(type) {
      var now = new Date();
      if (this.isLoggedIn() && this.checkVotes(type)) {

        if (type) {
          this.deck.meta.upvotes.push({user: this.userId, date: now});
          this.netvotes += 1;
        } else {
          this.deck.meta.downvotes.push({user: this.userId, date: now});
          this.netvotes -= 1;
        }
        console.log('DECK PUT', this.deck);
        this.$http.put('/api/decks/'+this.deck._id, this.deck)
          .then(response => {
            console.log('PUT success:', response);
          }, error => {
            console.log('PUT error:', error);
          });
      } else {
        //TODO: Here should be a popup with the message.
        console.log('User must be registered or has already vote. Check:', this.checkVotes(type));
      }
    }

    /*
    * This function check if the user has already vote
    */
    checkVotes() {
      var result = true;
        this.deck.meta.upvotes.map(vote => {
          if(vote.user == this.userId) {
            result = false;
          }
        });
        this.deck.meta.downvotes.map(vote => {
          if(vote.user == this.userId) {
            result = false;
          }
        });
      return result;
    }

  }

  angular.module('deckProjectApp')
    .component('votingComponent', {
      template: '<span><i ng-click="votingCtrl.saveVote(true)" class="fa fa-plus-square" aria-hidden="true"></i></span><span ng-class="votingCtrl.netvotes >= 0 ? \'positive\' : \'negative\' ">{{votingCtrl.netvotes}}</span><span><i ng-click="votingCtrl.saveVote(false)" class="fa fa-minus-square" aria-hidden="true"></i></span>',
      bindings: { deck: '<' },
      controller: votingComponentComponent,
      controllerAs: 'votingCtrl'
    });

})();
