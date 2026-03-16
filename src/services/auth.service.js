import {supabase} from "../supabaseClient";

export async function register(
  email,
  password,
  setLoginError,
  setRegisterMessage,
) {
  const {_, error} = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    setLoginError(error.message);
    throw error;
  }

  setRegisterMessage(
    "If this email is not registered, please check your inbox to confirm your account.",
  );
}

export async function login(email, password, navigate, setLoginError) {
  const {error} = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    setLoginError(error.message);
    throw new Error("Login Error : " + error);
  }

  navigate();
}

export async function resetPassword(email) {
  console.log(`${window.location.origin}/update-password`);
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
}
