const express = require("express");
const router = express.Router();
const checkAdminRole = require("../middleware/checkAdminRole");
const checkLogin = require("../middleware/checkLogin");
const {
  getRecords,
  getRecord,
  updateRecord,
  deleteRecord,
  addRecord
} = require("../controllers/recordsController");

router
  .route("/")
  .get(getRecords)
  .post(checkLogin, addRecord);

router
  .route("/:id")
  .get(checkLogin, getRecord)
  .delete(checkLogin, checkAdminRole, deleteRecord)
  .put(checkLogin, updateRecord);

module.exports = router;

