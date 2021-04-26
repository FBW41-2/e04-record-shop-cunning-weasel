const mongodb = require("mongodb");

exports.getOrders = (req, res, next) => {
  req.app.locals.db
    .collection("orders")
    .find()
    .toArray((err, docs) => {
      res.json(docs);
    });
};

exports.getOrder = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db
    .collection("orders")
    .findOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
      res.json(result);
    });
};

exports.deleteOrder = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db
    .collection("orders")
    .deleteOne({ _id: new mongodb.ObjectID(id) }, (err, result) => {
      if (err) console.error(err);
      console.log("del result", result);
      res.json({ deleted: result.deletedCount });
    });
};

exports.updateOrder = (req, res, next) => {
  const { id } = req.params;
  req.app.locals.db.collection("orders").updateOne(
    // filter
    { _id: new mongodb.ObjectID(id) },
    // new data
    {
      $set: req.body,
    },
    // callback function
    (err, entry) => {
      res.json(entry);
    }
  );
};

exports.addOrder = (req, res, next) => {
  const record = req.body;
  // access db from global object
  req.app.locals.db.collection("orders").insertOne(order, (err, entry) => {
    res.json(entry);
  });
};
