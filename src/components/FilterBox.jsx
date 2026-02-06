import "./FilterBox.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useContext, useState, useEffect} from "react";
import {FilterContext} from "../contexts/RootContext";
import axios from "axios";

export default function FilterBox() {
  const [tasks, setTasks] = useState([]);
  const {_, setShownTasks} = useContext(FilterContext);
  const [currentFilter, setCurrentFilter] = useState("active");

  useEffect(() => {
    async function getTasks(url) {
      axios
        .get(url)
        .then((res) => {
          setTasks(res.data);
        })
        .catch((err) => console.error("Fetch Error : ", err));
    }
    getTasks("http://localhost:3000/tasks");
  }, []);

  console.log(tasks);
  return (
    <div className="filter-box-container">
      <ul className="content-filter">
        <li
          className={`filter ${currentFilter == "all" ? "active" : ""}`}
          onClick={() => {
            setCurrentFilter("all");
            setShownTasks(tasks);
          }}
        >
          All
        </li>
        <li
          className={`filter ${currentFilter == "active" ? "active" : ""}`}
          onClick={() => {
            setCurrentFilter("active");
            setShownTasks(tasks.filter((task) => task.state == "active"));
          }}
        >
          Active
        </li>
        <li
          className={`filter ${currentFilter == "completed" ? "active" : ""}`}
          onClick={() => {
            setCurrentFilter("completed");
            setShownTasks(tasks.filter((task) => task.state == "completed"));
          }}
        >
          Completed
        </li>
      </ul>

      <button className="clear-completed">
        <FontAwesomeIcon icon={faTrash} />
        Clear Completed
      </button>
    </div>
  );
}
