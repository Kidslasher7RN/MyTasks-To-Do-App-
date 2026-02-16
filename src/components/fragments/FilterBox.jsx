import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowDownShortWide,
  faArrowUpShortWide,
} from "@fortawesome/free-solid-svg-icons";
import {useContext, useState, useEffect} from "react";
import {TasksContext} from "../../contexts/TasksContext";
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
    <div className="mx-auto mt-8 flex w-[92%] max-w-3xl items-center justify-between gap-4 max-sm:mt-[1.2rem] max-sm:flex-col max-sm:items-stretch">
      <ul className="flex list-none items-center justify-center gap-4 rounded-[10px] bg-slate-200 p-[0.3rem] max-sm:w-full max-sm:flex-wrap max-sm:justify-start max-sm:gap-[0.45rem]">
        <li
          className={`cursor-pointer whitespace-nowrap rounded-[10px] px-[0.65rem] py-[0.45rem] text-slate-500 transition-transform hover:-translate-y-px max-sm:flex-[1_1_30%] max-sm:text-center ${currentFilter == "all" ? "bg-white text-indigo-600 shadow-[0px_0px_16px_-10px_rgba(66,68,90,0.55)]" : ""}`}
          onClick={() => setCurrentFilter("all")}
        >
          All
        </li>
        <li
          className={`cursor-pointer whitespace-nowrap rounded-[10px] px-[0.65rem] py-[0.45rem] text-slate-500 transition-transform hover:-translate-y-px max-sm:flex-[1_1_30%] max-sm:text-center ${currentFilter == "active" ? "bg-white text-indigo-600 shadow-[0px_0px_16px_-10px_rgba(66,68,90,0.55)]" : ""}`}
          onClick={() => setCurrentFilter("active")}
        >
          Active
        </li>
        <li
          className={`cursor-pointer whitespace-nowrap rounded-[10px] px-[0.65rem] py-[0.45rem] text-slate-500 transition-transform hover:-translate-y-px max-sm:flex-[1_1_30%] max-sm:text-center ${currentFilter == "completed" ? "bg-white text-indigo-600 shadow-[0px_0px_16px_-10px_rgba(66,68,90,0.55)]" : ""}`}
          onClick={() => setCurrentFilter("completed")}
        >
          Completed
        </li>
        <select
          className="cursor-pointer rounded-lg border border-slate-300 bg-white px-[0.6rem] py-[0.48rem] text-[0.9rem] leading-[1.1] text-slate-600 outline-none focus:border-indigo-500 focus:ring-[3px] focus:ring-indigo-500/30 max-sm:flex-[1_1_60%]"
          onChange={(e) => setIsSorted(e.target.value)}
        >
          <option value="byDate">Sort by date</option>
          <option value="byName">Sort by name</option>
          <option value="byStatus">Sort by status</option>
        </select>
        <button
          className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] border border-slate-300 bg-white transition-all duration-100 ease-in-out hover:border-indigo-300 hover:text-indigo-600 max-sm:flex-[0_0_auto] ${sortType == "ascending" ? "text-indigo-600" : "text-slate-900"}`}
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

      <button
        className="inline-flex cursor-pointer items-center gap-[0.45rem] whitespace-nowrap border-none bg-transparent text-slate-500 transition-colors hover:text-red-500 max-sm:self-end"
        onClick={clearCompletedTasks}
      >
        <FontAwesomeIcon icon={faTrash} />
        Clear Completed
      </button>
    </div>
  );
}
