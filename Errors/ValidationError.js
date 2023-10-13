class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

module.exports.userValidationError = new ValidationError(
  'Переданы некорректные данные при создании пользователя.'
);

module.exports.userUpdateValidationError = new ValidationError(
  'Переданы некорректные данные при обновлении пользователя.'
);

module.exports.userUpdateAvatarValidationError = new ValidationError(
  'Переданы некорректные данные при обновлении аватара.'
);

module.exports.cardValidationError = new ValidationError(
  'Переданы некорректные данные при создании карточки.'
);

module.exports.incorrectRequestDataError = new ValidationError(
  'Переданы некорректные данные для постановки/снятии лайка.'
);
