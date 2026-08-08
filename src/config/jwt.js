const jwt = require('jsonwebtoken');

const env = require('./env');

const sign = (payload) => {
  return jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  });
};

const verify = (token) => {
  return jwt.verify(token, env.jwt.secret);
};

module.exports = {
  sign,
  verify,
};
