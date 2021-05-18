const User = require("../models/User");
const createError = require("http-errors");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ lastName: "desc" }); // ascending order
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("lastName");
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
  const userData = req.body;
  // encrypt password
  userData.password = bcrypt.hash(userData.password, 20);
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, userData, {
      new: true,
    });
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch(e) {
    next(e);
  }
};

// add user login w bcrypt
exports.addUser = async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const foundUser = await User.findOne({
    email: email,
    password: password,
  }).select("+password");
  console.log(foundUser);
  if (!foundUser) {
    res.json({ error: "User not found bruv" });
  } else if (await bcrypt.compare(password, foundUser.password)) {
    res.json({ status: "logged in mate", user: foundUser });
  } else {
    res.json({ error: "wrong password mate" });
  }
};

exports.changeUserInfo = async (req, res, next) => {
  
}