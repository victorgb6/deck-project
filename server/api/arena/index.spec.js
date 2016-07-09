'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var arenaCtrlStub = {
  index: 'arenaCtrl.index',
  show: 'arenaCtrl.show',
  create: 'arenaCtrl.create',
  update: 'arenaCtrl.update',
  destroy: 'arenaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var arenaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './arena.controller': arenaCtrlStub
});

describe('Arena API Router:', function() {

  it('should return an express router instance', function() {
    expect(arenaIndex).to.equal(routerStub);
  });

  describe('GET /api/arenas', function() {

    it('should route to arena.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'arenaCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/arenas/:id', function() {

    it('should route to arena.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'arenaCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/arenas', function() {

    it('should route to arena.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'arenaCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/arenas/:id', function() {

    it('should route to arena.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'arenaCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/arenas/:id', function() {

    it('should route to arena.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'arenaCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/arenas/:id', function() {

    it('should route to arena.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'arenaCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
