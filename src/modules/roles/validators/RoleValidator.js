const { body } = require('express-validator');

const BaseValidator = require('../../../core/base/BaseValidator');

class RoleValidator {
  create = [
    BaseValidator.requiredString('nombre'),
    BaseValidator.requiredString('descripcion'),
    body('permisos').optional().isArray().withMessage('Los permisos deben ser un arreglo.'),
    body('permisos.*')
      .optional()
      .isMongoId()
      .withMessage('Cada permiso debe ser un ObjectId válido.'),
  ];

  update = [
    BaseValidator.mongoId(),
    BaseValidator.requiredString('nombre'),
    BaseValidator.requiredString('descripcion'),
    body('permisos').optional().isArray().withMessage('Los permisos deben ser un arreglo.'),
    body('permisos.*')
      .optional()
      .isMongoId()
      .withMessage('Cada permiso debe ser un ObjectId válido.'),
  ];

  findById = [BaseValidator.mongoId()];

  findAll = BaseValidator.pagination(['nombre', 'createdAt', 'updatedAt']);

  softDelete = [BaseValidator.mongoId()];

  restore = [BaseValidator.mongoId()];
}

module.exports = new RoleValidator();
