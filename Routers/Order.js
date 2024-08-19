const express = require("express");
const { createOrder } = require("../Controllers/OrderController");

const router = express.Router();

router.post("/create-order", createOrder);

module.exports = router;
