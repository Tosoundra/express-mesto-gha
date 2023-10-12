const cardRouter = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.post('/', createCard);
cardRouter.get('/', getCards);
cardRouter.delete('/:id', deleteCard);
cardRouter.put('/:id/likes', likeCard);
cardRouter.delete('/:id/likes', dislikeCard);

module.exports = cardRouter;
