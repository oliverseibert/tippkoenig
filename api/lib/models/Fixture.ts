import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FixtureSchema = new Schema({
  _id: String,
  event_timestamp: String,
  event_date: Date,
  league_id: {
    type: String,
    ref: 'League'
  },
  round: String,
  matchday: String, // custom value
  homeTeam_id: {
    type: String,
    ref: 'Team'
  },
  awayTeam_id: {
    type: String,
    ref: 'Team'
  },
  homeTeam: String,
  awayTeam: String,
  status: String,
  statusShort: String,
  goalsHomeTeam: String,
  goalsAwayTeam: String,
  halftime_score: String,
  final_score: String,
  penalty: String,
  elapsed: String,
  firstHalfStart: String,
  secondHalfStart: String
});
