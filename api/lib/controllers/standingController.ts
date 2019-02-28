import * as mongoose from 'mongoose';
import { StandingSchema } from '../models/Standing';

const Standing = mongoose.model('Standing', StandingSchema);

export class StandingController {
  async save(data: any) {
    try {
      let standing = await Standing.findOneAndUpdate({ league_id: data.league_id, rank: data.rank }, data, { upsert: true });
    } catch (err) {
      console.log('saveFixture err', err);
    }
  }
}
