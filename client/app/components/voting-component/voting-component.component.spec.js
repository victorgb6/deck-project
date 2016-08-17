'use strict';

describe('Component: votingComponent', function () {

  // load the component's module
  beforeEach(module('deckProjectApp'));

  var votingComponentComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController) {
    votingComponentComponent = $componentController('votingComponent', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
