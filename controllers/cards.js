const card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const ValidationError = require('../errors/validationError');
const sendError = require('../errors/sendErrorFunction');

module.exports.getCards = (req, res) => {
  card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => sendError(err, res));
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  card.create({ name, link, owner })
    .then((newCard) => res.send(newCard))
    .catch((err) => {
      let error;

      if (err.name === 'ValidationError') {
        error = new ValidationError(`Поле ${Object.keys(err.errors)} не прошло валидацию`);
      }

      sendError(error, res);
    });
};

module.exports.deleteCard = (req, res) => {
  card.findOne({ _id: req.params.cardId })
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .catch((err) => sendError(err, res));

  card.findOneAndDelete({ _id: req.params.cardId, owner: req.user._id })
    .orFail(new NotFoundError('Разрешено удалять только собственные карточки'))
    .then((deletedCard) => res.send(deletedCard))
    .catch((err) => sendError(err, res));
};

module.exports.putLike = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((likedCard) => res.send(likedCard))
    .catch((err) => sendError(err, res));
};

module.exports.removeLike = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((unlikedCard) => res.send(unlikedCard))
    .catch((err) => sendError(err, res));
};
