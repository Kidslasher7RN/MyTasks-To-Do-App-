import "./tasks_list.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan} from "@fortawesome/free-solid-svg-icons";
export default function Task({id, name, state}) {
  return (
    <div className="single-task">
      <input className="task-checkbox" type="checkbox" />
      <p>{name}</p>
      <button className="delete-single-task">
        <FontAwesomeIcon icon={faBan} />
      </button>
    </div>
  );
}
