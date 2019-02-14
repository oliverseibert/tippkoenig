import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const LeagueSchema = new Schema({
  _id: String,
  name: String,
  country: String,
  season: String,
  season_start: Date,
  season_end: Date,
  logo: String,
  standings: Boolean
});
