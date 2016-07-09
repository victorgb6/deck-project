'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var cardCtrlStub = {
  index: 'cardCtrl.index',
  show: 'cardCtrl.show',
  create: 'cardCtrl.create',
  update: 'cardCtrl.update',
  destroy: 'cardCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cardIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './card.controller': cardCtrlStub
});

describe('Card API Router:', function() {

  it('should return an express router instance', function() {
    expect(cardIndex).to.equal(routerStub);
  });

  describe('GET /api/cards', function() {

    it('should route to card.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'cardCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/cards/:id', function() {

    it('should route to card.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'cardCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/cards', function() {

    it('should route to card.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'cardCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/cards/:id', function() {

    it('should route to card.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'cardCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/cards/:id', function() {

    it('should route to card.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'cardCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/cards/:id', function() {

    it('should route to card.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'cardCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
