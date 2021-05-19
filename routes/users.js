const express = require("express");
const router = express.Router();
// import body func from express validator
const userValidators = require("../lib/userRules");
const generateValidator = require("../middleware/validator");
const checkLogin = require("../middleware/checkLogin");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUser,
  loginUser,
} = require("../controllers/usersController");

router
  .route("/")
  .get(getUsers)
  // take email field from req - check against data schema
  .post(generateValidator(userValidators), addUser);

router
  .route("/:id")
  .get(getUser)
  .delete(deleteUser)
  .put(checkLogin, updateUser);

router.route("/login").post(checkLogin, loginUser);

module.exports = router;
