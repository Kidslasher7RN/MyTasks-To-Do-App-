import Logo from "../fragments/Logo";
// import ProgressBar from "../fragments/ProgressBar";
import ProgressBar from "../fragments/ProgressBar";
import NewTask from "../fragments/NewTask";
import FilterBox from "../fragments/FilterBox";
import CheckList from "../fragments/tasks_list/CheckList";
import Stats from "../fragments/Stats";

import TasksContextProvider from "../../contexts/TasksContext";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-400">
      <Logo />
      <TasksContextProvider>
        <ProgressBar />
        <NewTask />
        <FilterBox />
        <CheckList />
        <Stats />
      </TasksContextProvider>
    </div>
  );
}
