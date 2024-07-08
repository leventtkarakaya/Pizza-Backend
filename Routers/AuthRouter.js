const express = require("express");

const {
  login,
  register,
  getUser,
  userUpdate,
} = require("../Controllers/AuthController.js");
const protect = require("../Middleware/AuthMiddleware");
routers = express.Router();

routers.post("/login", login);
routers.post("/register", register);
routers.post("/get-user", getUser);
routers.put("/userUpdate", protect, userUpdate);

module.exports = routers;
