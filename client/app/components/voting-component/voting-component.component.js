'use strict';

(function(){

  class votingComponentComponent {
    /*@ngInject*/
    constructor($http) {
      this.$http = $http;

      this.netvotes = 0;
      this.deck = null;
    }

    $onInit() {

    }

    $onChanges(changesObj) {
      if (this.deck != undefined) {
        console.log('deck', this.deck);
        this.netvotes = this.deck.meta.upvotes - this.deck.meta.downvotes;
      }
    }


  }

  angular.module('deckProjectApp')
    .component('votingComponent', {
      template: '<span><i class="fa fa-plus-square" aria-hidden="true"></i></span><span ng-class="votingCtrl.netvotes >= 0 ? \'positive\' : \'negative\' ">{{votingCtrl.netvotes}}</span><span><i class="fa fa-minus-square" aria-hidden="true"></i></span>',
      bindings: { deck: '<' },
      controller: votingComponentComponent,
      controllerAs: 'votingCtrl'
    });

})();
