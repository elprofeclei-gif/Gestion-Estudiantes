const BaseController = require('../../../core/base/BaseController');
const userService = require('../services/UserService');

class UserController extends BaseController {
  constructor() {
    super(userService);
  }
}

module.exports = new UserController();
