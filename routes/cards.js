
const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { URL_REGEX } = require('../config');

const {
  getCards,
  postCard,
  deleteCard,
  putLike,
  removeLike,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_REGEX),
  }),
}), postCard);

cardsRouter.delete('/cards/:cardId', deleteCard);
cardsRouter.put('/cards/:cardId/likes', putLike);
cardsRouter.delete('/cards/:cardId/likes', removeLike);

module.exports = cardsRouter;
