class Seeder {
  constructor(name, model, data = []) {
    this.name = name;
    this.model = model;
    this.data = data;
  }

  /**
   * Ejecuta el seed.
   */
  async run() {
    let created = 0;
    let updated = 0;

    for (const item of this.data) {
      const filter = this.getUniqueFilter(item);

      const exists = await this.model.findOne(filter);

      if (!exists) {
        await this.model.create(item);
        created++;
      } else {
        await this.model.updateOne({ _id: exists._id }, item, {
          runValidators: true,
        });

        updated++;
      }
    }

    console.log(`✓ ${this.name}: ${created} creados, ${updated} actualizados`);
  }

  /**
   * Obtiene el filtro único para el registro.
   */
  getUniqueFilter(item) {
    const uniqueFields = ['nombre', 'correo', 'codigo', 'documento', 'anio', 'slug'];

    const field = uniqueFields.find((key) => item[key] !== undefined);

    if (!field) {
      throw new Error(
        `El seed "${this.name}" necesita un campo único (nombre, correo, codigo, documento, anio o slug).`
      );
    }

    return {
      [field]: item[field],
    };
  }
}

module.exports = Seeder;
