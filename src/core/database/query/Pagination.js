const BadRequestError = require('../../errors/BadRequestError');

class Pagination {
  static DEFAULT_PAGE = 1;
  static DEFAULT_LIMIT = 10;
  static MAX_LIMIT = 100;

  static build(page = Pagination.DEFAULT_PAGE, limit = Pagination.DEFAULT_LIMIT) {
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
      throw new BadRequestError('El número de página debe ser un entero mayor o igual a 1.');
    }

    if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
      throw new BadRequestError('El límite debe ser un entero mayor o igual a 1.');
    }

    if (parsedLimit > Pagination.MAX_LIMIT) {
      throw new BadRequestError(`El límite máximo permitido es ${Pagination.MAX_LIMIT}.`);
    }

    return {
      page: parsedPage,
      limit: parsedLimit,
      skip: (parsedPage - 1) * parsedLimit,
    };
  }

  static result(items, total, page, limit) {
    return {
      items,
      pagination: {
        total,
        page,
        limit,
        pages: total === 0 ? 0 : Math.ceil(total / limit),
      },
    };
  }
}

module.exports = Pagination;
