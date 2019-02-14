import * as _ from 'lodash';
import { FixtureController } from './fixtureController';
import { TeamController } from './teamController';
import { LeagueController } from './leagueController';
const fetch = require('node-fetch');

export class CronController {
  fixtureController = new FixtureController();
  teamController = new TeamController();
  leagueController = new LeagueController();

  async getLeagues() {
    try {
      const response = await fetch('https://oliver-seibert.de/tippkoenig/leagues.json');
      const json = await response.json();
      const leagues = _.toArray(_.get(json, 'api.leagues'));
      console.log('leagues', _.size(leagues));
      _.forEach(leagues, (league) => {
        _.set(league, '_id', league.league_id);
        this.leagueController.save(league);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getTeams() {
    try {
      const response = await fetch('https://oliver-seibert.de/tippkoenig/bundesliga-teams.json');
      const json = await response.json();
      const teams = _.toArray(_.get(json, 'api.teams'));
      console.log('teams', _.size(teams));
      _.forEach(teams, (team) => {
        _.set(team, '_id', team.team_id);
        this.teamController.save(team);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getFixtures() {
    try {
      const activeLeagues = await this.leagueController.getActiveLeagues();
      // TODO: iterate over activeLeagues and get Fixtures

      const response = await fetch('https://oliver-seibert.de/tippkoenig/bundesliga-fixtures.json');
      const json = await response.json();
      const fixtures = _.toArray(_.get(json, 'api.fixtures'));
      console.log('fixtures', _.size(fixtures));
      _.forEach(fixtures, (fixture) => {
        _.set(fixture, '_id', fixture.fixture_id);
        // TODO: parse matchday from attribute round
        this.fixtureController.save(fixture);
      });
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: standings
};