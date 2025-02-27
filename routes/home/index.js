const express = require('express');

const MainRouter = express.Router();

MainRouter.get('/', (req, res) => {
  res.send('Hello Adarsh!');
});

module.exports = MainRouter;