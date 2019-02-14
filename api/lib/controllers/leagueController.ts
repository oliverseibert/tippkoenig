import * as mongoose from 'mongoose';
import { LeagueSchema } from '../models/League';

const League = mongoose.model('League', LeagueSchema);

export class LeagueController {
  async save(data: any) {
    try {
      let league = new League(data);
      league = await League.findOneAndUpdate({ _id: league._id }, league, { upsert: true });
    } catch (err) {
      console.log('saveLeague err', err);
    }
  }

  async getActiveLeagues() {
    try {
      const leagues = await League.find({ active: true });
      return leagues;
    } catch (err) {
      console.log('getActiveLeagues err', err);
    }
  }
}
