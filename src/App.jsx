import Logo from "./components/Logo";
import ProgressBar from "./components/ProgressBar";
import NewTask from "./components/NewTask";
import FilterBox from "./components/FilterBox";
import CheckList from "./components/tasks_list/CheckList";
import Stats from "./components/Stats";
import axios from "axios";
import {TasksContext} from "./contexts/RootContext";
import {useState, useEffect} from "react";

function App() {
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

export default App;
