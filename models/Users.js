const mongoose = require('mongoose');

const usersScheme = new mongoose.Schema({
  uusername: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwords: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Users', usersScheme);