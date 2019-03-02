import * as mongoose from 'mongoose';
import { BettingCommunitySchema } from '../models/BettingCommunity';
import { Request, Response } from 'express';
const passport = require('passport');

const BettingCommunity = mongoose.model('BettingCommunity', BettingCommunitySchema);

export class BettingCommunityController {
  // TODO mariback
  // get + save siehe usersController.current() + usersController.save()
}