import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListCheck} from "@fortawesome/free-solid-svg-icons";
import {AuthInfo} from "../../contexts/AuthContext";
import {useContext} from "react";
import {supabase} from "../../supabaseClient";
import {useNavigate} from "react-router-dom";

// import {useEffect, useState} from "react";
export default function Logo() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();

  const {authSession} = useContext(AuthInfo);

  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <header className="mx-auto w-[92%] max-w-3xl pb-1 pt-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-4 gap-y-1 max-sm:items-start max-sm:gap-y-2">
        <span className="text-[clamp(1.45rem,4vw,2rem)] font-bold text-slate-900 max-sm:col-start-1 max-sm:row-start-1">
          <FontAwesomeIcon
            icon={faListCheck}
            className="mr-2 text-indigo-600"
          />
          My Tasks
        </span>
        <p className="justify-self-end text-slate-500 max-sm:col-span-2 max-sm:row-start-2 max-sm:justify-self-start">
          {authSession?.user.email || "Guest"}
        </p>
        <h3 className="text-[clamp(0.9rem,2.7vw,1.05rem)] text-slate-600 max-sm:col-span-2 max-sm:row-start-3">
          {days[date.getDay()]}, {month[date.getMonth()]} {date.getDate()}
        </h3>
        <button
          onClick={handleLogout}
          className="justify-self-end rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 active:translate-y-0 max-sm:col-start-2 max-sm:row-start-1 max-sm:self-start max-sm:justify-self-end"
        >
          Log Out
        </button>
      </div>
    </header>
  );
}
