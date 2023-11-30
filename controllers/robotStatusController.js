const { RobotStatus, robotStatusValidator } = require("../models/robotStatus");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

const updateRobotStatus = async (req, res) => {
  const error = robotStatusValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const robotStatus = await RobotStatus.findOneAndUpdate(
    {},
    _.pick(req.body, ["status"]),
    { new: true }
  );

  if (!robotStatus) return res.status(404).send("Robot not found");
  res.send(robotStatus);
};

module.exports = {
  updateRobotStatus,
};
