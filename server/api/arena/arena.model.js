'use strict';

import mongoose from 'mongoose';

var ArenaSchema = new mongoose.Schema({
  number: Number,
  name: String,
  cards: [{ type: Number, ref: 'Cards' }]
});

export default mongoose.model('Arena', ArenaSchema);
