const mongoose = require('mongoose');

const rolesScheme = new mongoose.Schema({
  role_name: {
    type: String,
    required: true,
    lowercase: true,
  },
});

module.exports = mongoose.model('Roles', rolesScheme);