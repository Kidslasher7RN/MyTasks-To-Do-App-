import {supabase} from "../supabaseClient";

export async function getTasks(userId, callback) {
  const {data, error} = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {ascending: false});

  if (error) throw error;
  callback(data);
}

export async function completeTask(id, tasks, setTasks) {
  const prev = tasks;

  setTasks((current) =>
    current.map((task) =>
      task.id === id ? {...task, is_completed: !task.is_completed} : task,
    ),
  );

  const nextState = !prev.find((task) => task.id === id)?.is_completed;

  const {data, error} = await supabase
    .from("todos")
    .update({is_completed: nextState})
    .eq("id", id)
    .select()
    .single();

  if (error) {
    setTasks(prev);
    throw error;
  }

  setTasks((current) => current.map((task) => (task.id === id ? data : task)));
}

export async function deleteTask(id, tasks, setTasks) {
  const prev = tasks;
  setTasks((prev) => prev.filter((task) => task.id !== id));

  const {error} = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    setTasks(prev);
    throw error;
  }
}

export async function clearCompletedTasks(tasks, setTasks) {
  const prev = tasks;
  console.log(prev);
  setTasks((prev) => prev.filter((task) => task.is_completed === false));
  const deletedTasks = prev.filter((task) => task.is_completed === true);

  deletedTasks.forEach(async (task) => {
    const {error} = await supabase.from("todos").delete().eq("id", task.id);
    if (error) {
      setTasks(prev);
      throw error;
    }
  });
}
