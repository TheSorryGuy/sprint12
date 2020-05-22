const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { SECRET } = require('../config');
const NotFoundError = require('../errors/notFoundError');
const DuplicateError = require('../errors/duplicateError');


module.exports.getUsers = (req, res, next) => {
  user.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// res.send({
//   _id: createdUser._id, name, about, avatar, email,
// })


module.exports.getUserById = (req, res, next) => {
  user.find({ _id: req.params._id })
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((userById) => res.send(userById))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => user.create({
      name, about, avatar, email, password: hash,
    }))
    .then((createdUser) => user.find({ _id: createdUser._id }))
    .then((dbUser) => res.send(dbUser))
    .catch((err) => {
      let error = err;

      if (err.code === 11000) {
        error = new DuplicateError('email занят');
      }

      next(error);
    });
};

module.exports.refreshProfileData = (req, res, next) => {
  const { name, about } = req.body;

  user.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch(next);
};

module.exports.refreshAvatar = (req, res, next) => {
  const { avatar } = req.body;

  user.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  user.identifyUser(email, password)
    .then((identifiedUser) => {
      const token = jwt.sign({ _id: identifiedUser._id }, SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send({ message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};
