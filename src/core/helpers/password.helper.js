const bcrypt = require('bcrypt');

const env = require('../../config/env');

const hash = (password) => {
  return bcrypt.hash(password, env.bcrypt.rounds);
};

const compare = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hash,
  compare,
};
