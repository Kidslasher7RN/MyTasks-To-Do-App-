import Task from "./Task";
import {useContext, useEffect} from "react";
import {TasksContext} from "../../../contexts/TasksContext";
import {getTasks} from "../../../services/taskAPI.service";

export default function CheckList() {
  const {shownTasks, setTasks} = useContext(TasksContext);
  useEffect(() => {
    getTasks((data) => setTasks(data));
  }, [setTasks]);

  return (
    <div className="mx-auto mt-8 flex h-fit w-[92%] max-w-3xl flex-col justify-center max-sm:mt-5">
      {shownTasks.map((task) => (
        <Task id={task.id} name={task.name} state={task.state} key={task.id} />
      ))}
    </div>
  );
}
