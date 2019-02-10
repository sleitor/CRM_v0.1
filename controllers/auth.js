const bcrypt = require('bcrypt');
const {User} = require('../models/User');

module.exports.login = (req, res) => {
  res.status(200).json({
    login: req.body.email,
    password: req.body.password
  })
};

module.exports.register = async (req, res) => {
  const {email, password} = req.body;

  const candidate = await User.findOne({email});

  if (candidate) {
    res.status(409).json({
      message: 'This email already Use',
    });
  } else {
    // Creating user process
    const salt = bcrypt.genSaltSync();
    const user = await new User({
      email,
      password: bcrypt.hashSync(password, salt)
    }).save();
    res.status(201).json({
      message: 'User created',
      user
    })
  }
};
