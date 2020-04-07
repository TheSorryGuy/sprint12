const cardsRouter = require('express').Router();

const cards = require('../data/cards.json');

cardsRouter.get('/cards', (req, res) => {
  res.send(cards);
});

cardsRouter.get('/cards/:id', (req, res) => {
  cards.forEach((item) => {
    if (item._id === req.params.id) {
      res.send([item]);
    }
    res.status(404).send([{ "message": "Запрашиваемый ресурс не найден" }]);
  });
});

module.exports = cardsRouter;
