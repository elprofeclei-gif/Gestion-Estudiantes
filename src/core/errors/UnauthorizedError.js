const ApiError = require('./ApiError');

class UnauthorizedError extends ApiError {
  constructor(message = 'No autenticado.') {
    super(401, message);
  }
}

module.exports = UnauthorizedError;
