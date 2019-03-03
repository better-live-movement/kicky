const mongoose = require('mongoose');

let now = new Date();
let fiveSeconds = new Date(now.getTime() + 5*1000);

const sugSchema = mongoose.Schema({
  user: String,
  timeout: {type: Date, default: fiveSeconds}
});

const musicSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guild: { type: String, ref: 'Guild', required: true},
  moduleActive: {type: Boolean, default: false},
  sugMode: {type: Boolean, default: false},
  suggestions: [sugSchema],
  skipMode: {type: Number, default: 0}, //0 niemand, 1 jeder, 2 nur owner oder controller, 3 mehrheit controller, 4 mehrheit alle
  skipVote: [String],
  queue: [String],
  twentyFourSeven: {type: Boolean, default: false}
});

module.exports = mongoose.model('Music', musicSchema);
