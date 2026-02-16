import {createContext, useState} from "react";

const Tasks = createContext();

function TasksContextProvider({children}) {
  const [tasks, setTasks] = useState([]);
  const [shownTasks, setShownTasks] = useState([]);

  return (
    <TasksContext.Provider value={{tasks, setTasks, shownTasks, setShownTasks}}>
      {children}
    </TasksContext.Provider>
  );
}

export const TasksContext = Tasks;
export default TasksContextProvider;
