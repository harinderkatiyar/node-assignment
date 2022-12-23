const express = require("express");
const router = express.Router();
const testController = require("../controllers");

router.get("/:val", testController.getIntegerValue);

module.exports = router;
