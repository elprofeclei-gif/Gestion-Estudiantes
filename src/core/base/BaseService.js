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

  async create(data) {
    await this.validateUnique(data);

    return this.repository.create(data);
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

  async update(id, data, options = {}) {
    await this.findById(id);

    await this.validateUnique(data, id);

    return this.repository.update(id, data, options);
  }

  async softDelete(id, user = null) {
    await this.findById(id);

    return this.repository.softDelete(id, user);
  }

  async delete(id) {
    await this.findById(id);

    return this.repository.delete(id);
  }

  async restore(id) {
    await this.findById(id);

    return this.repository.restore(id);
  }

  async exists(filter = {}) {
    return this.repository.exists(filter);
  }

  async count(filter = {}) {
    return this.repository.count(filter);
  }

  async validateUnique(data, id = null) {
    if (!this.unique.length) {
      return;
    }

    for (const field of this.unique) {
      if (data[field] === undefined) {
        continue;
      }

      const exists = await this.repository.findOne({
        [field]: data[field],
      });

      if (exists && (!id || exists._id.toString() !== id)) {
        throw new ConflictError(`El ${field} ya existe.`);
      }
    }
  }
}

module.exports = BaseService;
