const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  emailId: {
    required: true,
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date,
  },
  lastLogin: {
    type: Date,
  },
});

module.exports = mongoose.model('Users', userSchema);