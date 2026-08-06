const ApiError = require('./ApiError');

class NotFoundError extends ApiError {
  constructor(message = 'Recurso no encontrado.') {
    super(404, message);
  }
}

module.exports = NotFoundError;
