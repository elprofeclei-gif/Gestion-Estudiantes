const asyncHandler = require('../../../core/middlewares/asyncHandler');
const ApiResponse = require('../../../core/http/ApiResponse');

const authService = require('../services/AuthService');

class AuthController {
  login = asyncHandler(async (req, res) => {
    const { correo, password } = req.body;

    const data = await authService.login(correo, password);

    return ApiResponse.success(res, 'Inicio de sesión correcto.', data);
  });
}

module.exports = new AuthController();
