const { RobotStatus, robotStatusValidator } = require("../models/robotStatus");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

const createRobot = async (req, res) => {
  const error = robotStatusValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const duplication = await RobotStatus.findOne({});
  if (duplication) return res.status(400).send("Robot already exists");

  const robot = new RobotStatus(_.pick(req.body, ["status"]));
  await robot.save();
  res.send(robot);
};
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

const getRobots = async (req, res) => {
  const robots = await RobotStatus.find();
  res.send(robots);
};

module.exports = {
  updateRobotStatus,
  createRobot,
  getRobots,
};
