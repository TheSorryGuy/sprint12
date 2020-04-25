
const card = require('../models/card');

module.exports.getCards = (req, res) => {
  card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: 'Запрашиваемый ресурс не найден', error: err.message }));
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  card.create({ name, link, owner })
    .then((newCard) => res.send(newCard))
    .catch((err) => res.status(400).send({ message: 'Не удалось создать карточку', error: err.message }));
};

module.exports.deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params._id)
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => res.status(400).send({ message: 'Не удалось удалить карточку', error: err.message }));
};

module.exports.putLike = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((likedCard) => res.send(likedCard))
    .catch((err) => res.status(400).send({ message: 'Не удалось поставить лайк', error: err.message }));
};

module.exports.removeLike = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((unlikedCard) => res.send(unlikedCard))
    .catch((err) => res.status(400).send({ message: 'Не удалось удалить лайк', error: err.message }));
};
