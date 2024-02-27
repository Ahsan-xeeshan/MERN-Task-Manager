const express = require("express");
const taskRouter = require("./taskRouter");
const router = express.Router();

router.use("/task", taskRouter);
module.exports = router;
