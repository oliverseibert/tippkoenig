const router = require('express').Router();
const auth = require('../auth');

import { BettingCommunityController } from '../../controllers/bettingCommunityController';
const bettingCommunityController: BettingCommunityController = new BettingCommunityController();

//POST get betting community of logged in user route  (required, only authenticated users have access)
// router.get('/', auth.optional, null); // TODO mariback

//POST new betting round route (required, only authenticated users have access)
// router.post('/', auth.required, null); // TODO mariback

module.exports = router;