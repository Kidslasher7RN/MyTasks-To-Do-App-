import "./FilterBox.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useContext, useState, useEffect} from "react";
import {TasksContext} from "../contexts/RootContext";
import axios from "axios";

export default function FilterBox() {
  const {tasks, setTasks, setShownTasks} = useContext(TasksContext);
  const [currentFilter, setCurrentFilter] = useState("all");

  useEffect(() => {
    function getTasks(url) {
      axios
        .get(url)
        .then((res) => {
          setTasks(res.data);
        })
        .catch((err) => console.error("Fetch Error : ", err));
    }
    getTasks("http://localhost:3000/tasks");
  }, []);

  useEffect(() => {
    if (currentFilter === "all") {
      setShownTasks(tasks);
      return;
    }
    if (currentFilter === "active") {
      setShownTasks(tasks.filter((task) => task.state == "active"));
      return;
    }
    setShownTasks(tasks.filter((task) => task.state == "completed"));
  }, [tasks, currentFilter, setShownTasks]);

  async function clearCompletedTasks() {
    const prev = tasks;
    setTasks((prev) => prev.filter((task) => task.state != "completed"));
    const deletedTasks = prev.filter((task) => task.state == "completed");

    try {
      await deletedTasks.forEach((delTask) => {
        axios.delete(`http://localhost:3000/tasks/${delTask.id}`);
      });
    } catch (err) {
      console.error(err);
      setTasks(prev);
    }
  }

  return (
    <div className="filter-box-container">
      <ul className="content-filter">
        <li
          className={`filter ${currentFilter == "all" ? "active" : ""}`}
          onClick={() => setCurrentFilter("all")}
        >
          All
        </li>
        <li
          className={`filter ${currentFilter == "active" ? "active" : ""}`}
          onClick={() => setCurrentFilter("active")}
        >
          Active
        </li>
        <li
          className={`filter ${currentFilter == "completed" ? "active" : ""}`}
          onClick={() => setCurrentFilter("completed")}
        >
          Completed
        </li>
      </ul>

      <button className="clear-completed" onClick={clearCompletedTasks}>
        <FontAwesomeIcon icon={faTrash} />
        Clear Completed
      </button>
    </div>
  );
}
