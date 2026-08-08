const express = require('express');

const validateRequest = require('../middlewares/validateRequest');
const verificarToken = require('../middlewares/authMiddleware');
const verificarPermiso = require('../middlewares/permissionMiddleware');

class BaseRouter {
  constructor(controller, validator = {}, security = {}) {
    if (!controller) {
      throw new Error('El controlador es obligatorio.');
    }

    this.router = express.Router();
    this.controller = controller;
    this.validator = validator;
    this.security = security;

    this.initializeRoutes();
  }

  middleware(permission) {
    const middlewares = [];

    if (this.security.auth !== false) {
      middlewares.push(verificarToken);
    }

    if (permission && this.security.permissions !== false) {
      middlewares.push(verificarPermiso(permission));
    }

    return middlewares;
  }

  withValidation(rules = []) {
    return [...rules, validateRequest];
  }

  initializeRoutes() {
    this.router.post(
      '/',
      ...this.middleware(this.security.create),
      ...this.withValidation(this.validator.create),
      this.controller.create
    );

    this.router.get(
      '/',
      ...this.middleware(this.security.read),
      ...this.withValidation(this.validator.findAll),
      this.controller.findAll
    );

    this.router.get(
      '/:id',
      ...this.middleware(this.security.read),
      ...this.withValidation(this.validator.findById),
      this.controller.findById
    );

    this.router.put(
      '/:id',
      ...this.middleware(this.security.update),
      ...this.withValidation(this.validator.update),
      this.controller.update
    );

    this.router.patch(
      '/:id/delete',
      ...this.middleware(this.security.delete),
      ...this.withValidation(this.validator.softDelete || this.validator.delete),
      this.controller.softDelete
    );

    this.router.patch(
      '/:id/restore',
      ...this.middleware(this.security.update),
      ...this.withValidation(this.validator.restore),
      this.controller.restore
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = BaseRouter;
