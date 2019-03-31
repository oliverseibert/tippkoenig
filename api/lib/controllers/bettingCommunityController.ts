import * as mongoose from 'mongoose';
import { BettingCommunitySchema } from '../models/BettingCommunity';
import { Request, Response } from 'express';
const passport = require('passport');

const BettingCommunity = mongoose.model('BettingCommunity', BettingCommunitySchema);

export class BettingCommunityController {
  async getById(req: any, res: any) {
    try {
      const bettingCommunity = await BettingCommunity.findById(req.params.id)
        .populate('league_id')
        .populate('admin', '_id email nickname image')
        .populate('users.user', '_id email nickname image');

      if (!bettingCommunity) {
        return res.sendStatus(404);
      }
      return res.json(bettingCommunity);
    } catch (err) {
      console.log('getById error', err);
      return res.status(400).json({
        error: err.errmsg
      });
    }
  }

  async getForUser(req: any, res: any) {
    const authUser = req.payload; // id, email

    try {
      const bettingCommunities = await BettingCommunity.find({ "users.user": authUser.id })
        .populate('league_id')
        .populate('admin', '_id email nickname image')
        .populate('users.user', '_id email nickname image');

      return res.json(bettingCommunities);
    } catch (err) {
      console.log('getForUser error', err);
      return res.status(400).json({
        error: err.errmsg
      });
    }
  }

  async save(req: any, res: any) {
    const authUser = req.payload; // id, email

    try {
      const json = req.body;

      if (!json.name) {
        return res.status(422).json({
          error: "name is required"
        });
      }

      if (!json.league_id) {
        return res.status(422).json({
          error: "league_id is required"
        });
      }

      const result = await BettingCommunity.findOne({ name: json.name, league_id: json.league_id });
      if (result) {
        return res.status(400).json({
          error: "betting community with this name and league already exists"
        });
      }

      json.admin = authUser.id;
      json.users = [
        {
          active: true,
          accepted: true,
          user: authUser.id
        }
      ];

      const bettingCommunity = new BettingCommunity(json);
      const insertedBettingCommunity = await bettingCommunity.save();
      return res.json(insertedBettingCommunity);
    } catch (err) {
      console.log('save bettingCommunity err', err);
      res.status(400).json(err);
    }
  }

  async inviteUser(req: any, res: any) {
    const authUser = req.payload; // id, email

    try {
      const bettingCommunity = await BettingCommunity.findById(req.params.id).populate('users.user', '_id email');
      if (!bettingCommunity) {
        return res.sendStatus(404);
      }

      // only admin is allowed to invite new users
      if (bettingCommunity.admin !== authUser.id) {
        return res.sendStatus(403);
      }

      // TODO: check already invited

      // TODO: add + save, create user if it doesnt exist or new attribute invitationMail in BettingCommunity.users?

      // TODO: send mail to new user

    } catch (err) {
      console.log('inviteUser err', err);
      res.status(400).json(err);
    }
  }
}