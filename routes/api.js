const express = require("express");
const router = express.Router();
// // import lowdb
// const lowdb = require("lowdb");
// // import file interface
// const FileSync = require("lowdb/adapters/FileSync");
// // init mock db
// const adapter = new FileSync("./data/db.json");
// const db = lowdb(adapter);
// import controllers
const { getRecords, createRecords } = require("../controllers/api");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// add records end-points here
router.get("/records", getRecords);
router.post("/records", createRecords);

module.exports = router;
