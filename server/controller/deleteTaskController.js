const taskModel = require("../model/taskModel");

async function deleteTaskController(req, res) {
  const { id } = req.params;
  const deleteTask = await taskModel.findByIdAndDelete(id);
  if (!deleteTask) {
    return res.status(404).json(`No task to delete with the id ${id}`);
  }
  return res.json("Task deleted successfully");
}
module.exports = deleteTaskController;
