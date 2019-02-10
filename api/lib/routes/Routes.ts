import { Request, Response } from 'express';
import { RegistryController } from '../controllers/registryController';


export class Routes {
  public registryController: RegistryController = new RegistryController();

  public routes(app): void {
    // GET registry
    app.route('/registry').get(this.registryController.getRegistry);
  }
}
