import * as mongoose from 'mongoose';
import { TeamSchema } from '../models/Team';

const Team = mongoose.model('Team', TeamSchema);

export class TeamController {
  async save(data) {
    try {
      let team = new Team(data);
      team = await Team.findOneAndUpdate({ _id: team._id }, team, { upsert: true });
    } catch (err) {
      console.log('saveTeam err', err);
    }
  }
}
