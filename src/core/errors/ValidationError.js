const ApiError = require('./ApiError');

class ValidationError extends ApiError {
  constructor(message = 'Error de validación.', errors = null) {
    super(422, message, errors);
  }
}

module.exports = ValidationError;
