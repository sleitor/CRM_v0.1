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

module.exports.delete = (req, res) => {
  try {

  } catch (e) {
    errorHandler(res, e)
  }

};

module.exports.create = (req, res) => {
  try {

  } catch (e) {
    errorHandler(res, e)
  }

};

module.exports.update = (req, res) => {
  try {

  } catch (e) {
    errorHandler(res, e)
  }

};
