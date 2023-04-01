const express = require('express');
const {
  allTours,
  creatNewTour,
  getTour,
  updateTour,
  deleteTour,
  checkId
} = require('./../controller/tourController');
const router = express.Router();

router.param('id',  checkId)

router.route('/').get(allTours).post(creatNewTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
