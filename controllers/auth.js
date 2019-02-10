const { User } = require('../models/User');

module.exports.login = (req, res) => {
  res.status(200).json({
    login: req.body.email,
    password: req.body.password
  })
};

module.exports.register = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  user.save()
    .then(() => res.status(200).json({message: 'User created'}))
    .catch((e) => {
      console.log(e);
      res.status(400).json({message: 'Something wrong'});
    });
};
