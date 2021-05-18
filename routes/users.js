const express = require("express");
const router = express.Router();
// import body func from express validator
const userValidators = require("../lib/userRules");
const generateValidator = require("../middleware/validator");
const bcrypt = require("bcrypt");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUser,
  loginUser
} = require("../controllers/usersController");

router
  .route("/")
  .get(getUsers)
  // here wanna validate email to check if data is good to go:
  // take email field from req - check against data schema
  .post(generateValidator(userValidators), addUser);

router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

// user login route w bcrypt
router.route("/users/login").post(loginUser);

module.exports = router;
