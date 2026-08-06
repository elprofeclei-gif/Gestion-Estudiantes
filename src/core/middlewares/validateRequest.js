const { validationResult } = require('express-validator');
const ValidationError = require('../errors/ValidationError');

function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ValidationError('Error de validación.', errors.array()));
  }

  next();
}

module.exports = validateRequest;
