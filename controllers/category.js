const {Category} = require('../models/Category');
const {Position} = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
  try {
    return res.json(await Category.find({user: req.user._id}));
  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.getById = async (req, res) => {
  try {
    return res.json(await Category.findById(req.params.id));
  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.delete = async (req, res) => {
  try {
    await Category.remove({_id: req.params.id});
    await Position.remove({category: req.params.id});
    res.json(res.json({message: 'Category and position was deleted'}));
  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.create = async (req, res) => {
  const category = new Category({
    name: req.body.name,
    user: req.user._id,
    imageSrc: req.file ? req.file.path : '',
  });
  try {
    await category.save();
    return res.status(201).json(category);

  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.update = async (req, res) => {
  const updated = {
    name: req.body.name,
  };
  if (req.file) {
    updated.imageSrc = req.file.path;
  }
  try {
    res.json(await Category.findByIdAndUpdate(req.params.id, updated, {new: true}));
  } catch (e) {
    errorHandler(res, e)
  }
};
