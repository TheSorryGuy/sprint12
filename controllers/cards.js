/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const card = require('../models/card');

module.exports.getCards = (req, res) => {
  card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден', error: err.message }));
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  card.create({ name, link, owner })
    .then((newCard) => res.send(newCard))
    .catch((err) => res.status(500).send({ message: 'Не удалось создать карточку', error: err.message }));
};

module.exports.deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params._id)
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => res.status(500).send({ message: 'Не удалось удалить карточку', error: err.message }));
};
