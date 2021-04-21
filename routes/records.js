const express = require("express");
const router = express.Router();
const {
  getRecord,
  putRecord,
  delRecord,
} = require("../controllers/recordsController");

/**
 * GET all records
 */
router.get("/:id", getRecord);

// update record
router.put("/id", putRecord);

// delete record
router.delete("/:id", delRecord);

module.exports = router;
