const BaseRouter = require('../../../core/base/BaseRouter');

const permissionController = require('../controllers/PermissionController');
const permissionValidator = require('../validators/PermissionValidator');

module.exports = new BaseRouter(permissionController, permissionValidator, {
  create: 'PERMISSIONS.CREATE',
  read: 'PERMISSIONS.READ',
  update: 'PERMISSIONS.UPDATE',
  delete: 'PERMISSIONS.DELETE',
}).getRouter();
