const { Error } = require('mongoose');
const { getCardError } = require('../Errors/GetQueryError');
const { serverError } = require('../Errors/InternalServerError');
const { cardValidationError } = require('../Errors/ValidationError');
const Card = require('../models/card');

module.exports.createCard = (req, res, next) => {
  try {
    const { name, link } = req.body;
    const id = req.user._id;
    Card.create({ name, link, owner: id })
      .then((card) => res.send(card))
      .catch((err) => {
        if (err instanceof Error.ValidationError) {
          res
            .status(cardValidationError.statusCode)
            .send({ message: cardValidationError.message });
        }
      });
  } catch (error) {
    next(error);
  }
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send({ message: `Пост удален` });
    })
    .catch((err) => {
      res
        .status(getCardError.statusCode)
        .send({ message: getCardError.message });
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  // try {
    const cardId = req.params.id;
    const userId = req.user._id;
console.log(userId)
    Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true }
    )
      .then((card) => {
        res.send({ data: card });
      })
      .catch((err) => {
        res
          .status(getCardError.statusCode)
          .send({ message: getCardError.message });
        next(err);
      });
  }


module.exports.dislikeCard = (req, res, next) => {
  const cardId = req.params.id;
  const userId = req.user._id;
  console.log(userId)
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then(() => {
      res.send({ message: `Пост удален` });
    })
    .catch((err) => {
      res
        .status(getCardError.statusCode)
        .send({ message: getCardError.message });
      next(err);
    });
};
