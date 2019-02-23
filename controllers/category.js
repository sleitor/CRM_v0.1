const {Category} = require('../models/Category');
const {Position} = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
  try {
    return await Category.find({user: req.user.id})
  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.getById = async (req, res) => {
  try {
    return await Category.findById(req.params.id)
  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.delete = async (req, res) => {
  try {
    await Category.remove({_id: req.params.id});
    await Position.remove({category: req.params.id});
    res.json({message: 'Category and position was deleted'})
  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.create = async (req, res) => {
  try {
    //todo
    // return await Category.find({user: req.user.id})
  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.update = async (req, res) => {
  try {
    // todo
    // return await Category.find({user: req.user.id})
  } catch (e) {
    errorHandler(res, e)
  }
};
