const QueryBuilder = require('../database/query/QueryBuilder');
const Pagination = require('../database/query/Pagination');

class BaseRepository {
  constructor(model) {
    if (!model) {
      throw new Error('El modelo es obligatorio.');
    }

    this.model = model;
  }

  async create(data, user = null) {
    const payload = { ...data };

    if (user) {
      payload.createdBy = user;
      payload.updatedBy = user;
    }

    return this.model.create(payload);
  }

  async findById(id, options = {}) {
    const { populate = [], select = '', includeDeleted = false } = options;

    const filter = includeDeleted ? { _id: id } : { _id: id, estado: true };

    let query = this.model.findOne(filter);

    if (select) {
      query = query.select(select);
    }

    populate.forEach((item) => {
      query = query.populate(item);
    });

    return query;
  }

  async findOne(filter = {}, options = {}) {
    const { populate = [], select = '', includeDeleted = false } = options;

    const finalFilter = { ...filter };

    if (!includeDeleted) {
      finalFilter.estado = true;
    }

    let query = this.model.findOne(finalFilter);

    if (select) {
      query = query.select(select);
    }

    populate.forEach((item) => {
      query = query.populate(item);
    });

    return query;
  }

  async findAll(filter = {}, options = {}) {
    const {
      page = Pagination.DEFAULT_PAGE,
      limit = Pagination.DEFAULT_LIMIT,
      includeDeleted = false,
    } = options;

    const pagination = Pagination.build(page, limit);

    const finalFilter = { ...filter };

    if (!includeDeleted) {
      finalFilter.estado = true;
    }

    const query = new QueryBuilder(this.model).build(finalFilter, {
      ...options,
      skip: pagination.skip,
      limit: pagination.limit,
    });

    const [items, total] = await Promise.all([query, this.model.countDocuments(finalFilter)]);

    return Pagination.result(items, total, pagination.page, pagination.limit);
  }

  async update(id, data, user = null, options = {}) {
    const payload = { ...data };

    if (user) {
      payload.updatedBy = user;
    }

    return this.model.findOneAndUpdate(
      {
        _id: id,
        estado: true,
      },
      payload,
      {
        new: true,
        runValidators: true,
        ...options,
      }
    );
  }

  async softDelete(id, deletedBy = null) {
    return this.model.findOneAndUpdate(
      {
        _id: id,
        estado: true,
      },
      {
        estado: false,
        deletedAt: new Date(),
        deletedBy,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async restore(id, restoredBy = null) {
    const update = {
      estado: true,
      deletedAt: null,
      deletedBy: null,
    };

    if (restoredBy) {
      update.updatedBy = restoredBy;
    }

    return this.model.findOneAndUpdate(
      {
        _id: id,
        estado: false,
      },
      update,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async exists(filter = {}, options = {}) {
    const finalFilter = { ...filter };

    if (!options.includeDeleted) {
      finalFilter.estado = true;
    }

    return this.model.exists(finalFilter);
  }

  async count(filter = {}, options = {}) {
    const finalFilter = { ...filter };

    if (!options.includeDeleted) {
      finalFilter.estado = true;
    }

    return this.model.countDocuments(finalFilter);
  }
}

module.exports = BaseRepository;
