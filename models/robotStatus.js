const mongoose = require("mongoose");
const Joi = require("joi");

const robotStatusSchema = new mongoose.Schema({
  status: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
});

const schema = Joi.object({
  status: Joi.string().min(3).max(255).required(),
});

const robotStatusValidator = (robot) => {
  const result = schema.validate(robot, { abortEarly: false });
  if (result.error) {
    return result.error;
  }
};

const RobotStatus = mongoose.model("RobotStatus", robotStatusSchema);

module.exports = {
  RobotStatus,
  robotStatusValidator,
};
