const BaseRepository = require('../../../core/base/BaseRepository');
const User = require('../models/User');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(correo) {
    return this.findOne(
      { correo },
      {
        select: '+password',
        populate: ['rol'],
      }
    );
  }
}

module.exports = new UserRepository();
