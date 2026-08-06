class ApiResponse {
  static success(res, message, data = null, statusCode = 200) {
    return res.status(statusCode).json({
      ok: true,
      message,
      data,
    });
  }

  static error(res, message, errors = null, statusCode = 500) {
    return res.status(statusCode).json({
      ok: false,
      message,
      errors,
    });
  }

  static created(res, data) {
    return this.success(res, 'Registro creado correctamente.', data, 201);
  }

  static updated(res, data) {
    return this.success(res, 'Registro actualizado correctamente.', data);
  }

  static deleted(res) {
    return this.success(res, 'Registro eliminado correctamente.');
  }

  static found(res, data) {
    return this.success(res, 'Consulta realizada correctamente.', data);
  }

  static listed(res, data) {
    return this.success(res, 'Registros obtenidos correctamente.', data);
  }
}

module.exports = ApiResponse;
