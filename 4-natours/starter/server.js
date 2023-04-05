// 1) import mongoose and dotenv
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 2) set dotenv file and app function
dotenv.config({ path: './config.env' });
const app = require('./app');

// 3) connect to mongodb server and run app on port 3000
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App Running on part ${port}`));
