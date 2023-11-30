const express = require("express");
const { updateRobotStatus } = require("../controllers/robotStatusController");
const router = express.Router();

router.route("/status").put(updateRobotStatus);

module.exports = router;
