const mongoose = require('mongoose');

const model = {
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  imageSrc: {
    type: String,
    default: '',
  },
  category: {
    ref: 'categories',
    type: mongoose.Schema.Types.ObjectId,
  },
  user: {
    ref: 'users',
    type: mongoose.Schema.Types.ObjectId,
  },
};

module.exports = {Position: mongoose.model('positions', new mongoose.Schema(model))};
