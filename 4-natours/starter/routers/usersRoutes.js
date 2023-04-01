const express = require('express');
const router = express.Router();
const {
  allUsers,
  creatNewUser,
  getUser,
  updateUser,
  deleteUser
} = require('./../controller/userController');

router.route('/').get(allUsers).post(creatNewUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
