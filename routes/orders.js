const express = require("express");
const {
  getOrders,
  updateOrder,
  createOrder,
  deleteOrder,
} = require("../controllers/ordersController");

const router = express.Router();

router.route("/").get(getOrders).post(createOrder);

router.route("/:id").put(updateOrder).delete(deleteOrder);

module.exports = router;
