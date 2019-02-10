var cron = require('node-cron');
import { CronController } from './controllers/cronController';

const cronController: CronController = new CronController();

const initCronjobs = () => {
  cron.schedule('*/5 * * * *', () => {
    console.log('running testCronjob task every five minutes');
    cronController.testCronjob();
  });
}

export { initCronjobs }