const {Position} = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCategoryId = async (req, res) => {
  try {
    const positions = await Position.find({
      category: req.params.categoryId,
      user: req.user.id
    }).lean();
    res.status(200).json(positions);
  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.delete = async (req, res) => {
  try {
    await Position.remove({ _id: req.params.id, user: req.user.id });
    res.status(200).json({
      success: true,
      message: "Position was deleted"
    })
  } catch (e) {
    errorHandler(res, e)
  }

};

module.exports.create = async (req, res) => {
  try {
    const position = await new Position({
      ...req.body,
      user: req.user.id
    }).save();
    res.status(201).json(position)
  } catch (e) {
    errorHandler(res, e)
  }

};

module.exports.update = async (req, res) => {
  try {
    const position = await Position.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
    res.status(200).json(position)
  } catch (e) {
    errorHandler(res, e)
  }

};
