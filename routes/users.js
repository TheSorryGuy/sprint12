
const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const URLregex = /^https?:\/\/(www.)?(((2[0-5]{2}|2[0-4][0-9]|1?[1-9]?[0-9])\.){3}(2[0-5]{2}|2[0-4][0-9]|1?[1-9]?[0-9])|([\w-]{2,}(\.[\w-]{2,})*\.[a-zA-Z]{2,}))(:\d{2,5})?(\/[\d/a-zA-Z-]+#?)?$/;

const {
  getUsers,
  getUserById,
  refreshProfileData,
  refreshAvatar,
} = require('../controllers/users');


usersRouter.get('/users', getUsers);
usersRouter.get('/users/:_id', getUserById);

usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), refreshProfileData);

usersRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(URLregex),
  }),
}), refreshAvatar);


module.exports = usersRouter;
