const bcrypt = require('bcrypt');

const env = require('../../../config/env');

const BaseService = require('../../../core/base/BaseService');

const userRepository = require('../repositories/UserRepository');

class UserService extends BaseService {
  constructor() {
    super(userRepository, {
      unique: ['correo'],
    });
  }

  async create(data) {
    data.password = await bcrypt.hash(data.password, env.bcrypt.rounds);

    return super.create(data);
  }

  async findById(id) {
    return super.findById(id, {
      populate: ['rol'],
    });
  }

  async findAll(filter = {}, options = {}) {
    return super.findAll(filter, {
      ...options,
      populate: ['rol'],
    });
  }
}

module.exports = new UserService();
