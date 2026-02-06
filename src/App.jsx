import "./App.css";

import Logo from "./components/Logo";
import ProgressBar from "./components/ProgressBar";
import NewTask from "./components/NewTask";
import FilterBox from "./components/FilterBox";
import CheckList from "./components/tasks_list/CheckList";
import Stats from "./components/Stats";
//context
import {FilterContext} from "./contexts/RootContext";
import {useState} from "react";
function App() {
  const [shownTasks, setShownTasks] = useState([]);
  return (
    <>
      <Logo />
      <ProgressBar />
      <FilterContext.Provider value={{shownTasks, setShownTasks}}>
        <NewTask />
        <FilterBox />
        {shownTasks && <CheckList />}
      </FilterContext.Provider>

      <Stats />
    </>
  );
}

export default App;
