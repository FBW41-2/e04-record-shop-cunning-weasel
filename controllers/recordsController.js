const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getRecord = (req, res) => {
  const findRecord = db.get("records").find({id: req.params.id}.value());
  if (findRecord === null) {
      res.send("can't find user guv'nor");
  } else {
      res.json(findRecord);
  }
};

exports.putRecord = (req, res) => {
  db.get("records")
    .find({ id: req.params.id })
    .assign({ id: req.params.id, title: req.params.title })
    .write();
};

exports.delRecord = (req, res) => {
  const delRecord = db.get("records").remove({ id: req.params.id }).write();
  res.json(delRecord);
};

