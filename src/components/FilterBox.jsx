import "./FilterBox.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowDownShortWide,
  faArrowUpShortWide,
} from "@fortawesome/free-solid-svg-icons";
import {useContext, useState, useEffect} from "react";
import {TasksContext} from "../contexts/RootContext";
import axios from "axios";

export default function FilterBox() {
  const {tasks, setTasks, setShownTasks} = useContext(TasksContext);
  const [currentFilter, setCurrentFilter] = useState("all");

  const [isSorted, setIsSorted] = useState("byDate");
  const [sortType, setSortType] = useState("ascending");

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

  useEffect(() => {
    function sortTasks(filter) {
      const taskState = {
        completed: 1,
        active: 0,
      };
      switch (isSorted) {
        case "byDate":
          sortType == "ascending"
            ? setShownTasks([...filter])
            : setShownTasks([...filter].reverse());
          break;
        case "byName":
          sortType == "ascending"
            ? setShownTasks(
                [...filter].sort((a, b) => a.name.localeCompare(b.name)),
              )
            : setShownTasks(
                [...filter].sort((a, b) => b.name.localeCompare(a.name)),
              );
          break;

        default:
          sortType == "ascending"
            ? setShownTasks(
                [...filter].sort(
                  (a, b) => taskState[a.state] - taskState[b.state],
                ),
              )
            : setShownTasks(
                [...filter].sort(
                  (a, b) => taskState[b.state] - taskState[a.state],
                ),
              );
          break;
      }
    }
    if (currentFilter === "all") {
      sortTasks(tasks);
      return;
    }
    if (currentFilter === "active") {
      sortTasks(tasks.filter((task) => task.state == "active"));

      return;
    }

    sortTasks(tasks.filter((task) => task.state == "completed"));
  }, [tasks, currentFilter, setShownTasks, isSorted, sortType]);

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
        <select onChange={(e) => setIsSorted(e.target.value)}>
          <option value="byDate">Sort by date</option>
          <option value="byName">Sort by name</option>
          <option value="byStatus">Sort by status</option>
        </select>
        <button
          className={`sort-btn ${sortType}`}
          onClick={() =>
            sortType == "ascending"
              ? setSortType("descending")
              : setSortType("ascending")
          }
        >
          {sortType == "ascending" ? (
            <FontAwesomeIcon icon={faArrowDownShortWide} />
          ) : (
            <FontAwesomeIcon icon={faArrowUpShortWide} />
          )}
        </button>
      </ul>

      <button className="clear-completed" onClick={clearCompletedTasks}>
        <FontAwesomeIcon icon={faTrash} />
        Clear Completed
      </button>
    </div>
  );
}
