import {supabase} from "../supabaseClient";
import {Navigate} from "react-router-dom";

export async function register(email, password, setLoginError) {
  const {_, error} = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    setLoginError(error);
    throw error;
  }
}

export async function login(email, password, navigate, setLoginError) {
  const {_, error} = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    setLoginError(error.message);
    throw new Error("Login Error : " + error);
  }

  navigate();
}
