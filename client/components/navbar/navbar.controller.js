'use strict';

class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.menu = [{state: 'deckbuilder', title: 'deckbuilder'}];
  }

}

angular.module('deckProjectApp')
  .controller('NavbarController', NavbarController);
