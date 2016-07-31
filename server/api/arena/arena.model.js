'use strict';

import mongoose from 'mongoose';

var ArenaSchema = new mongoose.Schema({
  _id: String,
  idName: String,
  number: Number,
  name: String,
  victoryGold: Number,
  minTrophies: Number,
  __v: Number,
  cardUnlocks: [{ type: String, ref: 'Card' }],
  chests: [String],
  clan: {donate: {common: Number, rare: Number}, request: {common: Number, rare: Number}}
});

export default mongoose.model('Arena', ArenaSchema);
