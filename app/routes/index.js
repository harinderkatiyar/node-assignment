const express = require("express");
const router = express.Router();
const testRoute = require("../routes/test");

router.use("/test", testRoute);

module.exports = router;
