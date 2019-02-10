import * as mongoose from 'mongoose';
import { RegistrySchema } from '../models/Registry';
import { Request, Response } from 'express';

const Registry = mongoose.model('Registry', RegistrySchema);

export class RegistryController {
  public getRegistry(req: Request, res: Response) {
    Registry.findOne({ registryId: 1 }, (err, registry) => {
      if (err) {
        res.status(500).send(err);
      }
      if (registry === null) {
        res.status(404);
      }
      res.json(registry);
    });
  }
}
