const express = require('express');
const passport = require('passport');
const ctrl = require('../controllers/position');
const route = express.Router();

route.get('/:categoryId', passport.authenticate('jwt',{session: false}), ctrl.getByCategoryId);
route.post('/', ctrl.create);
route.patch('/:id', ctrl.update);
route.delete('/:id', ctrl.delete);

module.exports = route;
