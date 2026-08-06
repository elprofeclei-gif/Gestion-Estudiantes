class ApiError extends Error {
  constructor(statusCode, message, errors = null) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
