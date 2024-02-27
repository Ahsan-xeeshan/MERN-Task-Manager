/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="app">
      <div className="task-container">
        <h1>Task Manager App</h1>
        <TaskList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
