const Seeder = require('../Seeder');

const Permission = require('../../../../modules/permissions/models/Permission');

module.exports = new Seeder('Permissions', Permission, [
  // Usuarios
  {
    nombre: 'USERS.READ',
    descripcion: 'Ver usuarios',
  },
  {
    nombre: 'USERS.CREATE',
    descripcion: 'Crear usuarios',
  },
  {
    nombre: 'USERS.UPDATE',
    descripcion: 'Actualizar usuarios',
  },
  {
    nombre: 'USERS.DELETE',
    descripcion: 'Eliminar usuarios',
  },

  // Roles
  {
    nombre: 'ROLES.READ',
    descripcion: 'Ver roles',
  },
  {
    nombre: 'ROLES.CREATE',
    descripcion: 'Crear roles',
  },
  {
    nombre: 'ROLES.UPDATE',
    descripcion: 'Actualizar roles',
  },
  {
    nombre: 'ROLES.DELETE',
    descripcion: 'Eliminar roles',
  },

  // Permisos
  {
    nombre: 'PERMISSIONS.READ',
    descripcion: 'Ver permisos',
  },
  {
    nombre: 'PERMISSIONS.CREATE',
    descripcion: 'Crear permisos',
  },
  {
    nombre: 'PERMISSIONS.UPDATE',
    descripcion: 'Actualizar permisos',
  },
  {
    nombre: 'PERMISSIONS.DELETE',
    descripcion: 'Eliminar permisos',
  },
]);
