const mongoose = require('mongoose');

let now = new Date();
let fiveSeconds = new Date(now.getTime() + 5*1000);
let twentyFour = new Date(now.getTime() + 24*60*60*1000);

const sugSchema = mongoose.Schema({
  user: String,
  timeout: {type: Date, default: fiveSeconds}
});

const salesSchema = mongoose.Schema({
  productName: String,
  link: String,
  saleStart: {type: Date, default: Date.now},
  saleEnd: {type: Date, default: twentyFour},
});

const rewardsSchema = mongoose.Schema({
  rollId: String,
  triggerLevel: {type: Number}
});

const guildSchema = mongoose.Schema({
  _id: String, //{type: String, unique: true, required: true},
  prefix:{type: String, default: "k!"},
  greeterModule: {
    moduleActive: {type: Boolean, default: false},
    greetNewbies:{type: Boolean, default: false},
    greetChannel: String,
    greetText: {type: String, default: "Hey {user}, welcome to **{server}**!"},
    greetPrivate: {type: Boolean, default: false},
    privateMessage: {type: String, default: "Hey {user}, welcome to **{server}**!"},
    setNewbieRole: {type: Boolean, default: false},
    newbieRoles: [String],
    sendLeaveMessage: {type: Boolean, default: false},
    leaveChannel: String,
    leaveMessage: {type: String, default: "**{user.idname}** just left the server 🙁"}
  },
  moderationModule: {
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
  },
  levelsModule: {
    moduleActive: {type: Boolean, default: false},
    mergeXP: {
      active: {type: Boolean, default: false},
      mergeRewards: [rewardsSchema]
    },
    postsMode: {
      active: {type: Boolean, default: false},
      postsRewards: [rewardsSchema]
    },
    invitesMode: {
      active: {type: Boolean, default: false},
      invitesRewards: [rewardsSchema]
    },
    advancedMode: {
      active: {type: Boolean, default: false}
    }
  },
  musicModule: {
    moduleActive: {type: Boolean, default: false},
    sugMode: {type: Boolean, default: false},
    suggestions: [sugSchema],
    skipMode: {type: Number, default: 0}, //0 niemand, 1 jeder, 2 nur owner oder controller, 3 mehrheit controller, 4 mehrheit alle
    skipVote: [String],
    queue: [String],
    twentyFourSeven: {type: Boolean, default: false}
  },
  salesModule: {
    moduleActive: {type: Boolean, default: false},
    sendSalesPrivate: {type: Boolean, default: false},
    sales : [salesSchema]
  }
});

module.exports = mongoose.model('Guild', guildSchema);
