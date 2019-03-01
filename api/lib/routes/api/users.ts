const mongoose = require('mongoose');
const passport = require('passport');
import * as jwt from 'express-jwt';
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

import { UsersController } from '../../controllers/usersController';
const usersController: UsersController = new UsersController();

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, usersController.register);

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, usersController.login);

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, usersController.current);

//POST save user (required, only authenticated users have access)
router.post('/:id', auth.required, usersController.save);

module.exports = router;