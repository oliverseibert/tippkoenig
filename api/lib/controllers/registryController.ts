import * as mongoose from 'mongoose';
import { RegistrySchema } from '../models/Registry';
import { Request, Response } from 'express';

const Registry = mongoose.model('Registry', RegistrySchema);

export class RegistryController {
  async getRegistry(req: Request, res: Response) {
    try {
      let registry = await Registry.findOne({ _id: "1" });
      if (registry === null) {
        res.status(404);
      }
      res.json(registry);
    } catch (err) {
      console.log('getRegistry err', err);
      res.status(500).send(err);
    }
  }
}
