const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  id: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String
  },
  completed: {
    required: true,
    type: Boolean
  },
});

module.exports = mongoose.model('Todo', todoSchema);