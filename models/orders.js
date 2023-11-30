const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  board_id: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  source: {
    location: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    tray: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    slot: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
  },
  destination: {
    location: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    tray: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    slot: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
  },
  status: {
    type: String,
    minlength: 3,
    maxlength: 255,
    default: "QUEUED",
    Enum: ["QUEUED", "PROGRESSING", "COMPLETED", "ABORTED"],
  },
});

const schema = Joi.object({
  order_id: Joi.string().min(3).max(255).required(),
  board_id: Joi.string().min(3).max(255).required(),
  source: Joi.object({
    location: Joi.string().min(3).max(255).required(),
    tray: Joi.string().min(3).max(255).required(),
    slot: Joi.string().min(3).max(255).required(),
  }),
  destination: Joi.object({
    location: Joi.string().min(3).max(255).required(),
    tray: Joi.string().min(3).max(255).required(),
    slot: Joi.string().min(3).max(255).required(),
  }),
});

const updateSchema = Joi.object({
  status: Joi.string()
    .min(3)
    .max(255)
    .default("QUEUED")
    .valid("QUEUED", "PROGRESSING", "COMPLETED", "ABORTED"),
});

const orderValidator = (order) => {
  const result = schema.validate(order, { abortEarly: false });
  if (result.error) return result.error;
};

const orderUpdateValidator = (order) => {
  const result = updateSchema.validate(order, { abortEarly: false });
  if (result.error) return result.error;
};

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, orderValidator, orderUpdateValidator };
