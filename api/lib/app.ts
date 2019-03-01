import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { initCronjobs } from './cronjobs';
var cors = require('cors');
require('dotenv').config();

// load models + auth
require('./models/Users');
require('./models/Registry');
require('./config/passport');

class App {
  public app: express.Application;
  public mongoUrl: string =
    'mongodb://tippkoenigUser:jf984ntf#@localhost/tippkoenig';

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.config();
    this.app.use(require('./routes'));
    this.mongoSetup();
    initCronjobs();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      this.mongoUrl,
      { useNewUrlParser: true }
    );
  }
}

export default new App().app;
