import {TasksContext} from "../contexts/RootContext";
import "./ProgressBar.css";
import {useContext} from "react";
export default function ProgressBar() {
  const {tasks} = useContext(TasksContext);
  const completedTask = tasks.filter((task) => task.state == "completed");
  let percentages = (completedTask.length / tasks.length) * 100;
  console.log(Number.isInteger(percentages));

  return (
    <div className="container">
      <div className="info">
        <p>Daily Progress</p>{" "}
        <span>
          {tasks.length != 0
            ? Number.isInteger(percentages)
              ? percentages
              : percentages.toFixed(2)
            : "no task"}
          %
        </span>
      </div>
      <div className="prog-bar" style={{"--percentages": `${percentages}%`}} />
    </div>
  );
}
