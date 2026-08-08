const { body, param, query } = require('express-validator');

class BaseValidator {
  /**
   * Validar ObjectId en parámetros.
   */
  static mongoId(field = 'id') {
    return param(field).isMongoId().withMessage(`${field} no es un ObjectId válido.`);
  }

  /**
   * Validar texto obligatorio.
   */
  static requiredString(field, min = 2, max = 100) {
    return body(field)
      .trim()
      .notEmpty()
      .withMessage(`${field} es obligatorio.`)
      .isLength({ min, max })
      .withMessage(`${field} debe tener entre ${min} y ${max} caracteres.`);
  }

  /**
   * Validar texto opcional.
   */
  static optionalString(field, min = 2, max = 100) {
    return body(field)
      .optional()
      .trim()
      .isLength({ min, max })
      .withMessage(`${field} debe tener entre ${min} y ${max} caracteres.`);
  }

  /**
   * Validar correo.
   */
  static email(field = 'correo') {
    return body(field)
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Correo electrónico inválido.');
  }

  /**
   * Validar contraseña.
   */
  static password(field = 'password') {
    return body(field)
      .isLength({ min: 8 })
      .withMessage('La contraseña debe tener mínimo 8 caracteres.');
  }

  /**
   * Validar entero.
   */
  static integer(field, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    return body(field).isInt({ min, max }).withMessage(`${field} debe ser un número entero.`);
  }

  /**
   * Validar booleano.
   */
  static boolean(field) {
    return body(field).isBoolean().withMessage(`${field} debe ser verdadero o falso.`);
  }

  /**
   * Validar fecha.
   */
  static date(field) {
    return body(field).isISO8601().withMessage(`${field} debe ser una fecha válida.`);
  }

  /**
   * Validar enum.
   */
  static enum(field, values = []) {
    return body(field).isIn(values).withMessage(`${field} contiene un valor inválido.`);
  }

  /**
   * Validar paginación.
   */
  static pagination(allowedSortFields = ['createdAt']) {
    return [
      query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('page debe ser un entero mayor o igual a 1.'),

      query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('limit debe ser un entero entre 1 y 100.'),

      query('sortBy')
        .optional()
        .isIn(allowedSortFields)
        .withMessage('El campo de ordenamiento no está permitido.'),

      query('order').optional().isIn(['asc', 'desc']).withMessage('order debe ser asc o desc.'),
    ];
  }
}

module.exports = BaseValidator;
