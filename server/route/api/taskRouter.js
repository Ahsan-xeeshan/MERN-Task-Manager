const express = require("express");
const taskController = require("../../controller/taskController");
const allTaskController = require("../../controller/allTaskController");
const singleTaskController = require("../../controller/singleTaskController");
const deleteTaskController = require("../../controller/deleteTaskController");
const updateTaskController = require("../../controller/updateTaskController");
const router = express.Router();

router.post("/createtask", taskController);
router.get("/alltask", allTaskController);
router
  .route("/singletask/:id")
  .get(singleTaskController)
  .delete(deleteTaskController)
  .put(updateTaskController);
// router.get("/singletask/:id", singleTaskController);
// router.delete("/singletask/:id", deleteTaskController);
// router.put("/singletask/:id", updateTaskController);
module.exports = router;
