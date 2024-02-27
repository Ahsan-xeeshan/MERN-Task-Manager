const taskModel = require("../model/taskModel");

async function taskController(req, res) {
  const { name, completed } = req.body;

  const task = await new taskModel({
    name,
    completed,
  });
  task.save();
  res.send(task);
}
module.exports = taskController;
