const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
  _id: String, //{type: String, unique: true, required: true},
  prefix:{type: String, default: "k!"}
});

module.exports = mongoose.model('Guild', guildSchema);
