import {useRef, useState} from "react";
import {login, register, resetPassword} from "../../services/auth.service";
import {Link, useNavigate} from "react-router-dom";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Popup from "./Popup";

export default function AuthForm({authType}) {
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const navigate = useNavigate();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  function handleRegister(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    register(email, password, setAuthError, setRegisterMessage);
  }

  function handleLogin(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    login(
      email,
      password,
      () => {
        return navigate("/");
      },
      setAuthError,
    );
  }

  function handleResetPassword() {
    console.log("reset pass");
    const email = emailInputRef.current.value;
    resetPassword(email);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      {authType == "register" ? (
        <Popup message={registerMessage}></Popup>
      ) : null}

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
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              ref={emailInputRef}
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

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
        {authError && (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-600">
            {authError}
          </p>
        )}
        <button
          onClick={(e) =>
            authType === "login" ? handleLogin(e) : handleRegister(e)
          }
          type="submit"
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {authType === "login" ? "Login" : "Register"}
        </button>
        {authType === "login" ? (
          <div className="mt-4 flex w-full items-center justify-between text-sm">
            <p
              role="button"
              to="/reset-password"
              className="text-slate-600 transition hover:text-blue-600 cursor-pointer"
              onClick={handleResetPassword}
            >
              Forgot Password?
            </p>
            <Link
              to="/register"
              className="font-bold text-blue-600 transition hover:text-blue-700"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <p className="mt-4 text-center">
            Already have account?{" "}
            <Link to="/login" className="font-bold text-blue-600">
              Log In
            </Link>
          </p>
        )}
      </form>
    </main>
  );
}
