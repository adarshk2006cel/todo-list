const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB_URL);
const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  console.log('Database connected');
});