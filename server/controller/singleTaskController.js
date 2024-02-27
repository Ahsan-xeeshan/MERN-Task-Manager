const taskModel = require("../model/taskModel");

async function singleTaskController(req, res) {
  const { id } = req.params;
  const singleTask = await taskModel.findById(id);
  if (!singleTask) {
    return res.status(404).json(`Task not found with the id ${id}`);
  }
  return res.json(singleTask);
}
module.exports = singleTaskController;
