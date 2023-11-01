import logo from "./logo.svg";
import "./Profile.css";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const monthDict = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Learn() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [user, setUser] = useLocalStorage("user", []);

  const add_digit = (str) => {
    if (str.length == 1) {
      return "0" + str;
    }
    return str;
  };

  let date = new Date(year, month, 1);
  let activity = user[8];
  const generateDates = () => {
    const firstDay = new Date(year, month, 1);
    const dayOfWeek = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = dayOfWeek + daysInMonth;
    const data = [];
    let keys = Object.keys(activity);
    for (let i = 0; i < Math.ceil(days / 7) * 7; i++) {
      if (i < dayOfWeek) {
        data.push("");
      } else if (i - dayOfWeek < daysInMonth) {
        if (
          keys.includes(
            year.toString() +
              "-" +
              add_digit((month + 1).toString()) +
              "-" +
              (i - dayOfWeek + 1).toString()
          )
        ) {
          let points =
            activity[
              year.toString() +
                "-" +
                add_digit((month + 1).toString()) +
                "-" +
                (i - dayOfWeek + 1).toString()
            ];
          if (points >= 3000) {
            data.push("C" + (i - dayOfWeek + 1).toString());
          } else if (points >= 2000) {
            data.push("B" + (i - dayOfWeek + 1).toString());
          } else if (points >= 1000) {
            data.push("A" + (i - dayOfWeek + 1).toString());
          } else {
            data.push((i - dayOfWeek + 1).toString());
          }
        } else {
          data.push((i - dayOfWeek + 1).toString());
        }
      } else {
        data.push("");
      }
    }
    return (
      <>
        {data.map((day) => {
          if (day[0] == "A") {
            return (
              <div className="calendar-box">
                <div className="calendar-circle low-points">
                  <p>{day.substring(1, day.length)}</p>
                </div>
              </div>
            );
          } else if (day[0] == "B") {
            return (
              <div className="calendar-box">
                <div className="calendar-circle med-points">
                  <p>{day.substring(1, day.length)}</p>
                </div>
              </div>
            );
          } else if (day[0] == "C") {
            return (
              <div className="calendar-box">
                <div className="calendar-circle high-points">
                  <p>{day.substring(1, day.length)}</p>
                </div>
              </div>
            );
          }
          return (
            <div className="calendar-box">
              <div className="calendar-circle">
                <p>{day}</p>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const prevMonth = () => {
    if (month != 0) {
      setMonth(month - 1);
    } else {
      setMonth(11);
      setYear(year - 1);
    }
  };

  const nextMonth = () => {
    if (month != 11) {
      setMonth(month + 1);
    } else {
      setMonth(0);
      setYear(year + 1);
    }
  };

  const getRightArrow = () => {
    if (month != new Date().getMonth() || year != new Date().getFullYear()) {
      return (
        <h2
          id="calendar-head-right"
          onClick={() => {
            nextMonth();
          }}
        >
          ▶
        </h2>
      );
    } else {
      return (
        <h2 id="calendar-head-right" className="inactive">
          ▶
        </h2>
      );
    }
  };

  const getLevel = () => {
    let total_points = user[13];
    let level = 1;
    while (total_points > 0) {
      total_points -= 500 * level;
      if (total_points >= 0) {
        level++;
      }
    }
    return level;
  };

  const getLevelStart = (level) => {
    let count = 0;
    for (let i = 0; i < level; i++) {
      count += 500 * i;
    }
    return count;
  };

  const getBar = () => {
    let low = user[13] - getLevelStart(getLevel(user[13]));
    let high =
      getLevelStart(getLevel(user[13]) + 1) - getLevelStart(getLevel(user[13]));
    let width = (low / high * 100).toString() + "%"
    console.log(width)
    return <div id="profile-progress-front" style={{ width: width }}></div>;
  };

  return (
    <>
      <div className="background">
        <div className="app-page-profile">
          <div id="profile-header">
            <div id="profile-points">
              <p>{user[13].toLocaleString("en-US")}</p>
            </div>
            <img id="profile-edit" src="edit-profile.png" alt="" />
          </div>
          <img id="profile-picture-main" src={user[6]}></img>
          <h2 id="profile-page-name">
            {user[1]} • {user[11]}{" "}
            <span>
              <img src="fire.png" style={{ height: "24px" }} alt="" />
            </span>
          </h2>
          <p id="profile-page-email">{user[2]}</p>
          <div className="profile-line" id="top-line"></div>
          <div id="profile-progress-back">{getBar()}</div>
          <div id="progress-bar-text">
            <p id="current-level-bar-text">{getLevel(user[13])}</p>
            <p id="next-level-bar-text">{getLevel(user[13]) + 1}</p>
          </div>
          <p id="profile-bar-progress">
            <b className="original-bold">Level {getLevel()}</b>
            &nbsp;&nbsp;•&nbsp;
            {"  "}
            {user[13] - getLevelStart(getLevel(user[13]))} /{" "}
            {getLevelStart(getLevel(user[13]) + 1) -
              getLevelStart(getLevel(user[13]))}{" "}
            MP{" "}
          </p>
          <div className="profile-line" id="middle-line"></div>
          <div id="calendar-head">
            <h2 id="calendar-head-month">
              {monthDict[month]} {year}
            </h2>
            <h2
              id="calendar-head-left"
              onClick={() => {
                prevMonth();
              }}
            >
              ◀
            </h2>
            {getRightArrow()}
          </div>
          <div id="calendar">
            <p className="calendar-box day-of-week">S</p>
            <p className="calendar-box day-of-week">M</p>
            <p className="calendar-box day-of-week">T</p>
            <p className="calendar-box day-of-week">W</p>
            <p className="calendar-box day-of-week">T</p>
            <p className="calendar-box day-of-week">F</p>
            <p className="calendar-box day-of-week">S</p>
            {generateDates()}
          </div>
          <div className="profile-line" id="top-line"></div>
          {/* <div className="stats-header">Stats</div>
          <div style={{marginLeft: "2rem", marginTop: "1rem", overflow: "visible"}}>
            <div className="stats-div">
              <div></div>
              <div></div>
            </div>
            <div className="stats-div" style={{marginTop: "1rem"}}>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="profile-line" id="top-line"></div> */}
          <div className="log-out">
            <h2>Log Out</h2>
          </div>
          <div className="bottom-space"></div>
          <div className="navbar">
            <div className="navbar-images">
              <Link to="/">
                <img src="learn-inactive.png" alt="" />
              </Link>
              <Link to="/assistant">
                <img src="assistant-inactive.png" alt="" />
              </Link>
              <Link to="/rankings">
                <img
                  src="rankings-inactive.png"
                  className="navbar-rankings"
                  alt=""
                />
              </Link>
              <Link to="/profile">
                <img src="profile-active.png" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Learn;

const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
