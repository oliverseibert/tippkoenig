import * as mongoose from 'mongoose';
import { FixtureSchema } from '../models/Fixture';

const Fixture = mongoose.model('Fixture', FixtureSchema);

export class FixtureController {
  async save(data: any) {
    try {
      let fixture = new Fixture(data);
      fixture = await Fixture.findOneAndUpdate({ _id: fixture._id }, fixture, { upsert: true });
    } catch (err) {
      console.log('saveFixture err', err);
    }
  }
}
