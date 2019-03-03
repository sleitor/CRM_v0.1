const mongoose = require('mongoose');

const model = {
  date: {
    type: Date,
    default: Date.now,
  },
  order: {
    type: Number,
    required: true,
  },
  list: [{
    name: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    cost: {
      type: Number,
    },
  }],
  user: {
    ref: 'users',
    type: mongoose.Schema.Types.ObjectId,
  },
};

module.exports = {Order: mongoose.model('orders', new mongoose.Schema(model))};
