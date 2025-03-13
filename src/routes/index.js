const express = require('express');

const MainRouter = express.Router();

MainRouter.use('/api/tasks', require('./tasks'));
MainRouter.use('/api/users', require('./users'));

module.exports = MainRouter;