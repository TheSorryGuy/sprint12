/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

// const usersRouter = require('express').Router();
// const fs = require('fs');
// const path = require('path');

// usersRouter.get('/users', (req, res) => {
//   fs.promises.readFile(path.join(__dirname, '..', 'data', 'users.json'), { encoding: 'utf8' })
//     .then((data) => {
//       res.send(JSON.parse(data));
//     })
//     .catch(() => {
//       res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
//     });
// });

// usersRouter.get('/users/:_id', (req, res) => {
//   fs.promises.readFile(path.join(__dirname, '..', 'data', 'users.json'), { encoding: 'utf8' })
//     .then((data) => {
//       JSON.parse(data).forEach((item) => {
//         if (item._id === req.params._id) {
//           res.send([item]);
//         }
//       });
//       res.status(404).send({ message: 'Нет пользователя с таким id' });
//     })
//     .catch(() => {
//       res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
//     });
// });

const usersRouter = require('express').Router();
const { getUsers, createUser, getUserById } = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:_id', getUserById);
usersRouter.post('/users', createUser);


module.exports = usersRouter;
