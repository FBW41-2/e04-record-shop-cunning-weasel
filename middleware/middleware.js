/** EXTERNAL DEPENDENCIES */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// weasel's middleware
module.exports = weaselWare = (req, res, next) => {
  console.log("weasel's MW :)");
  res.header("Access-Control-Allow-Origin : *");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.method === "OPTIONS") {
    res.header(
        "Access-Control-Allow-Methods", 
        "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
};

