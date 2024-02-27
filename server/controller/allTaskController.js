const taskModel = require("../model/taskModel");

async function allTaskController(req, res) {
  const task = await taskModel.find();
  return res.json(task);
}
module.exports = allTaskController;
