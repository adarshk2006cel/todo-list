const mongoose = require('mongoose');
const { status } = require('../utils/constants');

const taskSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: status,
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Tasks', taskSchema);