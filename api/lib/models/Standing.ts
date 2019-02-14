import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const StandingSchema = new Schema({
  league_id: String, // custom field
  rank: String,
  teamName: String,
  matchsPlayed: String,
  win: String,
  draw: String,
  lose: String,
  goalsFor: String,
  goalsAgainst: String,
  goalsDiff: String,
  points: String,
  lastUpdate: Date,
});


StandingSchema.index({ league_id: 1, rank: 1 });

export { StandingSchema }