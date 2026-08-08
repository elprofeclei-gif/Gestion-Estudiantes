const mongoose = require('mongoose');

const ApiError = require('../errors/ApiError');
const ApiResponse = require('../http/ApiResponse');

function errorHandler(error, req, res, next) {
  if (error instanceof ApiError) {
    return ApiResponse.error(res, error.message, error.errors, error.statusCode);
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(error.errors).map((item) => ({
      field: item.path,
      message: item.message,
    }));

    return ApiResponse.error(res, 'Error de validación.', errors, 422);
  }

  if (error instanceof mongoose.Error.CastError) {
    return ApiResponse.error(res, 'El identificador proporcionado no es válido.', null, 400);
  }

  if (error?.code === 11000) {
    const fields = Object.keys(error.keyPattern || error.keyValue || {});

    return ApiResponse.error(
      res,
      'Ya existe un registro con uno de los valores proporcionados.',
      fields.map((field) => ({
        field,
        message: `El campo ${field} ya está registrado.`,
      })),
      409
    );
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
