const card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');

module.exports.getCards = (req, res, next) => {
  card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  card.create({ name, link, owner })
    .then((newCard) => res.send(newCard))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  card.findOne({ _id: req.params.cardId })
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((cardExist) => {
      if (cardExist.owner.toString() !== req.user._id) {
        throw new NotFoundError('Можно удалять только свои карточки');
      }
      cardExist.remove();
      res.send(cardExist);
    })
    .catch(next);
};

module.exports.putLike = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((likedCard) => res.send(likedCard))
    .catch(next);
};

module.exports.removeLike = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((unlikedCard) => res.send(unlikedCard))
    .catch(next);
};
