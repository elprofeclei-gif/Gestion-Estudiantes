const BaseService = require('../../../core/base/BaseService');
const passwordHelper = require('../../../core/helpers/password.helper');

const userRepository = require('../repositories/UserRepository');

class UserService extends BaseService {
  constructor() {
    super(userRepository, {
      unique: ['correo'],
    });
  }

  async create(data, user = null) {
    const payload = {
      ...data,
      password: await passwordHelper.hash(data.password),
    };

    return super.create(payload, user);
  }

  async update(id, data, user = null) {
    const payload = { ...data };

    if (payload.password) {
      payload.password = await passwordHelper.hash(payload.password);
    }

    return super.update(id, payload, user);
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
