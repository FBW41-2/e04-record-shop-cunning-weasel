/** EXTERNAL DEPENDENCIES */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

/** ROUTERS */
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const recordsRouter = require("./routes/records");
const { setCors } = require("./middleware/security");
const errorHandler = require("./middleware/errorHandler");
const ordersRouter = require("./routes/orders");

/** INIT */
const app = express();

/** LOGGING */
app.use(logger("dev"));

/** SETTING UP LOWDB */
const adapter = new FileSync("data/db.json");
const db = low(adapter);
// added another default data-point to lowDB
db.defaults(
  { records: [] },
  {
    users: [
      {
        firstName: "Weasel",
        lastName: "cunning",
        email: "weasel@cunning.com",
        password: "weasel",
      },
    ],
  },
  {
    orders: [
      {
        id: 1,
        qty: 10,
      },
    ],
  }
).write();

/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(setCors);
// added error-handler MW - weasel
app.use(errorHandler);

/** STATIC FILES*/
app.use(express.static(path.join(__dirname, "public")));

/** ROUTES */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/records", recordsRouter);
app.use("/orders", ordersRouter);

/** EXPORT PATH */
module.exports = app;
