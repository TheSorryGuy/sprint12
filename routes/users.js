const usersRouter = require('express').Router();
const fs = require('fs');

let users;
fs.promises.readFile('./data/users.json', { encoding: 'utf8' })
  .then((data) => {
    users = JSON.parse(data);
  });

usersRouter.get('/users', (req, res, next) => {
  res.send(users);
  next();
});

usersRouter.get('/users/:id', (req, res, next) => {
  users.forEach((item) => {
    if (item.id === req.params.id) {
      res.send([item]);
    }
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  });
  next();
});

module.exports = usersRouter;
