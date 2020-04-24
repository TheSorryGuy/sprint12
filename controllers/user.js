/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const user = require('../models/user');

module.exports.getUsers = (req, res) => {
  user.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден', error: err.message }));
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
    .catch((err) => res.status(500).send({ message: 'Не удалось создать пользователя', error: err.message }));
};
