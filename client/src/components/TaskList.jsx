import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import loadingImg from "../assets/loader.gif";
import Task from "./Task";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const getTask = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/api/v1/task/alltask")
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getTask();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty");
    }

    axios
      .post(`http://localhost:3000/api/v1/task/createtask`, formData)
      .then(() => {
        setFormData({ ...formData, name: "" });
        getTask();
        toast.success("Task added successfully");
      })
      .catch((error) => {
        setFormData("");
        toast.error(error.message);
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:3000/api/v1/task/singletask/${id}`)
      .then(() => {
        toast.success("Task is deleted successfully");
        setIsLoading(false);
        getTask();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskID(task._id);
    setIsEditing(true);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field can not be blank");
    }
    setIsLoading(true);
    await axios
      .put(`http://localhost:3000/api/v1/task/singletask/${taskID}`, formData)
      .then(() => {
        toast.success("Task is updated successfully");
        setFormData({ ...formData, name: "" });
        setIsEditing(false);
        getTask();
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  const setToComplete = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true,
    };

    await axios
      .put(
        `http://localhost:3000/api/v1/task/singletask/${task._id}`,
        newFormData
      )
      .then(() => {
        getTask();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    const completedCount = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTasks(completedCount);
  }, [tasks]);
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {tasks.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Tasks:</b>
            {tasks.length}
          </p>
          <p>
            <b>Completed:</b>
            {completedTasks.length}
          </p>
        </div>
      )}

      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="Loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No Task Found. Please add a task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                task={task}
                key={task._id}
                index={index}
                handleDelete={handleDelete}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskList;
