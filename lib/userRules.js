// tradtional validation in express - since schema also does validation in some way - better
// to isolate to data schema
const { body } = require("express-validator");

module.exports = [
  body("email")
    .isEmail()
    // sanitization
    .normalizeEmail() 
    .withMessage(`Incorrect email mate ¯\_(ツ)_/¯ `),
  body("password")
    .isStrongPassword()
    .withMessage(`Pass ain't secure enough mate ¯\_(ツ)_/¯ `),
  body("firstName")
    .exists() // check if data exists before running sanitization
    // sanitization
    .trim()
    .withMessage("Where yo first name mate!?!?"),
];

