const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { SECRET } = require('../config');
const NotFoundError = require('../errors/notFoundError');
const DuplicateError = require('../errors/duplicateError');
const PasswordLengthError = require('../errors/passwordLengthError');
const ValidationError = require('../errors/validationError');

const sendError = require('../errors/sendErrorFunction');

module.exports.getUsers = (req, res) => {
  user.find({})
    .then((users) => res.send(users))
    .catch((err) => sendError(err, res));
};


module.exports.getUserById = (req, res) => {
  user.find({ _id: req.params._id })
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((userById) => res.send(userById))
    .catch((err) => sendError(err, res));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (password.length < 8 || password.length > 30) {
    const error = new PasswordLengthError('Пароль должен содержать от 8 до 30 символов');
    sendError(error, res);
    return;
  }

  bcrypt.hash(password, 10)
    .then((hash) => user.create({
      name, about, avatar, email, password: hash,
    }))
    .then((createdUser) => res.send({
      _id: createdUser._id, name, about, avatar, email,
    }))
    .catch((err) => {
      let error = err;

      if (err.code === 11000) {
        error = new DuplicateError('email занят');
      }

      if (err.name === 'ValidationError') {
        error = new ValidationError(`Поле ${Object.keys(err.errors)} не прошло валидацию`);
      }

      return sendError(error, res);
    });
};

module.exports.refreshProfileData = (req, res) => {
  const { name, about } = req.body;

  user.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      let error = err;

      if (err.name === 'ValidationError') {
        error = new ValidationError(`Поле ${Object.keys(err.errors)} не прошло валидацию`);
      }

      sendError(error, res);
    });
};

module.exports.refreshAvatar = (req, res) => {
  const { avatar } = req.body;

  user.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      let error = err;

      if (err.name === 'ValidationError') {
        error = new ValidationError(`Поле ${Object.keys(err.errors)} не прошло валидацию`);
      }

      sendError(error, res);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return user.identifyUser(email, password)
    .then((identifiedUser) => {
      const token = jwt.sign({ _id: identifiedUser._id }, SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send({ message: 'Авторизация прошла успешно' });
    })
    .catch((err) => sendError(err, res));
};
