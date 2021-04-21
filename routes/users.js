const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  postUser,
  putUser,
  delUser,
} = require("../controllers/usersController");

/**
 * GET all users
 */
router.get("/", getAllUsers);

/**
 * GET a single user
 */

router.get("/:id", getUser);
/**
 * POST a user
 */
router.post("/", postUser);

// update/ put user
router.put("/:id", putUser);

// delete a user
router.delete("/:id", delUser);

module.exports = router;
