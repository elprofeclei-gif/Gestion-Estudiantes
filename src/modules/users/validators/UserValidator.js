const { body } = require('express-validator');

const BaseValidator = require('../../../core/base/BaseValidator');

class UserValidator {
  create = [
    BaseValidator.requiredString('nombres'),
    BaseValidator.requiredString('apellidos'),
    BaseValidator.email('correo'),
    BaseValidator.password('password'),

    body('rol').isMongoId().withMessage('El rol es obligatorio.'),
  ];

  update = [
    BaseValidator.mongoId(),
    BaseValidator.requiredString('nombres'),
    BaseValidator.requiredString('apellidos'),
    BaseValidator.email('correo'),

    body('rol').isMongoId().withMessage('El rol es obligatorio.'),
  ];

  findById = [BaseValidator.mongoId()];

  findAll = BaseValidator.pagination();

  softDelete = [BaseValidator.mongoId()];

  restore = [BaseValidator.mongoId()];
}

module.exports = new UserValidator();
