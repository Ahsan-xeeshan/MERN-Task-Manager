/* eslint-disable react/prop-types */
const TaskForm = ({
  createTask,
  name,
  handleInputChange,
  isEditing,
  updateTask,
}) => {
  return (
    <div>
      <form
        className="task-form"
        onSubmit={isEditing ? updateTask : createTask}
      >
        <input
          type="text"
          placeholder="Add a task"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <button type="submit">{isEditing ? "EDIT" : "ADD"}</button>
      </form>
    </div>
  );
};

export default TaskForm;
