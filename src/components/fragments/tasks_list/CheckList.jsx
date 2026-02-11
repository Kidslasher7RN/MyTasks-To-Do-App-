import Task from "./Task";
import {useContext} from "react";
import {TasksContext} from "../../../contexts/RootContext";

export default function CheckList() {
  const {shownTasks} = useContext(TasksContext);

  return (
    <div className="mx-auto mt-8 flex h-fit w-[92%] max-w-3xl flex-col justify-center max-sm:mt-5">
      {shownTasks.map((task) => (
        <Task id={task.id} name={task.name} state={task.state} key={task.id} />
      ))}
    </div>
  );
}
