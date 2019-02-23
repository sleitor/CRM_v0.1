const mongoose = require('mongoose');

const model = {
  name: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    default: '',
  },
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
};

module.exports = {Category: mongoose.model('categories', new mongoose.Schema(model))};
