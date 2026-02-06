import "./tasks_list.css";
import Task from "./Task";
import {useContext} from "react";
import {TasksContext} from "../../contexts/RootContext";

export default function CheckList() {
  const {shownTasks, _} = useContext(TasksContext);

  return (
    <div className="check-list">
      {shownTasks.map((task) => (
        <Task id={task.id} name={task.name} state={task.state} key={task.id} />
      ))}
    </div>
  );
}
