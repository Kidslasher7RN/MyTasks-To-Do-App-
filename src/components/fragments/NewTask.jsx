import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {useContext, useRef} from "react";
import {TasksContext} from "../../contexts/TasksContext";
import {supabase} from "../../supabaseClient";
import {AuthInfo} from "../../contexts/AuthContext";

export default function NewTask() {
  const {authSession} = useContext(AuthInfo);
  const {setTasks} = useContext(TasksContext);

  const inputRef = useRef(null);

  async function handlePost(newTask) {
    const {data, error} = await supabase
      .from("todos")
      .insert(newTask)
      .select()
      .single();

    if (error) throw error;
    setTasks((prev) => [...prev, data]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newTask = {
      title: inputRef.current.value,
      is_completed: false,
      user_id: authSession.user.id,
    };
    if (!newTask) return;
    handlePost(newTask);
    inputRef.current.value = "";
  }

  return (
    <form
      className="relative mx-auto mt-6 w-[92%] max-w-3xl"
      onSubmit={handleSubmit}
    >
      <input
        className="h-fit w-full rounded-[10px] border-none bg-white px-4 py-[1.1rem] pr-[4.25rem] text-base shadow-[0px_0px_16px_-10px_rgba(66,68,90,0.55)] outline-none transition duration-100 placeholder:text-slate-400 focus:ring-[3px] focus:ring-indigo-500/55 max-sm:px-[0.9rem] max-sm:py-4 max-sm:pr-[3.8rem] max-sm:text-[0.95rem]"
        placeholder="Add a new task..."
        type="text"
        ref={inputRef}
      />
      <button
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[10px] border-none bg-indigo-600 text-white shadow-[0_6px_14px_rgba(79,70,229,0.25)] transition-colors hover:bg-indigo-600/50 max-sm:right-[10px] max-sm:h-[34px] max-sm:w-[34px]"
        type="submit"
        onClick={handleSubmit}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
}
