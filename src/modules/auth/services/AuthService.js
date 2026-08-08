const UnauthorizedError = require('../../../core/errors/UnauthorizedError');

const jwt = require('../../../config/jwt');
const passwordHelper = require('../../../core/helpers/password.helper');

const userRepository = require('../../users/repositories/UserRepository');

class AuthService {
  async login(correo, password) {
    const user = await userRepository.findByEmail(correo);

    if (!user) {
      throw new UnauthorizedError('Credenciales inválidas.');
    }

    const validPassword = await passwordHelper.compare(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedError('Credenciales inválidas.');
    }

    const token = jwt.sign({
      id: user._id.toString(),
      rol: user.rol?._id?.toString(),
    });

    user.password = undefined;

    return {
      token,
      user,
    };
  }
}

module.exports = new AuthService();
