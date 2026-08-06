const express = require('express');

const authController = require('../controllers/AuthController');
const authValidator = require('../validators/AuthValidator');

const router = express.Router();

router.post('/login', ...authValidator.login, authController.login);

module.exports = router;
