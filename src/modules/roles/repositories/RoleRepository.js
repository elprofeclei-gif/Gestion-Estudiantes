const BaseRepository = require('../../../core/base/BaseRepository');
const Role = require('../models/Role');

class RoleRepository extends BaseRepository {
  constructor() {
    super(Role);
  }

  async findByName(nombre) {
    return this.findOne({ nombre });
  }
}

module.exports = new RoleRepository();
