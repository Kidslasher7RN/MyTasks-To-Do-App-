import "./NewTask.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {useContext, useRef} from "react";
import {TasksContext} from "../contexts/RootContext";

export default function NewTask() {
  const {setTasks} = useContext(TasksContext);

  const inputRef = useRef(null);

  async function handlePost(taskName) {
    const newPost = {state: "active", name: taskName};

    axios
      .post("http://localhost:3000/tasks", newPost)
      .then((res) => {
        setTasks((prev) => [...prev, res.data]);
      })
      .catch((err) => console.error(err));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const taskName = inputRef.current.value;
    if (!taskName) return;
    handlePost(taskName);
    inputRef.current.value = "";
  }

  return (
    <form className="new-task-container" onSubmit={handleSubmit}>
      <input
        className="task-input"
        placeholder="Add a new task..."
        type="text"
        ref={inputRef}
      />
      <button className="plus-btn" type="submit" onClick={handleSubmit}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
}
