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

export async function completeTask(id, state, callback) {
  const {data, error} = await supabase
    .from("todos")
    .update({is_completed: !state})
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  callback(data);
}
