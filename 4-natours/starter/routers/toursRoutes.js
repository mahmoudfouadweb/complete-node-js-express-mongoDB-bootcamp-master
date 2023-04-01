const express = require('express');
const {
  allTours,
  creatNewTour,
  getTour,
  updateTour,
  deleteTour,
  checkId,
  checkBody
} = require('./../controller/tourController');
const router = express.Router();

router.param('id', checkId);

router.route('/').get(allTours).post(checkBody, creatNewTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
