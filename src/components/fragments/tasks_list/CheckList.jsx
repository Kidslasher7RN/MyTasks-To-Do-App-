import Task from "./Task";
import {useContext, useEffect} from "react";
import {TasksContext} from "../../../contexts/TasksContext";
import {getTasks} from "../../../services/taskAPI.service";
import {AuthInfo} from "../../../contexts/AuthContext";

export default function CheckList() {
  const {authSession} = useContext(AuthInfo);
  const {shownTasks, setTasks} = useContext(TasksContext);

  useEffect(() => {
    getTasks(authSession.user.id, (data) => {
      setTasks(data);
      console.log(data);
    });
  }, [setTasks, authSession.user.id]);

  return (
    <div className="mx-auto mt-8 flex h-fit w-[92%] max-w-3xl flex-col justify-center max-sm:mt-5">
      {shownTasks.map((task) => (
        <Task
          id={task.id}
          name={task.title}
          state={task.is_completed}
          key={task.id}
        />
      ))}
    </div>
  );
}
