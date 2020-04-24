
const cardsRouter = require('express').Router();
const { getCards, postCard, deleteCard, putLike, removeLike } = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', postCard);
cardsRouter.delete('/cards/:_id', deleteCard);
cardsRouter.put('/cards/:cardId/likes', putLike);
cardsRouter.delete('/cards/:cardId/likes', removeLike);

module.exports = cardsRouter;
