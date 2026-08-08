const jwt = require('../../config/jwt');
const UnauthorizedError = require('../errors/UnauthorizedError');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Token no proporcionado.'));
  }

  const token = authHeader.substring(7).trim();

  if (!token) {
    return next(new UnauthorizedError('Token no proporcionado.'));
  }

  try {
    req.user = jwt.verify(token);
    next();
  } catch (error) {
    next(new UnauthorizedError('Token inválido o expirado.'));
  }
}

module.exports = authMiddleware;
