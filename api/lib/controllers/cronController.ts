import * as mongoose from 'mongoose';
import * as _ from 'lodash';
const fs = require('fs');

export class CronController {
  public testCronjob() {
    console.log('testCronjob');
  }

  public async getLeagues() {
    // TODO: get from api with fetch()
    fs.readFile('../../example_requests/leagues.json', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      const leagues = _.toArray(_.get(JSON.parse(data), 'api.leagues'));
      console.log('leagues', _.size(leagues));
      _.forEach(leagues, (league) => {
        _.set(league, '_id', league.league_id);
        // TODO: save league
      });
    });
  }

  public async getTeams() {
    // TODO: get from api with fetch()
    fs.readFile('../../example_requests/teams/bundesliga.json', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      const teams = _.toArray(_.get(JSON.parse(data), 'api.teams'));
      console.log('teams', _.size(teams));
      _.forEach(teams, (team) => {
        _.set(team, '_id', team.team_id);
        // TODO: save team
      });
    });
  }

  public async getFixtures() {
    // TODO: get from api with fetch()
    fs.readFile('../../example_requests/fixtures/bundesliga.json', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      const fixtures = _.toArray(_.get(JSON.parse(data), 'api.fixtures'));
      console.log('fixtures', _.size(fixtures));
      _.forEach(fixtures, (fixture) => {
        _.set(fixture, '_id', fixture.fixture_id);
        // TODO: save fixture
      });
    });
  }

  // TODO: standings
};