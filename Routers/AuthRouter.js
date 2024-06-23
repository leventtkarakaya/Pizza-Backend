const express = require("express");

const {
  login,
  register,
  getUser,
} = require("../Controllers/AuthController.js");

routers = express.Router();

routers.post("/login", login);
routers.post("/register", register);
routers.post("/get-user", getUser);

module.exports = routers;
