const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getRecords = (req, res, next) => {
  // const records = db.get('records').value()
  // res.status(200).send(records);
  // need to add id specific find here
  db.get("records").find({ id: req.params.id }.value());
};

exports.putRecord = (req, res) => {
  db.get("records")
    .find({ id: req.params.id })
    .assign({ id: req.params.id })
    .write();
};

exports.delRecord = (req, res) => {
  db.get("records").remove({ id: req.params.id }).write();
};

