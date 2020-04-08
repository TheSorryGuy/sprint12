const usersRouter = require('express').Router();

const users = require('../data/users.json');

usersRouter.get('/users', (req, res, next) => {
  res.send(users);
  next();
});

usersRouter.get('/users/:id', (req, res, next) => {
  users.forEach((item) => {
    if (item._id === req.params.id) {
      res.send([item]);
    }
    res.status(404).send([{ message: 'Нет пользователя с таким id' }]);
  });
  next();
});

module.exports = usersRouter;
