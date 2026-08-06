const BaseService = require('../../../core/base/BaseService');
const permissionRepository = require('../repositories/PermissionRepository');

class PermissionService extends BaseService {
  constructor() {
    super(permissionRepository, {
      unique: ['nombre'],
    });
  }
}

module.exports = new PermissionService();
