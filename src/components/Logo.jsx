import "./Logo.css";
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
    <header>
      <div className="logo">
        <span>
          <FontAwesomeIcon icon={faListCheck} style={{color: "#4F46E5"}} /> My
          Tasks
        </span>
        Stay focused and organized
      </div>
      <h3 className="day">
        {days[date.getDay()]}, {month[date.getMonth()]} {date.getDate()}
      </h3>
    </header>
  );
}
