const { userValidators } = require("express-validator");

const checkValidation = (req, res, next) => {
  const errors = userValidators(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

const generateValidator = (validators) => {
  return [...validators, checkValidation];
};

module.exports = generateValidator;
