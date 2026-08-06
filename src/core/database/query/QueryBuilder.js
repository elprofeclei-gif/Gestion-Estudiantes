class QueryBuilder {
  constructor(model) {
    this.model = model;
  }

  build(filter = {}, options = {}) {
    const { sort = { createdAt: -1 }, populate = [], select = '', skip = 0, limit = 10 } = options;

    let query = this.model.find(filter).sort(sort).skip(skip).limit(limit);

    if (select) {
      query = query.select(select);
    }

    populate.forEach((item) => {
      query = query.populate(item);
    });

    return query;
  }
}

module.exports = QueryBuilder;
