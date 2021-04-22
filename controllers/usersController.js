const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

// get all users
exports.getAllUsers = (req, res) => {
  const records = db.get("users").value();
  res.status(200).send(records);
};

// get a single user
exports.getUser = (req, res) => {
  const findUser = db.get("users").find({id: req.params.id}.value());
  if (findUser === null) {
      res.send("can't find user guv'nor");
  } else {
      res.json(findUser);
  }
};

// post a single user
exports.postUser = (req, res) => {
  const record = req.body;
  db.get("users").push(record).last().write();
  res.status(200).send(record);
};

// put a single user
exports.putUser = (req, res) => {
  db.get("users")
    .find({ id: req.params.id })
    .assign({ id: req.params.id })
    .write();
};

// del a single user
exports.delUser = (req, res) => {
  db.get("users").remove({ id: req.params.id }).write();
};
