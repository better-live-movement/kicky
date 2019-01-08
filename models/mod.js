const mongoose = require('mongoose');

const modSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guild: { type: String, ref: 'Guild', required: true},
  moduleActive: {type: Boolean, default: false},
  modRoles: [String],
  logChannel: String,
  commands: {
    ban: {
      active: {type: Boolean, default: false},
      allowedRoles: [String],
      bannedRoles: [String],
      bannedChannels: [String],
      cooldown: {type: Number, default: 0},
      privateResponse: {type: Boolean, default: false},
      deleteCommand: {type: Boolean, default: false},
      reply: {type: Boolean, default: true}
    },
    clear: {
      active: {type: Boolean, default: false},
      allowedRoles: [String],
      bannedRoles: [String],
      bannedChannels: [String],
      cooldown: {type: Number, default: 0},
      privateResponse: {type: Boolean, default: false},
      deleteCommand: {type: Boolean, default: false},
      reply: {type: Boolean, default: true}
    },
    kick: {
      active: {type: Boolean, default: false},
      allowedRoles: [String],
      bannedRoles: [String],
      bannedChannels: [String],
      cooldown: {type: Number, default: 0},
      privateResponse: {type: Boolean, default: false},
      deleteCommand: {type: Boolean, default: false},
      reply: {type: Boolean, default: true}
    },
    mute: {
      active: {type: Boolean, default: false},
      allowedRoles: [String],
      bannedRoles: [String],
      bannedChannels: [String],
      cooldown: {type: Number, default: 0},
      privateResponse: {type: Boolean, default: false},
      deleteCommand: {type: Boolean, default: false},
      reply: {type: Boolean, default: true}
    }
  }
});

module.exports = mongoose.model('Mod', modSchema);
