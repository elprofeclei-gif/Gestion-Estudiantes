const BaseValidator = require('../../../core/base/BaseValidator');
const validateRequest = require('../../../core/middlewares/validateRequest');

class AuthValidator {
  login = [BaseValidator.email('correo'), BaseValidator.password('password'), validateRequest];
}

module.exports = new AuthValidator();
