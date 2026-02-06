import "./tasks_list.css";
import Task from "./Task";
import {useContext} from "react";
import {FilterContext} from "../../contexts/RootContext";

export default function CheckList() {
  const {shownTasks, _} = useContext(FilterContext);

  return (
    <div className="check-list">
      <p>filter : </p>
      {shownTasks.map((task) => (
        <Task id={task.id} name={task.name} state={task.state} key={task.id} />
      ))}
    </div>
  );
}
