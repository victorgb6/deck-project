'use strict';

var app = require('../..');
import request from 'supertest';

var newCard;

describe('Card API:', function() {

  describe('GET /api/cards', function() {
    var cards;

    beforeEach(function(done) {
      request(app)
        .get('/api/cards')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          cards = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(cards).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/cards', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/cards')
        .send({_id:'574de12cc7f71c0f00e4a73a',
        idName:'arrows',
        rarity:'Common',
        type:'Spell',
        name:'Arrows',
        description:'Arrows pepper a large area, damaging everyone hit. Reduced damage to Crown Towers.',
        arena: 0,
        elixirCost: 3,
        __v: 0})
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCard = res.body;
          done();
        });
    });

    it('should respond with the newly created card', function() {
      expect(newCard.name).to.equal('Arrows');
      expect(newCard.type).to.equal('Spell');
    });

  });

  describe('GET /api/cards/:id', function() {
    var card;

    beforeEach(function(done) {
      request(app)
        .get('/api/cards/' + newCard._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          card = res.body;
          done();
        });
    });

    afterEach(function() {
      card = {};
    });

    it('should respond with the requested card', function() {
      expect(card.name).to.equal('Arrows');
      expect(card.type).to.equal('Spell');
    });

  });

  describe('PUT /api/cards/:id', function() {
    var updatedCard;

    beforeEach(function(done) {
      request(app)
        .put('/api/cards/' + newCard._id)
        .send({
          name: 'Updated Card',
          type: 'Troop'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCard = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCard = {};
    });

    it('should respond with the updated card', function() {
      expect(updatedCard.name).to.equal('Updated Card');
      expect(updatedCard.type).to.equal('Troop');
    });

  });

  describe('DELETE /api/cards/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/cards/' + newCard._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when card does not exist', function(done) {
      request(app)
        .delete('/api/cards/' + newCard._id)
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
