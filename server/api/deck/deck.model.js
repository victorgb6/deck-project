'use strict';

import mongoose from 'mongoose';

var DeckSchema = new mongoose.Schema({
  active: Boolean,
  _creator : { type: String, ref: 'User' },
  arenas: [{ type: Number, ref: 'Arena' }],
  cards: [{ type: Number, ref: 'Cards' }],
  meta: {
    upvotes: Number,
    downvotes:  Number
  },
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Deck', DeckSchema);
