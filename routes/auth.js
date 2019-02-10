const express = require('express');
const ctrl = require('../controllers/auth');
const route = express.Router();

route.get('/login', ctrl.login);
route.get('/register', ctrl.register);

module.exports = route;
