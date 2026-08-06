const BaseService = require('../../../core/base/BaseService');
const roleRepository = require('../repositories/RoleRepository');

class RoleService extends BaseService {
  constructor() {
    super(roleRepository, {
      unique: ['nombre'],
    });
  }

  async findById(id) {
    return super.findById(id, {
      populate: ['permisos'],
    });
  }

  async findAll(filter = {}, options = {}) {
    return super.findAll(filter, {
      ...options,
      populate: ['permisos'],
    });
  }
}

module.exports = new RoleService();
