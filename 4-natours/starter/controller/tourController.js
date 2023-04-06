const Tour = require('../models/tourModels');

// Handle GET request and make response
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.field = 'name,price,description,difficulty,ratingAverage,';
  next();
};
// getAllTours: Retrieve all the user's Tours from the database.
exports.getAllTours = async (req, res) => {
  try {
    /* ----------------------------- // BUILD QUERY // ----------------------------- */
    /* ----------------------------  1A) Filtering ---------------------------- */
    const queryObj = { ...req.query };
    const exludedFields = ['limit', 'page', 'sort'];
    exludedFields.forEach(field => delete queryObj[field]);
    /* ------------------------  1B) Advanced filtering ----------------------- */
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      match => `$${match}`
    );

    /* ------------------------------  2) Sorting ----------------------------- */
    const queryParse = JSON.parse(queryStr);
    let query = Tour.find(queryParse);
    if (req.query.sort) {
      // if sort is specified, sort the results by that field.
      const sortedBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortedBy); // sort is a function.
    } else {
      // if no sort is specified, sort the results by the creation time.
      query = query.sort('-createdAt');
    }

    /* ---------------  3) Limit the number of fields returned. --------------- */
    if (req.query.field) {
      // if field is specified, limit the number of fields returned.
      const fields = req.query.field.split(',').join(' ');
      query = query.select(fields);
    } else {
      // if no field is specified, limit the number of fields returned.
      query = query.select('-__v'); // select all fields, except __v.
    }

    /* ------------------------------ 4) pagination ----------------------------- */
    if (req.query.page && req.query.limit) {
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 10; // default to 10.
      const skip = (page - 1) * limit; // skip the number of records.

      query = query.skip(skip).limit(limit); // skip and limit the number of records.

      const numTours = await Tour.countDocuments(); // count the number of records
      if (skip >= numTours) throw new Error('This Page is not exist 404');
    }

    /* ------------------------------ (Finaly) excute query ------------------------------ */
    const tours = await query;
    console.log('A tours are loaded');

    // send response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: tours
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Handle GET request and make response
exports.getTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);
    // Tour.findOne({ _id: id }); ==> another method to get tour by ID
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err
    });
  }
};

// Handle POST request and make response
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// Handle PATCH request and make response
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// Handle DELETE request and make response
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};
