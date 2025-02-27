const express = require('express');

const MainRouter = express.Router();

MainRouter.use('/todos', require('./todos'));
MainRouter.use('/', require('./home'));

module.exports = MainRouter;