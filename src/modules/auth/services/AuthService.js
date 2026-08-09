const jwt = require('../../../config/jwt');
const passwordHelper = require('../../../core/helpers/password.helper');
const UnauthorizedError = require('../../../core/errors/UnauthorizedError');

const userRepository = require('../../users/repositories/UserRepository');

class AuthService {
  async login(correo, password) {
    const usuario = await userRepository.findByEmail(correo);

    if (!usuario) {
      throw new UnauthorizedError('Credenciales inválidas.');
    }

    if (!usuario.estado) {
      throw new UnauthorizedError('El usuario está inactivo.');
    }

    const passwordValido = await passwordHelper.compare(password, usuario.password);

    if (!passwordValido) {
      throw new UnauthorizedError('Credenciales inválidas.');
    }

    usuario.ultimoAcceso = new Date();
    await usuario.save();

    const token = jwt.sign({
      id: usuario._id,
      rol: usuario.rol?._id,
    });

    const usuarioRespuesta = usuario.toObject();

    delete usuarioRespuesta.password;

    return {
      token,
      user: usuarioRespuesta,
    };
  }
}

module.exports = new AuthService();
