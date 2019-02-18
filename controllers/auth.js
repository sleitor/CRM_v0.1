const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const {User} = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
  const {email, password} = req.body;

  const candidate = await User.findOne({email}).lean();

  if (candidate) {
    //do password check
    const passwordCompare = bcrypt.compareSync(password, candidate.password);
    if (passwordCompare) {
      // create token
      const token = jwt.sign({
        email,
        _id: candidate._id
      }, keys.jwtSecret, {expiresIn: '1h'});
      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: 'Password didn\'t mach'
      })
    }
  } else {
    res.status(401).json({
      message: 'User not found'
    });
  }
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
    try {
      const user = await new User({
        email,
        password: bcrypt.hashSync(password, salt)
      }).save();
      res.status(201).json({
        message: 'User created',
        user
      })
    } catch (e) {
      errorHandler(res, e)
    }
  }
};
