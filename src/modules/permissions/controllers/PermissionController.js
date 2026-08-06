const BaseController = require('../../../core/base/BaseController');
const permissionService = require('../services/PermissionService');

class PermissionController extends BaseController {
  constructor() {
    super(permissionService);
  }
}

module.exports = new PermissionController();
