const card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');

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
    .catch((err) => res.status(500).send({ message: 'Не удалось создать карточку', error: err.message }));
};

module.exports.deleteCard = (req, res) => {
  card.findOneAndDelete({ _id: req.params.cardId, owner: req.user._id })
    .orFail(new NotFoundError('Нет созданной вами карточки с таким id'))
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка на сервере' : err.message });
    });
};

module.exports.putLike = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((likedCard) => res.send(likedCard))
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка на сервере' : err.message });
    });
};

module.exports.removeLike = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((unlikedCard) => res.send(unlikedCard))
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка на сервере' : err.message });
    });
};
