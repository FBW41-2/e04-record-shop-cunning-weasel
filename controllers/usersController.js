const User = require("../models/User");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ lastName: "desc" }); // descending order
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

// add user pass hash w bcypt
exports.updateUser = async (req, res, next) => {
  // const token = req.headers.key;
  // const userData = req.body;
  // replace above with JWT
  // encrypt password
  try {
    const user = await User.findByIdAndUpdate(req.params.id, userToken, {
      new: true,
      runValidators: true,
    });
    if (!user) throw new createError.NotFound();
    res.status(200).set({ "x-auth": token }).send(user);
  } catch (e) {
    next(e);
  }
};

// add user login w bcrypt -> registration - do the same as loginUser (return JWT) - so
// that user is logged in on registration
exports.addUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const token = crypto.randomBytes(20).toString("hex");
  // change the above to take function call from generateAuthToken
  const user = new User(req.body);
  try {
    await user.save();
    res.set({ "x-auth": token }).status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.loginUser = async (req, res, next) => {
  const userCredentials = req.body;
  const foundUser = await User.findOne({
    email: userCredentials.email
  }).select("+password");
  console.log(userCredentials, foundUser);
  if (!foundUser) {
    res.json({ error: "No such User mate" });
  } else if (await bcrypt.compare(userCredentials.password, foundUser.password)) {
    // const token = crypto.randomBytes(10).toString("hex");
    // create jwt to replace above regular token
    const token = jwt.sign(foundUser.toObject(), process.env.TOKEN_SECRET);
    // store key in user  DB entry
    await User.findByIdAndUpdate(foundUser.id, { token });
    return res
      .set({ "x-auth": token })
      .json({ status: "you're in bruh", token: token });
  } else {
    res.json({ error: "wrong password - the hell's wrong wit you?" });
  }
};

