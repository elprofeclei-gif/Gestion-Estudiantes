const ApiError = require('./ApiError');

class BadRequestError extends ApiError {
  constructor(message = 'Solicitud incorrecta.', errors = null) {
    super(400, message, errors);
  }
}

module.exports = BadRequestError;
