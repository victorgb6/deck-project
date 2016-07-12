'use strict';

var app = require('../..');
import request from 'supertest';

var newDeck;

describe('Deck API:', function() {

  describe('GET /api/decks', function() {
    var decks;

    beforeEach(function(done) {
      request(app)
        .get('/api/decks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          decks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(decks).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/decks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/decks')
        .send({
          _creator: 'user',
          arenas: [0,1]
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDeck = res.body;
          done();
        });
    });

    it('should respond with the newly created deck', function() {
      expect(newDeck._creator).to.equal('user');
      expect(newDeck.arenas).to.be.instanceOf(Array);
    });

  });

  describe('GET /api/decks/:id', function() {
    var deck;

    beforeEach(function(done) {
      request(app)
        .get('/api/decks/' + newDeck._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          deck = res.body;
          done();
        });
    });

    afterEach(function() {
      deck = {};
    });

    it('should respond with the requested deck', function() {
      expect(deck._creator).to.equal('user');
      expect(deck.arenas).to.be.instanceOf(Array);
    });

  });

  describe('PUT /api/decks/:id', function() {
    var updatedDeck;

    beforeEach(function(done) {
      request(app)
        .put('/api/decks/' + newDeck._id)
        .send({
          _creator: 'user1',
          arenas: [0]
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDeck = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDeck = {};
    });

    it('should respond with the updated deck', function() {
      expect(updatedDeck._creator).to.equal('user1');
      expect(updatedDeck.arenas).to.be.instanceOf(Array);
    });

  });

  describe('DELETE /api/decks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/decks/' + newDeck._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when deck does not exist', function(done) {
      request(app)
        .delete('/api/decks/' + newDeck._id)
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
