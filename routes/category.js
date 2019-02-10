const express = require('express');
const ctrl = require('../controllers/category');
const route = express.Router();

route.get('/', ctrl.getAll);
route.get('/:id', ctrl.getById);
route.delete('/:id', ctrl.delete);
route.post('/', ctrl.create);
route.patch('/:id', ctrl.update);

module.exports = route;
