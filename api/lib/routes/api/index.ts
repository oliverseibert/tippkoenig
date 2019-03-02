import * as express from 'express';
const router = express.Router();

router.use('/users', require('./users'));
router.use('/registry', require('./registry'));
router.use('/bettingCommunity', require('./bettingCommunity'));

module.exports = router;