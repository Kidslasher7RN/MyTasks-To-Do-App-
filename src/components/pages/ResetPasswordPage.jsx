import {useRef, useState} from "react";

import {useNavigate} from "react-router-dom";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {supabase} from "../../supabaseClient";

export default function ResetPasswordPage({authType}) {
  const [resetError, setResetError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const passwordInputRef = useRef(null);

  async function updatePassword(e) {
    e.preventDefault();
    const newPassword = passwordInputRef.current.value;
    const {error} = await supabase.auth.updateUser({password: newPassword});
    if (error) {
      setResetError(error.message);
      return;
    }
    await supabase.auth.signOut();
    navigate("/login");
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/80">
        <h1 className="text-2xl  text-blue-600 font-bold">
          {authType === "login"
            ? "Login"
            : authType == "register"
              ? "Register"
              : "Reset Password"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {authType === "login"
            ? " Enter your email and password to continue."
            : authType === "register"
              ? " Enter your email and password to create account."
              : "confirm your email then we'll send you reset email"}
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                ref={passwordInputRef}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                autoComplete={
                  authType === "login" ? "current-password" : "new-password"
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 transition hover:text-slate-700"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
        </div>
        {resetError && (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-600">
            {resetError}
          </p>
        )}
        <button
          onClick={(e) => updatePassword(e)}
          type="submit"
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Reset Password
        </button>
      </form>
    </main>
  );
}
