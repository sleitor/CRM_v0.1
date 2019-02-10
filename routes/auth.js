const express = require('express');
const ctrl = require('../controllers/auth');
const route = express.Router();

route.post('/login', ctrl.login);
route.post('/register', ctrl.register);

module.exports = route;
