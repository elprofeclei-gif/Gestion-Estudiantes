const BaseRouter = require('../../../core/base/BaseRouter');

const userController = require('../controllers/UserController');
const userValidator = require('../validators/UserValidator');

module.exports = new BaseRouter(userController, userValidator, {
  create: 'USERS.CREATE',
  read: 'USERS.READ',
  update: 'USERS.UPDATE',
  delete: 'USERS.DELETE',
}).getRouter();
