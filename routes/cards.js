/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

// const cardsRouter = require('express').Router();
// const fs = require('fs');
// const path = require('path');

// cardsRouter.get('/cards', (req, res) => {
//   fs.promises.readFile(path.join(__dirname, '..', 'data', 'cards.json'), { encoding: 'utf8' })
//     .then((data) => {
//       res.send(JSON.parse(data));
//     })
//     .catch(() => {
//       res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
//     });
// });

// cardsRouter.get('/cards/:_id', (req, res) => {
//   fs.promises.readFile(path.join(__dirname, '..', 'data', 'cards.json'), { encoding: 'utf8' })
//     .then((data) => {
//       JSON.parse(data).forEach((item) => {
//         if (item._id === req.params._id) {
//           res.send([item]);
//         }
//       });
//       res.status(404).send({ message: 'Нет карточки с таким id' });
//     })
//     .catch(() => {
//       res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
//     });
// });

const cardsRouter = require('express').Router();
const { getCards, postCard, deleteCard } = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', postCard);
cardsRouter.delete('/cards/:_id', deleteCard);


module.exports = cardsRouter;
