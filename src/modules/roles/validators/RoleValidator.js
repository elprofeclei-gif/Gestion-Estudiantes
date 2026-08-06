const BaseValidator = require('../../../core/base/BaseValidator');
const validateRequest = require('../../../core/middlewares/validateRequest');
const { body } = require('express-validator');

class RoleValidator {
  create = [
    BaseValidator.requiredString('nombre'),
    BaseValidator.optionalString('descripcion'),

    body('permisos').optional().isArray().withMessage('Los permisos deben ser un arreglo.'),

    body('permisos.*')
      .optional()
      .isMongoId()
      .withMessage('Cada permiso debe ser un ObjectId válido.'),

    validateRequest,
  ];

  update = [
    BaseValidator.mongoId(),
    BaseValidator.requiredString('nombre'),
    BaseValidator.optionalString('descripcion'),

    body('permisos').optional().isArray().withMessage('Los permisos deben ser un arreglo.'),

    body('permisos.*')
      .optional()
      .isMongoId()
      .withMessage('Cada permiso debe ser un ObjectId válido.'),

    validateRequest,
  ];

  findById = [BaseValidator.mongoId(), validateRequest];

  findAll = [];

  softDelete = [BaseValidator.mongoId(), validateRequest];

  restore = [BaseValidator.mongoId(), validateRequest];
}

module.exports = new RoleValidator();
