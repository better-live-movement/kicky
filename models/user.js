const mongoose = require('mongoose');

const levelsSchema = mongoose.Schema({
  guildId: {type: String, required: true},
  mergedXP: {type: Number, default: 0},
  postsXP: {type: Number, default: 0},
  invitesXP: {type: Number, default: 0},
});

const userSchema = mongoose.Schema({
  _id: {type: String, unique: true, required: true},
  levels: [levelsSchema]
});

module.exports = mongoose.model('User', userSchema);
