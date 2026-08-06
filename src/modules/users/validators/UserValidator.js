const { body } = require('express-validator');

const BaseValidator = require('../../../core/base/BaseValidator');
const validateRequest = require('../../../core/middlewares/validateRequest');

class UserValidator {
  create = [
    BaseValidator.requiredString('nombres'),
    BaseValidator.requiredString('apellidos'),
    BaseValidator.email('correo'),
    BaseValidator.password('password'),

    body('rol').isMongoId().withMessage('El rol es obligatorio.'),

    validateRequest,
  ];

  update = [
    BaseValidator.mongoId(),
    BaseValidator.requiredString('nombres'),
    BaseValidator.requiredString('apellidos'),
    BaseValidator.email('correo'),

    body('rol').isMongoId().withMessage('El rol es obligatorio.'),

    validateRequest,
  ];

  findById = [BaseValidator.mongoId(), validateRequest];

  findAll = [];

  softDelete = [BaseValidator.mongoId(), validateRequest];

  restore = [BaseValidator.mongoId(), validateRequest];
}

module.exports = new UserValidator();
