module.exports.login = (req, res) => {
  res.status(200).json({
    message: "login from controller"
  })
};

module.exports.register = (req, res) => {
  res.status(200).json({
    message: 'register from controller'
  })
};
