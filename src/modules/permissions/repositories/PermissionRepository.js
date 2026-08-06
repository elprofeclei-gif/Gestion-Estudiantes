const BaseRepository = require('../../../core/base/BaseRepository');
const Permission = require('../models/Permission');

class PermissionRepository extends BaseRepository {
  constructor() {
    super(Permission);
  }

  async findByName(nombre) {
    return this.findOne({ nombre });
  }
}

module.exports = new PermissionRepository();
