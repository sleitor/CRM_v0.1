const {Order} = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

// (get) localhost:5000/order?skip=15&limit=5&start=<date>&end=<date>&order=4
module.exports.getAll = async (req, res) => {
  const query = {
    user: req.user._id
  };

  if (req.query.start) {
    query.date = {
      $gte: req.query.start,
    }
  }

  if (req.query.end) {
    if (!query.date) query.date = {};

    query.date.$lte = req.query.end;
  }

  if (req.query.order) {
    query.order = req.query.order
  }

  try {
    const orders = await Order
      .find(query)
      .sort({date: -1})
      .skip(+req.query.skip)
      .limit(+req.query.limit)
      .lean();
    return res.status(200).json(orders);
  } catch (e) {
    errorHandler(res, e)
  }
};

module.exports.create = async (req, res) => {
  try {
    const lastOrder = await Order.findOne({user: req.user._id}).sort({_id: -1}).lean();
    let order = lastOrder ? lastOrder.order : 0;
    order++;

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
