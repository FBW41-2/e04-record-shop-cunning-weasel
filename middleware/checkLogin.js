const jwt = require("jsonwebtoken");

// token verification
module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-auth"];
    if (token === null) {
      return res.sendStatus(401);
    }
    // see if user provided valid token with request
    const tokenData = jwt.verify(token, process.env.TOKEN_SECRET);

    // get info back out of token
    req.user = tokenData;

    next();
  } catch (err) {
    next(err);
  }
};
