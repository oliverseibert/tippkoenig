import * as mongoose from 'mongoose';
import { UsersSchema } from '../models/Users';
import { Request, Response } from 'express';
const passport = require('passport');

const Users = mongoose.model('Users', UsersSchema);

export class UsersController {
  async register(req: any, res: any) {
    try {
      const { body: { user } } = req;

      if (!user.email) {
        return res.status(422).json({
          error: "email is required"
        });
      }

      if (!user.password) {
        return res.status(422).json({
          error: "password is required"
        });
      }

      const finalUser = new Users(user);

      finalUser.setPassword(user.password);

      const insertedUser = await finalUser.save();
      return res.json(insertedUser.toAuthJSON());
    } catch (err) {
      console.log('register error', err);
      return res.status(400).json({
        error: err.errmsg
      });
    }
  }

  async login(req: any, res: any) {
    try {
      const { body: { user } } = req;

      if (!user.email) {
        return res.status(422).json({
          error: "email is required"
        });
      }

      if (!user.password) {
        return res.status(422).json({
          error: "password is required"
        });
      }

      return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if (err) {
          return res.status(400).json({
            error: err.errmsg
          });
        }

        if (passportUser) {
          const user = passportUser;
          user.token = passportUser.generateJWT();

          return res.json({ user: user.toAuthJSON() });
        }

        return res.sendStatus(401);
      })(req, res);
    } catch (err) {
      console.log('login error', err);
      return res.status(400).json({
        error: err.errmsg
      });
    }
  }

  async current(req: any, res: any) {
    const { payload: { id } } = req;

    try {
      const user = await Users.findById(id);
      if (!user) {
        return res.sendStatus(400);
      }
      return res.json(user.toAuthJSON());
    } catch (err) {
      console.log('current error', err);
      return res.status(400).json({
        error: err.errmsg
      });
    }
  }

  async save(req: any, res: any) {
    const { body: { user } } = req;
    const { payload: { id } } = req;

    try {
      let newUser = new Users({
        _id: id,
        nickname: user.nickname,
        image: user.image,
      });
      newUser = await Users.findOneAndUpdate({ _id: id }, newUser, { upsert: true, new: true });
      return res.json(newUser.toAuthJSON());
    } catch (err) {
      console.log('save User err', err);
      res.status(400).json(err);
    }
  }
}