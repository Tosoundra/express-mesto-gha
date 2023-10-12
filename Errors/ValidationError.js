class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

module.exports.userValidationError = new ValidationError(
  'Переданы некорректные данные при создании пользователя.',
);

module.exports.cardValidationError = new ValidationError(
  'Переданы некорректные данные при создании карточки.',
);
