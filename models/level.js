const mongoose = require('mongoose');

const rewardsSchema = mongoose.Schema({
  rollId: String,
  triggerLevel: {type: Number}
});

const levelSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guild: { type: String, ref: 'Guild', required: true},
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
});

module.exports = mongoose.model('Level', levelSchema);
