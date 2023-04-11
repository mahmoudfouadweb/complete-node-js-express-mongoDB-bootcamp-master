const Tour = require('../models/tourModels');
const catchAsync = require('./../util/catchAsync');
const APIFeatures = require('./../util/apiFeatures');
const AppError = require('../util/appError');

// Handle GET request and make response
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,ratingAverage';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};

// getAllTours: Retrieve all the user's Tours from the database.
exports.getAllTours = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginat();
  const tours = await features.query;
  console.log('A tours are loaded');

  // send response
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: tours
  });
});

// Handle GET request and make response
exports.getTour = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const tour = await Tour.findById(id);
  if (!tour) return next(new AppError('No tour found with that ID', 404));

  // Tour.findOne({ _id: id }); ==> another method to get tour by ID
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

// Handle POST request and make response
exports.createTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.create(req.body);
  if (!tour) return next(new AppError('No tour found with that ID', 404));

  res.status(201).json({
    status: 'success',
    data: {
      tour
    }
  });
});

// Handle PATCH request and make response
exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!tour) return next(new AppError('No tour found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

// Handle DELETE request and make response
exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) return next(new AppError('No tour found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingAverage: { $gte: 4.1 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingQuantity' },
        avgRating: { $avg: '$ratingAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    { $sort: { avgPrice: -1 } }
    // { $match: { _id: { $ne: 'EASY' } } }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numToursStart: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: {
        _id: 0 //removed _id from result.  Not needed.  Just added it to the end.
      }
    },
    {
      $sort: { numToursStart: -1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan
    }
  });
});
