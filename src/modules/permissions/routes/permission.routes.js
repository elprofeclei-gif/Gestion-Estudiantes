const BaseRouter = require('../../../core/base/BaseRouter');
const permissionController = require('../controllers/PermissionController');
const permissionValidator = require('../validators/PermissionValidator');

module.exports = new BaseRouter(permissionController, permissionValidator).getRouter();
