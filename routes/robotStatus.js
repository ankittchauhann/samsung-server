const express = require("express");
const {
  updateRobotStatus,
  createRobot,
  getRobots,
} = require("../controllers/robotStatusController");
const router = express.Router();

router.route("/").post(createRobot).get(getRobots);
router.route("/status").put(updateRobotStatus);

module.exports = router;
