import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BettingCommunitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  league_id: {
    type: String,
    required: true,
    ref: 'League'
  },
  admin: {
    type: Schema.ObjectId,
    ref: 'Users'
  },
  users: [{
    nickname: String, // specific nickname only for this betting community
    accepted: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.ObjectId,
      ref: 'Users'
    }
  }]
});

BettingCommunitySchema.index({ name: 1, league_id: 1 });

mongoose.model('BettingCommunity', BettingCommunitySchema);

export { BettingCommunitySchema }