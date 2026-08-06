const ForbiddenError = require('../errors/ForbiddenError');
const User = require('../../modules/users/User');

function permission(permissionName) {
  return async (req, res, next) => {
    const user = await User.findById(req.user.id).populate({
      path: 'rol',
      populate: {
        path: 'permisos',
      },
    });

    if (!user) {
      return next(new ForbiddenError('Usuario no encontrado.'));
    }

    const permissions = user.rol.permisos.map((p) => p.nombre);

    if (!permissions.includes(permissionName)) {
      return next(new ForbiddenError('No tiene permisos para realizar esta acción.'));
    }

    next();
  };
}

module.exports = permission;
