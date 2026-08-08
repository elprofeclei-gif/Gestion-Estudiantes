const BaseValidator = require('../../../core/base/BaseValidator');

class PermissionValidator {
  create = [BaseValidator.requiredString('nombre'), BaseValidator.optionalString('descripcion')];

  update = [
    BaseValidator.mongoId(),
    BaseValidator.requiredString('nombre'),
    BaseValidator.optionalString('descripcion'),
  ];

  findById = [BaseValidator.mongoId()];

  findAll = BaseValidator.pagination();

  softDelete = [BaseValidator.mongoId()];

  restore = [BaseValidator.mongoId()];
}

module.exports = new PermissionValidator();
