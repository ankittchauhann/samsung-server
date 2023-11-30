const express = require("express");
const {
  createRobot,
  deleteRobot,
  getRobot,
  getRobots,
  updateRobot,
} = require("../controllers/robotController");

const router = express.Router();

router.route("/").get(getRobots).post(createRobot);

router.route("/:id").get(getRobot).put(updateRobot).delete(deleteRobot);

module.exports = router;
