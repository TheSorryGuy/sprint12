const cardsRouter = require('express').Router();

const cards = require('../data/cards.json');

cardsRouter.get('/cards', (req, res, next) => {
  res.send(cards);
  next();
});

cardsRouter.get('/cards/:id', (req, res, next) => {
  cards.forEach((item) => {
    if (item.id === req.params.id) {
      res.send([item]);
    }
    res.status(404).send({ message: 'Нет карточки с таким id' });
  });
  next();
});

module.exports = cardsRouter;
