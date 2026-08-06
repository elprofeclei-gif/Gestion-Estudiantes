const express = require('express');

const authRoutes = require('../modules/auth');
const userRoutes = require('../modules/users');
const roleRoutes = require('../modules/roles');
const permissionRoutes = require('../modules/permissions');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/permissions', permissionRoutes);
router.use('/roles', roleRoutes);
router.use('/users', userRoutes);

module.exports = router;
