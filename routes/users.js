
const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  refreshProfileData,
  refreshAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:_id', getUserById);
usersRouter.patch('/users/me', refreshProfileData);
usersRouter.patch('/users/me/avatar', refreshAvatar);


module.exports = usersRouter;
