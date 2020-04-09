const usersRouter = require('express').Router();
const fs = require('fs');
const path = require('path');


usersRouter.get('/users', (req, res) => {
  fs.promises.readFile(path.join(__dirname, '..', 'data', 'users.json'), { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch(() => {
      res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
    });
});

usersRouter.get('/users/:id', (req, res) => {
  fs.promises.readFile(path.join(__dirname, '..', 'data', 'users.json'), { encoding: 'utf8' })
    .then((data) => {
      JSON.parse(data).forEach((item) => {
        if (item.id === req.params.id) {
          res.send([item]);
        }
      });
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .catch(() => {
      res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
    });
});

module.exports = usersRouter;
