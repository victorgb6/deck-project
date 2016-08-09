'use strict';

describe('Component: DeckdetailComponent', function () {

  // load the controller's module
  beforeEach(module('deckProjectApp'));

  var DeckdetailComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    DeckdetailComponent = $componentController('deckdetail', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
