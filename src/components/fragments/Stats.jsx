import {useContext} from "react";
import {TasksContext} from "../../contexts/TasksContext";
export default function Stats() {
  const {tasks} = useContext(TasksContext);
  return (
    <footer className="mt-3 text-center text-[0.9rem] text-slate-600">
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
