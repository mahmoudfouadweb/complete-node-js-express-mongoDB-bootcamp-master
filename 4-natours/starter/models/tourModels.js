const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal than 40 characters'],
      minlength: [10, 'A tour name must have more or equal than 10 characters']
      // validate: [validator.isAlpha, 'A name must have a characters only']
    },
    slug: String,
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
      trim: true,
      enum: {
        values: ['easy', 'normal', 'difficult'],
        message: 'A tour difficulty must be either easy, normal or difficult'
      }
    },
    ratingAverage: {
      type: Number,
      default: 4.6,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be above 1.0']
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
      type: Number,
      validate: {
        validator: function(val) {
          // this only points to current doc on NEW document creation not for update()
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
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
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7; // Calculate the duration in weeks.
});

/* --------- DOCUMENT MIDDLEWARE : runs before .save() and .create() -------- */
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

/* ---------------------------- QUERY MIDDLEWARE ---------------------------- */
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  // console.log('doc :>> ', docs);
  next();
});

tourSchema.post(/^find/, function(doc, next) {
  // console.log(
  //   'Query took ${Date.now() - this.start} milliseconds :>> ',
  //   `Query took ${Date.now() - this.start} milliseconds`
  // );
  next();
});

/* ------------------------- AGGREGATION MIDDLEWARE ------------------------- */
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log('this :>> ', this.pipeline());

  next();
});
/* --------------------------- to show how it work -------------------------- */
// tourSchema.pre('save', function(next) {
//   console.log('Will save document... :>> ');
//   next();
// });

// tourSchema.pre('create', function(doc, next) {
//   console.log('doc :>> ', doc);
// });

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
