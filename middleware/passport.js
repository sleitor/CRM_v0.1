const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');

const keys = require('../config/keys');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwtSecret,
};

module.exports = (passport) => {
  passport.use(
    new JWTStrategy((options),
    async (payload, done) => {
      try {
        const user = await User.findById(payload._id).select('email id').lean();
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      } catch (e) {
        return done(e, false)
      }
    }
  ))
};
