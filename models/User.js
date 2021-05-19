const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  console.log("UserModel", this);
  next();
});

// create token here for reuse
UserSchema.methods.generateToken = function (next) {
  const token = jwt.sign(user._id.toHexString(), process.env.TOKEN_SECRET);
  this.token = token;
  user.save(function (err, user) {
    if (err) {
      return;
    }
  });
};

UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model("User", UserSchema);
