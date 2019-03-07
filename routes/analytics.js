const express = require('express');
const passport = require('passport');
const ctrl = require('../controllers/analytics');
const route = express.Router();

route.get('/analytics', passport.authenticate('jwt',{session: false}), ctrl.analytics);
route.get('/overview-page', passport.authenticate('jwt',{session: false}), ctrl.overview);

module.exports = route;
