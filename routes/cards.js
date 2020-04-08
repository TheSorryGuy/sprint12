const cardsRouter = require('express').Router();
const fs = require('fs');

let cards;
fs.promises.readFile('./data/cards.json', { encoding: 'utf8' })
  .then((data) => {
    cards = JSON.parse(data);
  });

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
