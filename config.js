module.exports.PORT = process.env.PORT || 3000;
module.exports.DATABASE_URL = 'mongodb://localhost:27017/mestodb';
module.exports.SECRET = process.env.JWT_SECRET || 'secret-key';
module.exports.SERVER_PARAMS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
