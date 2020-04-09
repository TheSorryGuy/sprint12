const express = require('express');
const path = require('path');

const { PORT = 3000 } = process.env;
const app = express();

const users = require('./routes/users');
const cards = require('./routes/cards');

app.use('/', users);
app.use('/', cards);

app.listen(PORT, () => {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/', (req, res) => {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  });
});
