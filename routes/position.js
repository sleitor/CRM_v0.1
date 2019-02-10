const express = require('express');
const ctrl = require('../controllers/position');
const route = express.Router();

route.get('/:categoryId', ctrl.getByCategoryId);
route.post('/', ctrl.create);
route.patch('/:id', ctrl.update);
route.delete('/:id', ctrl.delete);

module.exports = route;
