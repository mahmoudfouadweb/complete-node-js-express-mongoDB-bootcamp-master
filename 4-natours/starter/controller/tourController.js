const Tour = require('../models/tourModels');

// Handle GET request and make response
exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // 1) Filtering
    const queryObj = { ...req.query };
    const exludedFields = ['limit', 'page', 'sort'];
    exludedFields.forEach(field => delete queryObj[field]);
    // 2) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      match => `$${match}`
    );

    // 3) Sorting
    const query = Tour.find(JSON.parse(queryStr));

    // excute query
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
      status: 'error',
      message: err
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
