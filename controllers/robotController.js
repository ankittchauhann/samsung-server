const { Robot, robotValidator } = require("../models/robots");
const _ = require("lodash");

const getRobots = async (req, res) => {
  try {
    const robots = await Robot.find().sort("serialNumber");
    res.send(robots);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getRobot = async (req, res) => {
  try {
    const robot = await Robot.findById(req.params.id);
    if (!robot) return res.status(404).send("Robot not found");
    res.send(robot);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createRobot = async (req, res) => {
  const error = robotValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const robot = new Robot(
      _.pick(req.body, ["serialNumber", "manufacturer", "model"])
    );
    await robot.save();
    res.send(robot);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateRobot = async (req, res) => {
  const error = robotValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const robot = await Robot.findByIdAndUpdate(
      req.params.id,
      _.pick(req.body, ["serialNumber", "manufacturer", "model"]),
      { new: true }
    );
    if (!robot) return res.status(404).send("Robot not found with Given ID");
    res.send(robot);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteRobot = async (req, res) => {
  try {
    const robot = await Robot.findByIdAndDelete(req.params.id);
    if (!robot) return res.status(404).send("Robot not found with given ID");
    res.send(robot);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getRobots,
  getRobot,
  createRobot,
  updateRobot,
  deleteRobot,
};
