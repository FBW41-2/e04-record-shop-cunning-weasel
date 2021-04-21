const express = require("express");
const router = express.Router();
const {
  getRecords,
  putRecord,
  delRecord,
} = require("../controllers/recordsController");

/**
 * GET all records
 */
router.get("/:id", getRecords);

// update record
router.put("/id", putRecord);

// delete record
router.delete("/:id", delRecord);

module.exports = router;
