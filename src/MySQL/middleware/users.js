require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  validateRegister: (req, res, next) => {
    if (
      !req.body.username ||
      req.body.username.length < process.env.USERNAME_MIN_LENGTH
    ) {
      return res.status(400).send({
        msg: `Please enter a username with min. ${process.env.USERNAME_MIN_LENGTH} chars`,
      });
    }

    if (
      !req.body.password ||
      req.body.password.length < process.env.PASSWORD_MIN_LENGTH
    ) {
      return res.status(400).send({
        msg: `Please enter a password with min. ${process.env.PASSWORD_MIN_LENGTH} chars`,
      });
    }

    if (
      !req.body.password_repeat ||
      req.body.password !== req.body.password_repeat
    ) {
      return res.status(400).send({
        msg: 'Both passwords must match',
      });
    }

    next();
  },
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: 'Your session is not valid!',
      });
    }
  },
};
