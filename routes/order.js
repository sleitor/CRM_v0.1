const express = require('express');
const passport = require('passport');
const ctrl = require('../controllers/order');
const route = express.Router();

route.get('/', passport.authenticate('jwt',{session: false}), ctrl.getAll);
route.post('/', passport.authenticate('jwt',{session: false}), ctrl.create);

module.exports = route;
