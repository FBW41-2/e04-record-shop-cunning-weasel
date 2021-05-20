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
  .get(checkLogin, getRecords)
  .post(checkLogin, addRecord);

router
  .route("/:id")
  .get(checkAdminRole, getRecord)
  .delete(checkAdminRole, deleteRecord)
  .put(checkAdminRole, updateRecord);

module.exports = router;
