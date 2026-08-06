const asyncHandler = require('../middlewares/asyncHandler');
const ApiResponse = require('../http/ApiResponse');

/**
 * @class BaseController
 * @description Controlador base con operaciones CRUD reutilizables.
 */
class BaseController {
  /**
   * @param {BaseService} service
   */
  constructor(service) {
    if (!service) {
      throw new Error('El servicio es obligatorio.');
    }

    this.service = service;
  }

  /**
   * Crear.
   */
  create = asyncHandler(async (req, res) => {
    const data = await this.service.create(req.body);

    return ApiResponse.created(res, data);
  });

  /**
   * Listar.
   */
  findAll = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;

    const data = await this.service.findAll(
      {},
      {
        page: Number(page),
        limit: Number(limit),
        sort: {
          [sortBy]: order === 'asc' ? 1 : -1,
        },
      }
    );

    return ApiResponse.listed(res, data);
  });

  /**
   * Buscar por ID.
   */
  findById = asyncHandler(async (req, res) => {
    const data = await this.service.findById(req.params.id);

    return ApiResponse.found(res, data);
  });

  /**
   * Actualizar.
   */
  update = asyncHandler(async (req, res) => {
    const data = await this.service.update(req.params.id, req.body);

    return ApiResponse.updated(res, data);
  });

  /**
   * Eliminación lógica.
   */
  softDelete = asyncHandler(async (req, res) => {
    const data = await this.service.softDelete(req.params.id, req.user?.id || null);

    return ApiResponse.updated(res, data);
  });

  /**
   * Restaurar.
   */
  restore = asyncHandler(async (req, res) => {
    const data = await this.service.restore(req.params.id);

    return ApiResponse.updated(res, data);
  });
}

module.exports = BaseController;
