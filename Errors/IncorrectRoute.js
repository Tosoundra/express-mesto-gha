class IncorrectRoute extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongRoute';
    this.statusCode = 404;
  }
}

module.exports.incorrectRoute = new IncorrectRoute(
  'Неправильный адрес запроса'
);
