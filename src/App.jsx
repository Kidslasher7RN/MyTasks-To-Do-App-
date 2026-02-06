import "./App.css";

import Logo from "./components/Logo";
import ProgressBar from "./components/ProgressBar";
import NewTask from "./components/NewTask";
import FilterBox from "./components/FilterBox";
import CheckList from "./components/tasks_list/CheckList";
import Stats from "./components/Stats";
//context
import {TasksContext} from "./contexts/RootContext";
import {useState} from "react";
function App() {
  const [tasks, setTasks] = useState([]);
  const [shownTasks, setShownTasks] = useState([]);
  return (
    <>
      <Logo />
      <ProgressBar />
      <TasksContext.Provider value={{tasks, setTasks, shownTasks, setShownTasks}}>
        <NewTask />
        <FilterBox />
        <CheckList />
      </TasksContext.Provider>

    
      <Stats />
    </>
  );
}

export default App;
