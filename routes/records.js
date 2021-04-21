const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);
const { getRecords, addRecord } = require('../controllers/recordsController');


/**
 * GET all records
 */
router.get('/:id', getRecords);

/**
* POST a record
 */
router.post('/:id', addRecord);

// update record 
router.put("/id", putRecord);

// delete record 
router.delete("/:id", delRecord);


module.exports = router;
