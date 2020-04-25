const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT, DATABASE_URL } = require('./config');
const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});


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
