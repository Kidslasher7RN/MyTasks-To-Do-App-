import {useRef, useState} from "react";

//Services
import {login, register} from "../../services/auth.service";
import {useNavigate} from "react-router-dom";

export default function AuthForm({authType}) {
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  function handleRegister(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    register(email, password, setAuthError);
  }

  function handleLogin(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    login(email, password, () => navigate("/"), setAuthError);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/80">
        <h1 className="text-2xl  text-blue-600 font-bold">
          {authType === "login" ? "Login" : "Register"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {authType === "login"
            ? " Enter your email and password to continue."
            : " Enter your email and password to create account."}
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
            <input
              ref={passwordInputRef}
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
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
      </form>
    </main>
  );
}
