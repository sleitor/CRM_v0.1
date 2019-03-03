const express = require('express');
const passport = require('passport');
const ctrl = require('../controllers/position');
const route = express.Router();

route.get('/:categoryId', passport.authenticate('jwt',{session: false}), ctrl.getByCategoryId);
route.post('/', passport.authenticate('jwt',{session: false}), ctrl.create);
route.patch('/:id', passport.authenticate('jwt',{session: false}), ctrl.update);
route.delete('/:id', passport.authenticate('jwt',{session: false}), ctrl.delete);

module.exports = route;
