class GetQueryError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

module.exports.getUserError = new GetQueryError(
  'Пользователь с указанным _id не найден. '
);

module.exports.getCardError = new GetQueryError(
  'Карточка с указанным _id не найдена. '
);

module.exports.CardError = new GetQueryError(
  'Передан несуществующий _id карточки. '
);
