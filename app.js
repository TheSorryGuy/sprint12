const express = require('express');
const path = require('path');

const { PORT = 3000 } = process.env;
const app = express();
const users = require('./routes/users.js');
const cards = require('./routes/cards.js');

app.use('/', users);
app.use('/', cards);

app.listen(PORT, () => {
  app.use(express.static(path.join(__dirname, 'public')));
});
