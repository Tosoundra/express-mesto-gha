const { Error } = require('mongoose');
const { getCardError } = require('../Errors/GetQueryError');
const { serverError } = require('../Errors/InternalServerError');
const {
  cardValidationError,
  incorrectRequestDataError,
} = require('../Errors/ValidationError');
const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;
  Card.create({ name, link, owner: id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        res
          .status(cardValidationError.statusCode)
          .send({ message: cardValidationError.message });
        return;
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(serverError.statusCode).send({ message: serverError.message });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(() => {
      res.send({ message: `Пост удален` });
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        res
          .status(getCardError.statusCode)
          .send({ message: getCardError.message });
        return;
      }
    });
};

module.exports.likeCard = (req, res) => {
  const cardId = req.params.id;
  const userId = req.user._id;

  if (!userId) {
    res
      .status(incorrectRequestDataError.statusCode)
      .send({ message: incorrectRequestDataError.message });
    return;
  }

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .populate('owner')
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => {
      res
        .status(getCardError.statusCode)
        .send({ message: getCardError.message });
      return;
    });
};

module.exports.dislikeCard = (req, res) => {
  const cardId = req.params.id;
  const userId = req.user._id;

  if (!userId) {
    res
      .status(incorrectRequestDataError.statusCode)
      .send({ message: incorrectRequestDataError.message });
    return;
  }

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then(() => {
      res.send({ message: `Пост удален` });
    })
    .catch(() => {
      res
        .status(getCardError.statusCode)
        .send({ message: getCardError.message });
    });
};
