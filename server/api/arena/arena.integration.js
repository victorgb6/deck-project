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
        .send({
          name: 'New Arena',
          info: 'This is the brand new arena!!!'
        })
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
      expect(newArena.name).to.equal('New Arena');
      expect(newArena.info).to.equal('This is the brand new arena!!!');
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
      expect(arena.name).to.equal('New Arena');
      expect(arena.info).to.equal('This is the brand new arena!!!');
    });

  });

  describe('PUT /api/arenas/:id', function() {
    var updatedArena;

    beforeEach(function(done) {
      request(app)
        .put('/api/arenas/' + newArena._id)
        .send({
          name: 'Updated Arena',
          info: 'This is the updated arena!!!'
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
      expect(updatedArena.name).to.equal('Updated Arena');
      expect(updatedArena.info).to.equal('This is the updated arena!!!');
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
