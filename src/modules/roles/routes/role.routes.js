const BaseRouter = require('../../../core/base/BaseRouter');

const roleController = require('../controllers/RoleController');
const roleValidator = require('../validators/RoleValidator');

module.exports = new BaseRouter(roleController, roleValidator, {
  create: 'ROLES.CREATE',
  read: 'ROLES.READ',
  update: 'ROLES.UPDATE',
  delete: 'ROLES.DELETE',
}).getRouter();
