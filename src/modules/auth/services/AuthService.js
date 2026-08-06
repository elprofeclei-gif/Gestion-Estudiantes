const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const env = require('../../../config/env');

const UnauthorizedError = require('../../../core/errors/UnauthorizedError');
const userRepository = require('../../users/repositories/UserRepository');

class AuthService {
  async login(correo, password) {
    const user = await userRepository.findByEmail(correo);

    if (!user) {
      throw new UnauthorizedError('Credenciales inválidas.');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new UnauthorizedError('Credenciales inválidas.');
    }

    const token = jwt.sign(
      {
        id: user._id,
        rol: user.rol._id,
      },
      env.jwt.secret,
      {
        expiresIn: env.jwt.expiresIn,
      }
    );

    user.password = undefined;

    return {
      token,
      user,
    };
  }
}

module.exports = new AuthService();
