'use strict';

describe('Component: DeckbuilderComponent', function () {

  // load the controller's module
  beforeEach(module('deckProjectApp'));

  var DeckbuilderComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    DeckbuilderComponent = $componentController('deckbuilder', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
