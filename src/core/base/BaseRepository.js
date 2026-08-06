const QueryBuilder = require('../database/query/QueryBuilder');
const Pagination = require('../database/query/Pagination');

class BaseRepository {
  constructor(model) {
    if (!model) {
      throw new Error('El modelo es obligatorio.');
    }

    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findById(id, options = {}) {
    const { populate = [], select = '' } = options;

    let query = this.model.findById(id);

    if (select) {
      query = query.select(select);
    }

    populate.forEach((item) => {
      query = query.populate(item);
    });

    return query;
  }

  async findOne(filter = {}, options = {}) {
    const { populate = [], select = '' } = options;

    let query = this.model.findOne(filter);

    if (select) {
      query = query.select(select);
    }

    populate.forEach((item) => {
      query = query.populate(item);
    });

    return query;
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 10 } = options;

    const pagination = Pagination.build(page, limit);

    const query = new QueryBuilder(this.model).build(filter, {
      ...options,
      skip: pagination.skip,
      limit: pagination.limit,
    });

    const [items, total] = await Promise.all([query, this.model.countDocuments(filter)]);

    return Pagination.result(items, total, pagination.page, pagination.limit);
  }

  async update(id, data, options = {}) {
    return this.model.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
      runValidators: true,
      ...options,
    });
  }

  async softDelete(id, deletedBy = null) {
    return this.model.findByIdAndUpdate(
      id,
      {
        estado: false,
        deletedAt: new Date(),
        deletedBy,
      },
      {
        returnDocument: 'after',
      }
    );
  }

  async restore(id) {
    return this.model.findByIdAndUpdate(
      id,
      {
        estado: true,
        deletedAt: null,
        deletedBy: null,
      },
      {
        returnDocument: 'after',
      }
    );
  }

  async exists(filter = {}) {
    return this.model.exists(filter);
  }

  async count(filter = {}) {
    return this.model.countDocuments(filter);
  }
}

module.exports = BaseRepository;
