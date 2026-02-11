import Logo from "../fragments/Logo";
// import ProgressBar from "../fragments/ProgressBar";
import ProgressBar from "../fragments/ProgressBar";
import NewTask from "../fragments/NewTask";
import FilterBox from "../fragments/FilterBox";
import CheckList from "../fragments/tasks_list/CheckList";
import Stats from "../fragments/Stats";
import axios from "axios";
import {TasksContext} from "../../contexts/RootContext";
import {useState, useEffect} from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [shownTasks, setShownTasks] = useState([]);

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
  return (
    <div className="min-h-screen bg-slate-50 text-slate-400">
      <Logo />

      <TasksContext.Provider
        value={{tasks, setTasks, shownTasks, setShownTasks}}
      >
        <ProgressBar />
        <NewTask />
        <FilterBox />
        <CheckList />
        <Stats />
      </TasksContext.Provider>
    </div>
  );
}
