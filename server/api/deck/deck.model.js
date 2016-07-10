'use strict';

import mongoose from 'mongoose';

var DeckSchema = new mongoose.Schema({
  active: Boolean,
  _creator : { type: String, ref: 'User' },
  arenas: [Number],
  cards: [{ type: String, ref: 'Cards' }],
  meta: {
    upvotes: [Date],
    downvotes:  [Date]
  },
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Deck', DeckSchema);
