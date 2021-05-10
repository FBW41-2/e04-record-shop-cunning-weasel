// tradtional validation in express - since schema also does validation in some way - better
// to isolate to data schema

exports.userValidators = [
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
  // add all validators to the list
];

