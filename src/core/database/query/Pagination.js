class Pagination {
  static build(page = 1, limit = 10) {
    page = Number(page);
    limit = Number(limit);

    return {
      page,
      limit,
      skip: (page - 1) * limit,
    };
  }

  static result(items, total, page, limit) {
    return {
      items,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }
}

module.exports = Pagination;
