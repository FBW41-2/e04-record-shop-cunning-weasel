/** EXTERNAL DEPENDENCIES */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const weaselWare = require('./middleware/middleware');

/** ROUTERS */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records');

/** INIT */
const app = express();

/** LOGGING */
app.use(logger('dev'));

/** SETTING UP LOWDB */
const adapter = new FileSync('data/db.json');
const db = low(adapter);
db.defaults({ records:[] }).write();

/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// weaselWare
app.use(weaselWare());

/** STATIC FILES*/
app.use(express.static(path.join(__dirname, 'public')));

/** ROUTES */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/records', recordsRouter);

// start the server / wait for requests on port 8090
const port = process.env.PORT || process.argv[2] || 8090;
app.listen(port, () => console.log(`server started on port 🔥${port}🔥`));

/** EXPORT PATH */
module.exports = app;
