// import lowdb
const lowdb = require("lowdb");
// import file interface
const FileSync = require("lowdb/adapters/FileSync");
// setup DB connection
// initialize (mock) Database
const adapter = new FileSync("./data/db.json");
const db = lowdb(adapter);

// get controller
exports.getRecords = (req, res) => {
  res.json(db.get("records").value());
};

// post controller
exports.createRecords = (req, res) => {
  db.get("records").push(req.body).write();
  console.log(req.body);
  res.json(db.get("records").value());
};

