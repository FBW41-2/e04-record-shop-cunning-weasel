const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

// get all orders
exports.getAllOrders = (req, res) => {
  db.get("orders").value();
  res.status(200).send(db.get("orders").value());
};

// get a single order
exports.getOrder = (req, res) => {
  const findOrder = db.get("orders").find({id: req.params.id}.value());
  if (findOrder === null) {
      res.send("can't find user guv'nor");
  } else {
      res.json(findOrder);
  }
};

// post a single order
exports.postOrder = (req, res) => {
  const order = req.params.id;
  db.get("orders").push(order).last().write();
  res.status(200).send(order);
};

exports.putOrder = (req, res) => {
  db.get("orders")
  .find({ id: req.params.id })
  .assign({ id: req.params.id })
  .write();
};

// del a single order
exports.delOrder = (req, res) => {
  db.get("orders").remove({ id: req.params.id }).write();
};

