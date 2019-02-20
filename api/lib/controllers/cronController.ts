import * as _ from 'lodash';
import { FixtureController } from './fixtureController';
import { TeamController } from './teamController';
import { LeagueController } from './leagueController';
const fetch = require('node-fetch');

const production = process.env.production === 'true';
const httpHeaders = {
  'X-RapidAPI-Key': process.env.football_api_key,
  'Accept': 'application/json'
};

export class CronController {
  fixtureController = new FixtureController();
  teamController = new TeamController();
  leagueController = new LeagueController();

  async getLeagues() {
    try {
      const response = await fetch('https://oliver-seibert.de/tippkoenig/leagues.json');
      // const response = await fetch(`https://api-football-v1.p.rapidapi.com/leagues}`, httpHeaders);
      const json = await response.json();
      const leagues = _.toArray(_.get(json, 'api.leagues'));

      console.log('leagues', _.size(leagues));

      _.forEach(leagues, (league) => {
        _.set(league, '_id', league.league_id);

        // set leagues only active on development env, in prod you have to change it in the db
        if (production) {
          const leaguesToSetActive = _.split(process.env.active_leagues, ','); // for development
          if (_.includes(leaguesToSetActive, league._id)) league.active = true;
        }

        this.leagueController.save(league);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getTeams() {
    try {
      const activeLeagues = await this.leagueController.getActiveLeagues();

      // iterate over activeLeagues and get teams for each
      _.forEach(activeLeagues, async (league) => {
        const response = await fetch('https://oliver-seibert.de/tippkoenig/bundesliga-teams.json');
        // const response = await fetch(`https://api-football-v1.p.rapidapi.com/teams/league/${league._id}`, httpHeaders);
        const json = await response.json();
        const teams = _.toArray(_.get(json, 'api.teams'));

        console.log(`teams count for league ${league.name}`, _.size(teams));

        _.forEach(teams, (team) => {
          _.set(team, '_id', team.team_id);
          this.teamController.save(team);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getFixtures() {
    try {
      const activeLeagues = await this.leagueController.getActiveLeagues();

      // iterate over activeLeagues and get fixtures for each
      _.forEach(activeLeagues, async (league) => {
        const response = await fetch('https://oliver-seibert.de/tippkoenig/bundesliga-fixtures.json');
        // const response = await fetch(`https://api-football-v1.p.mashape.com/fixtures/league/${league._id}`, httpHeaders);
        const json = await response.json();
        const fixtures = _.toArray(_.get(json, 'api.fixtures'));

        console.log(`fixtures count for league ${league.name}`, _.size(fixtures));

        _.forEach(fixtures, (fixture) => {
          _.set(fixture, '_id', fixture.fixture_id);
          // parse matchday from attribute: e.g. get "11" from "Bundesliga - 11"
          fixture.matchday = _.trim(_.last(_.split(fixture.round, '-')));
          this.fixtureController.save(fixture);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: standings
};