const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    match: /https?:\/\/(www.)?(((2[0-5]{2}|2[0-4][0-9]|1?[1-9]?[0-9])\.){3}(2[0-5]{2}|2[0-4][0-9]|1?[1-9]?[0-9])|([\w\-]{2,}(\.[\w\-]{2,})*\.[a-zA-Z]{2,}))(:\d{2,5})?(\/[\d\/a-zA-Z-]+#?)?/,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
