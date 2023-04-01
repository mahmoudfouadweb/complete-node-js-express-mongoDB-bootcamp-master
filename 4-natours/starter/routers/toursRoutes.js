const express = require('express');
const router = express.Router();
const {
  allTours,
  creatNewTour,
  getTour,
  updateTour,
  deleteTour
} = require('./../controller/tourController');

router.route('/').get(allTours).post(creatNewTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
