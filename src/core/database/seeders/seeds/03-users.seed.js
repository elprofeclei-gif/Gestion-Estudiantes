const bcrypt = require('bcrypt');

const Seeder = require('../Seeder');

const env = require('../../../../config/env');

const User = require('../../../../modules/users/models/User');
const Role = require('../../../../modules/roles/models/Role');

class UserSeeder extends Seeder {
  constructor() {
    super('Usuarios', User, []);
  }

  async run() {
    const adminRole = await Role.findOne({
      nombre: 'ADMINISTRADOR',
    });

    if (!adminRole) {
      throw new Error('Debe existir el rol ADMINISTRADOR antes de crear el usuario.');
    }

    const password = await bcrypt.hash(env.admin.password, env.bcrypt.rounds);

    this.data = [
      {
        nombres: env.admin.nombres,
        apellidos: env.admin.apellidos,
        correo: env.admin.correo,
        password,
        rol: adminRole._id,
      },
    ];

    await super.run();
  }
}

module.exports = new UserSeeder();
