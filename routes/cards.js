
const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const URLregex = /^https?:\/\/(www.)?(((2[0-5]{2}|2[0-4][0-9]|1?[1-9]?[0-9])\.){3}(2[0-5]{2}|2[0-4][0-9]|1?[1-9]?[0-9])|([\w-]{2,}(\.[\w-]{2,})*\.[a-zA-Z]{2,}))(:\d{2,5})?(\/[\d/a-zA-Z-]+#?)?$/;


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
    link: Joi.string().required().pattern(URLregex),
  }),
}), postCard);

cardsRouter.delete('/cards/:cardId', deleteCard);
cardsRouter.put('/cards/:cardId/likes', putLike);
cardsRouter.delete('/cards/:cardId/likes', removeLike);

module.exports = cardsRouter;
