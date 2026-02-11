import axios from "axios";

export async function getTasks(callback) {
  try {
    const res = await axios.get("http://localhost:3000/tasks");
    callback(res.data);
  } catch (error) {
    console.error(error);
  }
}
