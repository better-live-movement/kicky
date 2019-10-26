const mongoose = require('mongoose');

const greeterSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guild_id: { type: String, ref: 'Guild', required: true},
  moduleActive: {type: Boolean, default: false},
  greetNewbies:{type: Boolean, default: false},
  greetChannel: { type: String, default: ""},
  greetText: {type: String, default: "Hey {user}, welcome to **{server}**!"},
  greetPrivate: {type: Boolean, default: false},
  privateMessage: {type: String, default: "Hey {user}, welcome to **{server}**!"},
  setNewbieRole: {type: Boolean, default: false},
  newbieRoles: [String],
  sendLeaveMessage: {type: Boolean, default: false},
  leaveChannel: String,
  leaveMessage: {type: String, default: "**{user.idname}** just left the server 🙁"}
});

module.exports = mongoose.model('Greeter', greeterSchema);
