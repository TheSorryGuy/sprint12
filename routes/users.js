const usersRouter = require('express').Router();

const users = require('../data/users.json');

usersRouter.get('/users', (req, res) => {
  res.send(users);
});

usersRouter.get('/users/:id', (req, res) => {
  users.forEach((item) => {
    if (item._id === req.params.id) {
      res.send([item]);
    }
    res.status(404).send([{ "message": "Нет пользователя с таким id" }]);
  });
});

module.exports = usersRouter;
