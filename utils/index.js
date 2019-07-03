const jwt = require('jsonwebtoken');
const mongooseError = require('mongoose').Error;

const { jwtSecret, jwtPrefix } = require('../constants/');

const createToken = payload =>
  console.log(payload) ||
  jwt.sign(payload, jwtSecret, {
    expiresIn: '1h'
  });

const validateToken = tokenString => {
  const token = tokenString.slice(jwtPrefix.length);
  return jwt.verify(token, jwtSecret);
};

const handleError = (err, next) => {
  console.log('\x1b[31m%s\x1b[0m', JSON.stringify(err));
  console.log(err.code);
  console.log(err instanceof mongooseError.ValidationError);
  next(new Error(err));
};

module.exports = {
  createToken,
  validateToken,
  handleError
};
