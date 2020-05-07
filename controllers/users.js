const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const NotFoundError = require('../errors/notFoundError');

module.exports.getUsers = (req, res) => {
  user.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: 'Запрашиваемый ресурс не найден', error: err.message }));
};

module.exports.getUserById = (req, res) => {
  user.find({ _id: req.params._id })
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((userById) => res.send(userById))
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка на сервере' : err.message });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => user.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => res.send(newUser))
    .catch((err) => res.status(500).send({ message: 'Не удалось создать пользователя', error: err.message }));
};

module.exports.refreshProfileData = (req, res) => {
  const { name, about } = req.body;

  user.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => res.status(500).send({ message: 'Не удалось обновить информацию о пользователе', error: err.message }));
};

module.exports.refreshAvatar = (req, res) => {
  const { avatar } = req.body;

  user.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => res.status(500).send({ message: 'Не удалось обновить аватар', error: err.message }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return user.identifyUser(email, password)
    .then((identifiedUser) => {
      const token = jwt.sign({ _id: identifiedUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send({ message: 'Авторизация прошла успешно' });
    })
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка на сервере' : err.message });
    });
};
