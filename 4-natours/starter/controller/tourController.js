const Tour = require('../models/tourModels');

// Handle GET request and make response
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

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
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
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
    const { id } = req.body.id;
    const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// Handle DELETE request and make response
exports.deleteTour = (req, res) => {
  // if (id > tours.length) return errorHandlerPageNotFound(res);

  res.status(204).json({
    status: 'success',
    data: null
  });
};
