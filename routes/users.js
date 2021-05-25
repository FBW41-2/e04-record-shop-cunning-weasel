const express = require("express");
const router = express.Router();
const userValidators = require("../lib/userRules");
const generateValidator = require("../middleware/validator");
const checkLogin = require("../middleware/checkLogin");
const checkAdminRole = require("../middleware/checkAdminRole");
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
  .get(checkLogin, getUser)
  .delete(checkLogin, checkAdminRole, deleteUser)
  .put(checkLogin, checkAdminRole, updateUser);

router.route("/login").post(loginUser);

module.exports = router;
