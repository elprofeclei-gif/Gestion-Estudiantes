const Seeder = require('../Seeder');

const Role = require('../../../../modules/roles/models/Role');
const Permission = require('../../../../modules/permissions/models/Permission');

class RoleSeeder extends Seeder {
  constructor() {
    super('Roles', Role, []);
  }

  async run() {
    const permissions = await Permission.find().select('_id');

    const adminRole = {
      nombre: 'ADMINISTRADOR',
      descripcion: 'Acceso total al sistema.',
      permisos: permissions.map((p) => p._id),
    };

    const docenteRole = {
      nombre: 'DOCENTE',
      descripcion: 'Rol para docentes.',
      permisos: [],
    };

    const estudianteRole = {
      nombre: 'ESTUDIANTE',
      descripcion: 'Rol para estudiantes.',
      permisos: [],
    };

    const secretariaRole = {
      nombre: 'SECRETARIA',
      descripcion: 'Rol para secretaría.',
      permisos: [],
    };

    this.data = [adminRole, docenteRole, estudianteRole, secretariaRole];

    await super.run();
  }
}

module.exports = new RoleSeeder();
