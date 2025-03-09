const express = require('express');

const MainRouter = express.Router();

MainRouter.use('/api/tasks', require('./tasks'));

module.exports = MainRouter;