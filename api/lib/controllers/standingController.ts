import * as mongoose from 'mongoose';
import { StandingSchema } from '../models/Standing';

const Standing = mongoose.model('Standing', StandingSchema);

export class StandingController {
  async save(data: any) {
    try {
      let standing = new Standing(data);
      standing = await Standing.findOneAndUpdate({ league_id: standing.league_id, rank: standing.rank }, standing, { upsert: true });
    } catch (err) {
      console.log('saveFixture err', err);
    }
  }
}
