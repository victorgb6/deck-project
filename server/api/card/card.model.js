'use strict';

import mongoose from 'mongoose';

var CardSchema = new mongoose.Schema({
  name: String,
  arena: { type: Number, ref: 'Arena' },
  image: String,
  elixir: Number,
  type: String,
  tier: String
});

export default mongoose.model('Card', CardSchema);
