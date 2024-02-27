const taskModel = require("../model/taskModel");

async function updateTaskController(req, res) {
  try {
    const { id } = req.params;
    const updateTask = await taskModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateTask) {
      return res.status(404).json(`No task to update with the id ${id}`);
    }
    return res.status(202).json(updateTask);
  } catch (error) {
    return res.status(505).json({ msg: error.message });
  }
}

module.exports = updateTaskController;
