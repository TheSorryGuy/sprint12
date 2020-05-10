require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { PORT, DATABASE_URL, SERVER_PARAMS } = require('./config');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

app.use(helmet());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', users);
app.use('/', cards);

app.listen(PORT, () => {
  app.use('/', (req, res) => {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  });
});

mongoose.connect(DATABASE_URL, SERVER_PARAMS);
