const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    match: /https?:\/\/(www.)?(((2[0-5]{2}|2[0-4][0-9]|1?[1-9]?[0-9])\.){3}(2[0-5]{2}|2[0-4][0-9]|1?[1-9]?[0-9])|([\w\-]{2,}(\.[\w\-]{2,})*\.[a-zA-Z]{2,}))(:\d{2,5})?(\/[\d\/a-zA-Z-]+#?)?/,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array,
    liker: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
