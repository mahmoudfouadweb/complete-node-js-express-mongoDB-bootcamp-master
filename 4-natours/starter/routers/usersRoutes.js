const express = require('express');
const {
  allUsers,
  creatNewUser,
  getUser,
  updateUser,
  deleteUser
} = require('./../controller/userController');
const router = express.Router();

router.route('/').get(allUsers).post(creatNewUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
