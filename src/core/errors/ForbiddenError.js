const ApiError = require('./ApiError');

class ForbiddenError extends ApiError {
  constructor(message = 'No tiene permisos para realizar esta acción.') {
    super(403, message);
  }
}

module.exports = ForbiddenError;
