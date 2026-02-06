import "./NewTask.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
export default function NewTask() {
  return (
    <form className="new-task-container">
      <input
        className="task-input"
        placeholder="Add a new task..."
        type="text"
      />
      <button className="plus-btn">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
}
