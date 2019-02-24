var cron = require('node-cron');
import { CronController } from './controllers/cronController';

const cronController: CronController = new CronController();

const initCronjobs = async () => {
  cron.schedule('*/5 * * * *', () => {
    console.log('running getLeagues(), getTeams(), getStandings() task every five minutes');
    cronController.getLeagues();
    cronController.getTeams();
    cronController.getStandings();
  });

  cron.schedule('*/1 * * * *', () => {
    console.log('running getFixtures() task every minute');
    cronController.getFixtures();
  });

  // load data at first start
  await cronController.getLeagues();
  await cronController.getTeams();
  await cronController.getFixtures();
  await cronController.getStandings();
}

export { initCronjobs }