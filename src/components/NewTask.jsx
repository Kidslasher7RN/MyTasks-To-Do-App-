import "./NewTask.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function NewTask() {
  async function handlePost(taskName) {
    const newPost = {state: "active", name: taskName};

    axios
      .post("http://localhost:3000/tasks", newPost)
      .then((res) => console.log("Created:", res.data))
      .catch((err) => console.error(err));
  }

  return (
    <form className="new-task-container">
      <input
        className="task-input"
        placeholder="Add a new task..."
        type="text"
        onKeyDown={(e) => e.key == "Enter" && handlePost(e.target.value)}
      />
      <button className="plus-btn">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
}
