const router = require('express').Router();
const auth = require('../auth');

import { RegistryController } from '../../controllers/registryController';
const registryController: RegistryController = new RegistryController();

router.get('/', auth.optional, registryController.getRegistry);

module.exports = router;