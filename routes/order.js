const express = require('express');
const ctrl = require('../controllers/order');
const route = express.Router();

route.get('/', ctrl.getAll);
route.post('/', ctrl.create);

module.exports = route;
