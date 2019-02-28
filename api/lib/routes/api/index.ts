import * as express from 'express';
const router = express.Router();

router.use('/users', require('./users'));
router.use('/registry', require('./registry'));

module.exports = router;