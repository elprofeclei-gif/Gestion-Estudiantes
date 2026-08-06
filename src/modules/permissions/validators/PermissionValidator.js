const BaseValidator = require('../../../core/base/BaseValidator');
const validateRequest = require('../../../core/middlewares/validateRequest');

class PermissionValidator {
  create = [
    BaseValidator.requiredString('nombre'),
    BaseValidator.optionalString('descripcion'),
    validateRequest,
  ];

  update = [
    BaseValidator.mongoId(),
    BaseValidator.requiredString('nombre'),
    BaseValidator.optionalString('descripcion'),
    validateRequest,
  ];

  findById = [BaseValidator.mongoId(), validateRequest];

  softDelete = [BaseValidator.mongoId(), validateRequest];

  restore = [BaseValidator.mongoId(), validateRequest];

  findAll = [];
}

module.exports = new PermissionValidator();
