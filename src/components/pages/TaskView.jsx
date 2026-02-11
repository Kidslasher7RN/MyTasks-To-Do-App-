import {useParams} from "react-router-dom";

export default function TaskView() {
  const params = useParams();
  console.log(params);
  return <div>view task</div>;
}
