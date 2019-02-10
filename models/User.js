const mongoose = require('mongoose');

const model = {
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
};

module.exports = mongoose.model('users', new mongoose.Schema(model));
