const express = require('express')
const fs = require('fs');

const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
const results = tours.length;


// Handle GET request and make response
const allTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requistTime: req.requistTime,
    results,
    data: {
      tours
    }
  });
};

// Handle GET request and make response
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      data: {
        message: 'Invalid page ID'
      }
    });
  }

  res.status(200).json({
    status: 'success me',
    data: {
      tour
    }
  });
};

// Handle PATCH request and make response
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      data: {
        message: 'Invalid page ID'
      }
    });
  }

  res.status(200).json({
    status: 'succeess',
    data: {
      message: 'Update Done'
    }
  });
};

// Handle POST request and make response
const creatNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

// Handle DELETE request and make response
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({
      status: 'success',
      data: {
        message: 'Invalid page ID'
      }
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};

router.route('/').get(allTours).post(creatNewTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;