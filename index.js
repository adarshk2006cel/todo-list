const express = require('express');
const bodyParser = require('body-parser');
const db = require('mongoose');
const app = express();
const MainRouter = require('./routes');
require('dotenv').config();

// connect to the database
db.connect(process.env.MONGO_DB_URL);
const database = db.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.log('Database connected');
});

app.use(bodyParser.json());
app.use(MainRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
