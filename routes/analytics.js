const express = require('express');
const ctrl = require('../controllers/analytics');
const route = express.Router();

route.get('/analytics', ctrl.analytics);
route.get('/overview', ctrl.overview);

module.exports = route;
