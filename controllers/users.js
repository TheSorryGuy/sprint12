
const user = require('../models/user');

module.exports.getUsers = (req, res) => {
  user.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: 'Запрашиваемый ресурс не найден', error: err.message }));
};

module.exports.getUserById = (req, res) => {
  user.find({ _id: req.params._id })
    .then((userById) => res.send(userById))
    .catch((err) => res.status(404).send({ message: 'Нет пользователя с таким id', error: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  user.create({ name, about, avatar })
    .then((newUser) => res.send(newUser))
    .catch((err) => res.status(400).send({ message: 'Не удалось создать пользователя', error: err.message }));
};

module.exports.refreshProfileData = (req, res) => {
  const { name, about } = req.body;

  user.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => res.status(400).send({ message: 'Не удалось обновить информацию о пользователе', error: err.message }));
};

module.exports.refreshAvatar = (req, res) => {
  const { avatar } = req.body;

  user.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => res.status(400).send({ message: 'Не удалось обновить аватар', error: err.message }));
};
