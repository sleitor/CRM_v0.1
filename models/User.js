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

module.exports = {
  User: mongoose.model('users', new mongoose.Schema(model)),
};
