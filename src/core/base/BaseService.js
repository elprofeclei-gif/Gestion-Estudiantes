const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

class BaseService {
  constructor(repository, options = {}) {
    if (!repository) {
      throw new Error('El repositorio es obligatorio.');
    }

    this.repository = repository;
    this.unique = options.unique || [];
  }

  async create(data, user = null) {
    await this.validateUnique(data);

    return this.repository.create(data, user);
  }

  async findById(id, options = {}) {
    const item = await this.repository.findById(id, options);

    if (!item) {
      throw new NotFoundError('Registro no encontrado.');
    }

    return item;
  }

  async findOne(filter = {}, options = {}) {
    return this.repository.findOne(filter, options);
  }

  async findAll(filter = {}, options = {}) {
    return this.repository.findAll(filter, options);
  }

  async update(id, data, user = null, options = {}) {
    await this.findById(id);

    await this.validateUnique(data, id);

    const item = await this.repository.update(id, data, user, options);

    if (!item) {
      throw new NotFoundError('Registro no encontrado.');
    }

    return item;
  }

  async softDelete(id, user = null) {
    await this.findById(id);

    const item = await this.repository.softDelete(id, user);

    if (!item) {
      throw new NotFoundError('Registro no encontrado.');
    }

    return item;
  }

  async restore(id, user = null) {
    const item = await this.repository.restore(id, user);

    if (!item) {
      throw new NotFoundError('El registro no existe o no se encuentra eliminado.');
    }

    return item;
  }

  async exists(filter = {}, options = {}) {
    return this.repository.exists(filter, options);
  }

  async count(filter = {}, options = {}) {
    return this.repository.count(filter, options);
  }

  async validateUnique(data, id = null) {
    if (!this.unique.length) {
      return;
    }

    for (const field of this.unique) {
      if (data[field] === undefined) {
        continue;
      }

      const exists = await this.repository.findOne(
        {
          [field]: data[field],
        },
        {
          includeDeleted: true,
        }
      );

      if (exists && (!id || exists._id.toString() !== id.toString())) {
        throw new ConflictError(`El ${field} ya existe.`);
      }
    }
  }
}

module.exports = BaseService;
