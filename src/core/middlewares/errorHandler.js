const ApiError = require('../errors/ApiError');
const ApiResponse = require('../http/ApiResponse');

function errorHandler(error, req, res, next) {
  if (error instanceof ApiError) {
    return ApiResponse.error(res, error.message, error.errors, error.statusCode);
  }

  console.error(error);

  return ApiResponse.error(
    res,
    'Error interno del servidor.',
    process.env.NODE_ENV === 'development' ? error.message : null,
    500
  );
}

module.exports = errorHandler;
