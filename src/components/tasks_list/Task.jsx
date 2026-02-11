import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {TasksContext} from "../../contexts/RootContext";
import {useContext} from "react";

export default function Task({id, name, state}) {
  const {tasks, setTasks} = useContext(TasksContext);

  async function completeTask(e) {
    const checked = e.target.checked;
    const nextState = checked ? "completed" : "active";
    const prev = tasks;

    setTasks(
      prev.map((task) => (task.id == id ? {...task, state: nextState} : task)),
    );

    try {
      await axios.patch(`http://localhost:3000/tasks/${id}`, {
        state: nextState,
      });
    } catch (err) {
      console.error(err);
      setTasks(prev);
    }
  }

  async function deleteTask() {
    const prev = tasks;
    setTasks((prev) => prev.filter((task) => task.id !== id));
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
    } catch (err) {
      console.error(err);
      setTasks(prev);
    }
  }

  return (
    <div className="mx-auto mt-4 flex h-fit w-full items-center justify-start gap-3 rounded-[10px] bg-white p-[0.9rem] text-[#191a1b] shadow-[0px_0px_16px_-10px_rgba(66,68,90,0.55)] max-sm:mt-[0.8rem] max-sm:gap-[0.6rem] max-sm:p-[0.8rem]">
      <input
        className="h-[1.4rem] w-[1.4rem] cursor-pointer rounded-full border-2 border-slate-400 accent-indigo-600"
        type="checkbox"
        checked={state == "completed"}
        onChange={completeTask}
      />
      <p
        className={`min-w-0 flex-1 [overflow-wrap:anywhere] ${state == "completed" ? "line-through" : ""}`}
      >
        {name}
      </p>
      <button
        className="ml-auto cursor-pointer border-none bg-transparent text-base text-slate-500 transition-colors hover:text-red-500"
        onClick={deleteTask}
      >
        <FontAwesomeIcon icon={faBan} />
      </button>
    </div>
  );
}
