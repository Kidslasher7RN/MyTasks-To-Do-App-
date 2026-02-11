import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListCheck} from "@fortawesome/free-solid-svg-icons";

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

  return (
    <header className="mx-auto flex w-[92%] max-w-3xl items-start justify-between gap-4 pb-1 pt-4 max-sm:flex-col max-sm:gap-[0.45rem]">
      <div className="flex flex-col items-start justify-center gap-1 text-slate-500">
        <span className="text-[clamp(1.45rem,4vw,2rem)] font-bold text-slate-900">
          <FontAwesomeIcon icon={faListCheck} className="mr-2 text-indigo-600" />
          My Tasks
        </span>
        <p>Stay focused and organized (this will be rebrandedd to "keepMyIdea")</p>
      </div>
      <h3 className="text-[clamp(0.9rem,2.7vw,1.05rem)] text-right text-slate-600 max-sm:text-left">
        {days[date.getDay()]}, {month[date.getMonth()]} {date.getDate()}
      </h3>
    </header>
  );
}
