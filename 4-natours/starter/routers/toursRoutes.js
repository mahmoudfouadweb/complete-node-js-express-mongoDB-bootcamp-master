// 1) import express and all requist and response handlers
const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours
} = require('./../controller/tourController');

// 2) create router Method
const router = express.Router();

// 3) register routes and pass in the router as a paramter to access the routes in other files
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router
  .route('/')
  .get(getAllTours) // e.g. app.get('/api/tours', getAllTours);
  .post(createTour); // e.g. app.post('/api/tours', createTour);
// -------------------------Tour specific routes--------------------------//
// 4) register the tour specific routes with the respective function in the controller file.

router
  .route('/:id')
  .get(getTour) // e.g. app.get('/api/tours/:id', getTour);
  .patch(updateTour) // e.g. app.put('/api/tours/:id', updateTour);
  .delete(deleteTour); // e.g. app.delete('/api/tours/:id', deleteTour);

module.exports = router;
