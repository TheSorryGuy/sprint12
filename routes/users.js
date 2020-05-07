
const usersRouter = require('express').Router();
const {
  getUsers,
  createUser,
  getUserById,
  refreshProfileData,
  refreshAvatar,
  login,
} = require('../controllers/users');

usersRouter.get('/users/login', login);
usersRouter.get('/users', getUsers);
usersRouter.get('/users/:_id', getUserById);
usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', refreshProfileData);
usersRouter.patch('/users/me/avatar', refreshAvatar);


module.exports = usersRouter;
