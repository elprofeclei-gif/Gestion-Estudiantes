const ApiError = require('./ApiError');

class ConflictError extends ApiError {
  constructor(message = 'El recurso ya existe.') {
    super(409, message);
  }
}

module.exports = ConflictError;
