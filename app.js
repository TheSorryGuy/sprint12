require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors, Joi, celebrate } = require('celebrate');

const { PORT, DATABASE_URL, SERVER_PARAMS } = require('./config');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const URLregex = /^https?:\/\/(www.)?(((2[0-5]{2}|2[0-4][0-9]|1?[1-9]?[0-9])\.){3}(2[0-5]{2}|2[0-4][0-9]|1?[1-9]?[0-9])|([\w-]{2,}(\.[\w-]{2,})*\.[a-zA-Z]{2,}))(:\d{2,5})?(\/[\d/a-zA-Z-]+#?)?$/;


const app = express();

app.use(helmet());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/signin', login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().pattern(URLregex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
}), createUser);

app.use(auth);

app.use('/', users);
app.use('/', cards);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  app.use('/', (req, res) => {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  });
});

mongoose.connect(DATABASE_URL, SERVER_PARAMS);
