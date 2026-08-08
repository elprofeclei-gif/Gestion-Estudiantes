const asyncHandler = require('../middlewares/asyncHandler');
const ApiResponse = require('../http/ApiResponse');

class BaseController {
  constructor(service) {
    if (!service) {
      throw new Error('El servicio es obligatorio.');
    }

    this.service = service;
  }

  create = asyncHandler(async (req, res) => {
    const data = await this.service.create(req.body, req.user?.id || null);

    return ApiResponse.created(res, data);
  });

  findAll = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;

    const data = await this.service.findAll(
      {},
      {
        page,
        limit,
        sort: {
          [sortBy]: order === 'asc' ? 1 : -1,
        },
      }
    );

    return ApiResponse.listed(res, data);
  });

  findById = asyncHandler(async (req, res) => {
    const data = await this.service.findById(req.params.id);

    return ApiResponse.found(res, data);
  });

  update = asyncHandler(async (req, res) => {
    const data = await this.service.update(req.params.id, req.body, req.user?.id || null);

    return ApiResponse.updated(res, data);
  });

  softDelete = asyncHandler(async (req, res) => {
    const data = await this.service.softDelete(req.params.id, req.user?.id || null);

    return ApiResponse.updated(res, data);
  });

  restore = asyncHandler(async (req, res) => {
    const data = await this.service.restore(req.params.id, req.user?.id || null);

    return ApiResponse.updated(res, data);
  });
}

module.exports = BaseController;
