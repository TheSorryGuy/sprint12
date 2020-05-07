const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT, DATABASE_URL, SERVER_PARAMS } = require('./config');
const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '5ea21dc998352e295cc4ca6c',
  };
  next();
});
app.use('/', users);
app.use('/', cards);

app.listen(PORT, () => {
  app.use('/', (req, res) => {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  });
});

mongoose.connect(DATABASE_URL, SERVER_PARAMS);
