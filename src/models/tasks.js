const mongoose = require('mongoose');

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
    enum: ['Pending', 'In Progress', 'Completed'],
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