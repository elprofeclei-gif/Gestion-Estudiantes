const userRepository = require('../../modules/users/repositories/UserRepository');

const verificarPermiso = (permisoRequerido) => {
  return async (req, res, next) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({
          ok: false,
          message: 'Usuario no autenticado.',
          errors: null,
        });
      }

      if (!permisoRequerido) {
        return next();
      }

      const usuario = await userRepository.findById(req.user.id, {
        populate: [
          {
            path: 'rol',
            populate: {
              path: 'permisos',
            },
          },
        ],
      });

      if (!usuario) {
        return res.status(401).json({
          ok: false,
          message: 'Usuario no encontrado o inactivo.',
          errors: null,
        });
      }

      if (!usuario.estado) {
        return res.status(403).json({
          ok: false,
          message: 'El usuario está inactivo.',
          errors: null,
        });
      }

      if (!usuario.rol) {
        return res.status(403).json({
          ok: false,
          message: 'El usuario no tiene un rol asignado.',
          errors: null,
        });
      }

      if (!usuario.rol.estado) {
        return res.status(403).json({
          ok: false,
          message: 'El rol del usuario está inactivo.',
          errors: null,
        });
      }

      const permisos = usuario.rol.permisos || [];

      const tienePermiso = permisos.some(
        (permiso) => permiso.estado === true && permiso.nombre === permisoRequerido
      );

      if (!tienePermiso) {
        return res.status(403).json({
          ok: false,
          message: 'No tiene permisos para realizar esta acción.',
          errors: null,
        });
      }

      req.permission = permisoRequerido;

      return next();
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = verificarPermiso;
