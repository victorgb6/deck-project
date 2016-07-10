'use strict';

import mongoose from 'mongoose';

var CardSchema = new mongoose.Schema({
  _id: String,
  idName: String,
  rarity: String,
  type: String,
  name: String,
  description: String,
  arena: Number,
  elixirCost: Number,
  __v: Number
});

export default mongoose.model('Card', CardSchema);
