import "./tasks_list.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Task({id, name, state}) {
  const [isCompleted, setIsCompleted] = useState(
    state == "active" ? false : true,
  );

  function handleChecked(e) {
    console.log("is completed : ", isCompleted);
    e.target.checked ? setIsCompleted(true) : setIsCompleted(false);
  }

  // useEffect(() => {
  //   async function completeTask() {
  //     if (isCompleted) {
  //       axios.patch(`http://localhost:3000/tasks/${id}`, {
  //         state: "completed",
  //       });
  //     } else {
  //       axios.patch(`http://localhost:3000/tasks/${id}`, {
  //         state: "active",
  //       });
  //     }
  //   }
  //   completeTask();
  // }, [isCompleted, id]);

  useEffect(() => {
    console.log(`http://localhost:3000/tasks/${id}`);
  });

  return (
    <div className="single-task">
      <input
        className="task-checkbox"
        type="checkbox"
        onChange={handleChecked}
      />
      <p
        style={{
          textDecoration: `${state == "completed" ? "line-through" : ""}`,
        }}
      >
        {name}
      </p>
      <button className="delete-single-task">
        <FontAwesomeIcon icon={faBan} />
      </button>
    </div>
  );
}
