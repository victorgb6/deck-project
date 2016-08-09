'use strict';

import mongoose from 'mongoose';

var DeckSchema = new mongoose.Schema({
  active: { type: Boolean, default: false },
  _creator : { type: String, ref: 'User' },
  ownerName: String,
  name: String,
  arenas: [{ type: String, ref: 'Arena' }],
  cards: [{ type: String, ref: 'Card' }],
  meta: {
    upvotes: [Date],
    downvotes:  [Date]
  },
  avgelixir: Number,
  views: Number,
  description: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Deck', DeckSchema);
