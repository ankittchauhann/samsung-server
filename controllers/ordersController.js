const {
  Order,
  orderValidator,
  orderUpdateValidator,
} = require("../models/orders");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const config = require("config");

const createOrder = async (req, res) => {
  try {
    const error = orderValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const order = new Order(
      _.pick(req.body, ["order_id", "board_id", "source", "destination"])
    );
    await order.save();
    res.send(order);
  } catch (err) {
    res.status(400).send(err.errors);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "QUEUED" });
    res.send(orders);
  } catch (err) {
    res.status(400).send(err.errors);
  }
};

const updateOrder = async (req, res) => {
  try {
    const error = orderUpdateValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let status = 200;
    status =
      req.body.status === "PICK_ABORT"
        ? (status = 407)
        : req.body.status === "PLACE_ABORT"
        ? 408
        : status;

    if (req.body.status === "COMPLETED" && Boolean(config.get("retry"))) {
      const retryCondition = Math.random() < 0.5;
      if (retryCondition) {
        req.body.status = "QUEUED";
        status = 405;
      }
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      _.pick(req.body, ["status"]),
      { new: true }
    );

    if (!order) return res.status(404).send("Order with given id not found");
    res.status(status).send(order);
  } catch (err) {
    res.status(400).send(err.errors);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).send("Order with given id not found");
    res.send(order);
  } catch (err) {
    res.status(400).send(err.errors);
  }
};

module.exports = {
  getOrders,
  updateOrder,
  createOrder,
  deleteOrder,
};
