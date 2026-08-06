const BaseRouter = require('../../../core/base/BaseRouter');
const userController = require('../controllers/UserController');
const userValidator = require('../validators/UserValidator');

module.exports = new BaseRouter(userController, userValidator).getRouter();
