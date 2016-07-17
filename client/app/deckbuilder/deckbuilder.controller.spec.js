'use strict';

describe('Component: DeckbuilderComponent', function () {

  // load the controller's module
  beforeEach(module('deckProjectApp'));

  var DeckbuilderComponent;
  var $httpBackend;
  var scope;
  var state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $http, $componentController, $rootScope, $state, $filter) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/cards')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
    $httpBackend.expectGET('/api/arenas')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;

    DeckbuilderComponent = $componentController('deckbuilder', {
      $http: $http,
      $scope: scope,
      $filter: $filter
    });
  }));

  it('should attach a list of cards and arenas to the controller', function() {
    DeckbuilderComponent.$onInit();
    $httpBackend.flush();
    expect(DeckbuilderComponent.cards.length).to.be.above(0);
    expect(DeckbuilderComponent.arenas.length).to.be.above(0);
  });
});
