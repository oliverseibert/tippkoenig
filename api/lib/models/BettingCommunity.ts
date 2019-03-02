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
    type: Schema.ObjectId,
    ref: 'Users'
  }]
});

mongoose.model('BettingCommunity', BettingCommunitySchema);

export { BettingCommunitySchema }