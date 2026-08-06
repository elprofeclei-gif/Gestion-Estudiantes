const BaseController = require('../../../core/base/BaseController');
const roleService = require('../services/RoleService');

class RoleController extends BaseController {
  constructor() {
    super(roleService);
  }
}

module.exports = new RoleController();
