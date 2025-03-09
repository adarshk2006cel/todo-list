const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MainRouter = require('./src/routes');
require('dotenv').config();

// Require the database configuration file to establish the connection
require('./src/config/db');

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("LOOGING REQUEST");
  console.log('Request URL:', req.url);
  console.log('Request Method:', req.method);
  next();
});

app.use(MainRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
