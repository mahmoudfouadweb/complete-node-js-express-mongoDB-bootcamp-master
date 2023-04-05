const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a gruop size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    trim: true
  },
  ratingAverage: {
    type: Number,
    default: 4.6,
    min: 0,
    max: 5
  },
  ratingQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: {
    type: Number
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a image cover']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDate: Date
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
