class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = 500;
  }
}

module.exports.serverError = new InternalServerError('Ошибка по умолчанию.');
