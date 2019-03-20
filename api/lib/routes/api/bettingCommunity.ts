const router = require('express').Router();
const auth = require('../auth');

import { BettingCommunityController } from '../../controllers/bettingCommunityController';
const bettingCommunityController: BettingCommunityController = new BettingCommunityController();

//POST get betting community for specific id
router.get('/:id', auth.optional, bettingCommunityController.getById);

//POST get betting communites of logged in user (required, only authenticated users have access)
router.get('/', auth.required, bettingCommunityController.getForUser);

//POST new betting round route (required, only authenticated users have access)
router.post('/', auth.required, bettingCommunityController.save);

// TODO: invite user

module.exports = router;