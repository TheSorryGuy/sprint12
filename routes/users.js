
const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { URL_REGEX } = require('../config');

const {
  getUsers,
  getUserById,
  refreshProfileData,
  refreshAvatar,
} = require('../controllers/users');


usersRouter.get('/users', getUsers);
usersRouter.get('/users/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), getUserById);

usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), refreshProfileData);

usersRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(URL_REGEX),
  }),
}), refreshAvatar);


module.exports = usersRouter;
