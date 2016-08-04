'use strict';

describe('Component: DecklistComponent', function () {

  // load the controller's module
  beforeEach(module('deckProjectApp'));

  var DecklistComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    DecklistComponent = $componentController('decklist', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
