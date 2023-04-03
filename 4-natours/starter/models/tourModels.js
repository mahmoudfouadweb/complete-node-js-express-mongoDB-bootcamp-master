const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.2,
    min: 0,
    max: 5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

/*
*************************
*  Mongoose Schema  *
*************************
another kind of method syntax:

const mongoose = require('mongoose');

const Tour = mongoose.model(
  'Tour',
  new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true
    },
    rating: {
      type: Number,
      default: 4.2,
      min: 0,
      max: 5
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    }
  })
);

module.exports = Tour;
*/
