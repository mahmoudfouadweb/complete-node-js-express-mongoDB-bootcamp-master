const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

const Tour = require('./../../models/tourModels');

dotenv.config({ path: './../../config.env' });

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

// Read Json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8', err => {
    console.log(err);
  })
);

// IMPORT ALL TOURS INTO DB
const importData = async () => {
  try {
    Tour.create(tours);
    process.exit();

    console.log('Tours created!');
  } catch (err) {
    console.log(err);
  }
};

// DELETR ALL TOURS FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    process.exit();

    console.log('Tours deleted!');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
