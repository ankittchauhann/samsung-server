const mongoose = require("mongoose");
const Joi = require("joi");

const robotSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
      unique: true,
    },
    manufacturer: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    model: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
  },
  { timestamps: true }
);

const schema = Joi.object({
  serialNumber: Joi.string().min(3).max(255).required(),
  manufacturer: Joi.string().min(3).max(255).required(),
  model: Joi.string().min(3).max(255).required(),
});

const robotValidator = (robot) => {
  schema.validate(robot, { abortEarly: false });
};

const Robot = mongoose.model("Robot", robotSchema);

module.exports = { Robot, robotValidator };
