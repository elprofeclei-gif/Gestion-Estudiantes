const express = require('express');

class BaseRouter {
  constructor(controller, validator = {}) {
    this.router = express.Router();

    this.controller = controller;
    this.validator = validator;

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', ...(this.validator.create || []), this.controller.create);

    this.router.get('/', ...(this.validator.findAll || []), this.controller.findAll);

    this.router.get('/:id', ...(this.validator.findById || []), this.controller.findById);

    this.router.put('/:id', ...(this.validator.update || []), this.controller.update);

    this.router.patch(
      '/:id/delete',
      ...(this.validator.softDelete || this.validator.delete || []),
      this.controller.softDelete
    );

    this.router.patch('/:id/restore', ...(this.validator.restore || []), this.controller.restore);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = BaseRouter;
