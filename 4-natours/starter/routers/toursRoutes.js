const express = require('express');
const {
  allTours,
  creatNewTour,
  getTour,
  updateTour,
  deleteTour
} = require('./../controller/tourController');
const router = express.Router();

router.route('/').get(allTours).post(creatNewTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
