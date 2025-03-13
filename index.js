const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MainRouter = require('./src/routes');
require('dotenv').config();

// Require the database configuration file to establish the connection
require('./src/config/db');
const middleware = require('./src/utils/middlewares');

app.use(bodyParser.json());

app.use(middleware.logInfo);

app.use(MainRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
