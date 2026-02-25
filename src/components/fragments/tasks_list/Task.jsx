import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {TasksContext} from "../../../contexts/TasksContext";
import {useContext, useState} from "react";
import {completeTask} from "../../../services/taskAPI.service";
import {deleteTask} from "../../../services/taskAPI.service";

export default function Task({id, name, state}) {
  const {tasks, setTasks} = useContext(TasksContext);
  const [check, setCheck] = useState(state);
  console.log(id);

  // async function completeTask(e) {
  //   const checked = e.target.checked;
  //   const nextState = checked ? "completed" : "active";
  //   const prev = tasks;

  //   setTasks(
  //     prev.map((task) => (task.id == id ? {...task, state: nextState} : task)),
  //   );

  //   try {
  //     await axios.patch(`http://localhost:3000/tasks/${id}`, {
  //       state: nextState,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     setTasks(prev);
  //   }
  // }

  // async function deleteTask() {

  // }

  return (
    <div className="mx-auto mt-4 flex h-fit w-full items-center justify-start gap-3 rounded-[10px] bg-white p-[0.9rem] text-[#191a1b] shadow-[0px_0px_16px_-10px_rgba(66,68,90,0.55)] max-sm:mt-[0.8rem] max-sm:gap-[0.6rem] max-sm:p-[0.8rem]">
      <input
        className="h-[1.4rem] w-[1.4rem] cursor-pointer rounded-full border-2 border-slate-400 accent-indigo-600"
        type="checkbox"
        checked={check}
        onChange={() =>
          completeTask(id, check, (data) => setCheck(data.is_completed))
        }
      />
      <p
        className={`min-w-0 flex-1 [overflow-wrap:anywhere] ${check ? "line-through" : ""}`}
      >
        {name}
      </p>
      <button
        className="ml-auto cursor-pointer border-none bg-transparent text-base text-slate-500 transition-colors hover:text-red-500"
        onClick={() => deleteTask(id, tasks, setTasks)}
      >
        <FontAwesomeIcon icon={faBan} />
      </button>
    </div>
  );
}
