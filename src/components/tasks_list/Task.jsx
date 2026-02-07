import "./tasks_list.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {TasksContext} from "../../contexts/RootContext";
import {useContext} from "react";

export default function Task({id, name, state}) {
  const {tasks, setTasks} = useContext(TasksContext);

  async function completeTask(e) {
    const checked = e.target.checked;
    const nextState = checked ? "completed" : "active";
    const prev = tasks;

    setTasks(
      prev.map((task) => (task.id == id ? {...task, state: nextState} : task)),
    );

    try {
      await axios.patch(`http://localhost:3000/tasks/${id}`, {
        state: nextState,
      });
    } catch (err) {
      console.error(err);
      setTasks(prev);
    }
  }

  async function deleteTask() {
    const prev = tasks;
    setTasks((prev) => prev.filter((task) => task.id !== id));
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
    } catch (err) {
      console.error(err);
      setTasks(prev);
    }
  }

  return (
    <div className="single-task">
      <input
        className="task-checkbox"
        type="checkbox"
        checked={state == "completed"}
        onChange={completeTask}
      />
      <p
        style={{
          textDecoration: `${state == "completed" ? "line-through" : ""}`,
        }}
      >
        {name}
      </p>
      <button className="delete-single-task" onClick={deleteTask}>
        <FontAwesomeIcon icon={faBan} />
      </button>
    </div>
  );
}
