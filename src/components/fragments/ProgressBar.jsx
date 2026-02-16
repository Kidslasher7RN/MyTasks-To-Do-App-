import {TasksContext} from "../../contexts/TasksContext";
import {useContext} from "react";
export default function ProgressBar() {
  const {tasks} = useContext(TasksContext);
  const completedTask = tasks.filter((task) => task.state == "completed");
  let percentages = (completedTask.length / tasks.length) * 100;
  const progressWidth = Number.isFinite(percentages) ? percentages : 0;

  return (
    <div className="mx-auto mt-6 flex h-fit w-[92%] max-w-3xl flex-col justify-center gap-4 rounded-[10px] bg-white p-4 shadow-[0px_0px_16px_-10px_rgba(66,68,90,0.55)] max-sm:p-[0.85rem]">
      <div className="flex w-full items-center justify-between gap-3">
        <p className="flex-1">Daily Progress</p>{" "}
        <span>
          {tasks.length != 0
            ? Number.isInteger(percentages)
              ? `${percentages} %`
              : `${percentages.toFixed(2)} %`
            : "no task"}
        </span>
      </div>
      <div className="relative h-3 w-full rounded-[10px] bg-slate-100">
        <div
          className="h-full rounded-[10px] bg-indigo-600"
          style={{width: `${progressWidth}%`}}
        />
      </div>
    </div>
  );
}
