var cron = require('node-cron');
import { CronController } from './controllers/cronController';

const cronController: CronController = new CronController();

const initCronjobs = () => {
  cron.schedule('*/5 * * * *', () => {
    console.log('running testCronjob task every five minutes');
    cronController.testCronjob();
    cronController.getLeagues();
    cronController.getTeams();
  });

  cron.schedule('*/1 * * * *', () => {
    console.log('running getFixtures task every minute');
    cronController.getFixtures();
  });
}

export { initCronjobs }