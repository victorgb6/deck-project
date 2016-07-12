'use strict';

var app = require('../..');
import request from 'supertest';

var newArena;

describe('Arena API:', function() {

  describe('GET /api/arenas', function() {
    var arenas;

    beforeEach(function(done) {
      request(app)
        .get('/api/arenas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          arenas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(arenas).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/arenas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/arenas')
        .send({_id:'574f2adf8e458e0f00b3526e',
        idName:'training-camp',
        number:0,
        name:'Training Camp',
        victoryGold:0,
        minTrophies:0,
        __v:0,
        cardUnlocks:['574de12cc7f71c0f00e4a73a','574de15fc7f71c0f00e4a73b','574de1fbc7f71c0f00e4a73c','574f025ec31b610f00b60c35','574f027fc31b610f00b60c36','574f02a3c31b610f00b60c37','574f02c2c31b610f00b60c38','574f02ddc31b610f00b60c39','574f0300c31b610f00b60c3a','574f031dc31b610f00b60c3b','574f0333c31b610f00b60c3c','574f0354c31b610f00b60c3d'],
        chests:[],
        clan:{'donate':{'common':0,'rare':0},'request':{'common':0,'rare':0}}})
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newArena = res.body;
          done();
        });
    });

    it('should respond with the newly created arena', function() {
      expect(newArena.name).to.equal('Training Camp');
      expect(newArena.number).to.equal(0);
    });

  });

  describe('GET /api/arenas/:id', function() {
    var arena;

    beforeEach(function(done) {
      request(app)
        .get('/api/arenas/' + newArena._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          arena = res.body;
          done();
        });
    });

    afterEach(function() {
      arena = {};
    });

    it('should respond with the requested arena', function() {
      expect(arena.name).to.equal('Training Camp');
      expect(arena.number).to.equal(0);
    });

  });

  describe('PUT /api/arenas/:id', function() {
    var updatedArena;

    beforeEach(function(done) {
      request(app)
        .put('/api/arenas/' + newArena._id)
        .send({
          name: 'Goblin Stadium',
          number: '1'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedArena = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedArena = {};
    });

    it('should respond with the updated arena', function() {
      expect(updatedArena.name).to.equal('Goblin Stadium');
      expect(updatedArena.number).to.equal(1);
    });

  });

  describe('DELETE /api/arenas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/arenas/' + newArena._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when arena does not exist', function(done) {
      request(app)
        .delete('/api/arenas/' + newArena._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
