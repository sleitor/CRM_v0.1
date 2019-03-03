const express = require('express');
const passport = require('passport');
const ctrl = require('../controllers/category');
const upload = require('../middleware/fileStorage');
const route = express.Router();

route.get('/', passport.authenticate('jwt', {session: false}), ctrl.getAll);
route.get('/:id', passport.authenticate('jwt', {session: false}), ctrl.getById);
route.delete('/:id', passport.authenticate('jwt', {session: false}), ctrl.delete);
route.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), ctrl.create);
route.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), ctrl.update);

module.exports = route;
