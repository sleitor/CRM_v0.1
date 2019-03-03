const {Order} = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
  try {
    return res.json(await Order.find({user: req.user.id}));
  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.create = async (req, res) => {
  try {
    const lastOrder = await Order.findOne({user: req.user._id}).sort({_id: -1}).lean();
    let order = lastOrder ? lastOrder.order : 0;

    const newOrder = await new Order({
      list: req.body.list,
      user: req.user._id,
      order,
    }).save();
    res.status(201).json(newOrder);
  } catch (e) {
    errorHandler(res, e)
  }
};
