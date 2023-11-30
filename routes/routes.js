const express = require("express");
const orders = require("./orders");
const robotStatus = require("./robotStatus");

const router = express.Router();

router.use("/orders", orders);

router.use("/robot", robotStatus);

module.exports = router;
