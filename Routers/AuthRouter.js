const express = require("express");

const {
  login,
  register,
  getUser,
} = require("../Controllers/AuthController.js");

routers = express.Router();

routers.post("/login", login);
routers.post("/register", register);
routers.post("/getUser", getUser);

module.exports = routers;
