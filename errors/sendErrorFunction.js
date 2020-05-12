module.exports = function (err, res) {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка на сервере' : err.message });
};
