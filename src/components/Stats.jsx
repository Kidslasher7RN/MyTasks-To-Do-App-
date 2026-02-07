import {useContext} from "react";
import {TasksContext} from "../contexts/RootContext";
export default function Stats() {
  const {tasks} = useContext(TasksContext);
  return (
    <footer
      style={{textAlign: "center", marginTop: "2rem", fontSize: "0.9rem"}}
    >
      {tasks.length == 0 ? (
        <p>no task is due</p>
      ) : (
        <p>
          {tasks.filter((task) => task.state == "completed").length} completed |{" "}
          {tasks.length} total
        </p>
      )}
    </footer>
  );
}
