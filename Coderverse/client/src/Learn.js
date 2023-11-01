import logo from "./logo.svg";
import "./Learn.css";
import React from "react";
import { useState, useEffect } from "react";
import ReactSearchBox from "react-search-box";
import { Link } from "react-router-dom";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Learn() {
  const [user, setUser] = useLocalStorage("user", []);
  const [python, setPython] = useLocalStorage("python", []);
  const [webdev, setWebdev] = useLocalStorage("webdev", []);
  const [js, setJs] = useLocalStorage("js", []);
  const [weeklyData, setWeeklyData] = useLocalStorage("weekly_data", []);
  const [allTimeData, setAllTimeData] = useLocalStorage("all_time_data", []);
  const [ranking, setRanking] = useLocalStorage("ranking", 0);

  useEffect(() => {
    fetch("/get_weekly_ranks").then((response) =>
      response.json().then((data) => {
        setWeeklyData([...data]);
      })
    );
    fetch("/get_all_time_ranks").then((response) =>
      response.json().then((data) => {
        setAllTimeData([...data]);
      })
    );
  }, []);

  const useCountdown = (num) => {
    let countDownDate = new Date();
    if (num == 2) {
      countDownDate.setHours(24);
      countDownDate.setMinutes(0);
      countDownDate.setSeconds(0);
    } else if (num == 1) {
      countDownDate.setDate(
        countDownDate.getDate() +
        6 - countDownDate.getDay()
      );
      countDownDate.setHours(24);
      countDownDate.setMinutes(0);
      countDownDate.setSeconds(0);
    }

    const [countDown, setCountDown] = useState(
      countDownDate - new Date().getTime()
    );

    useEffect(() => {
      const interval = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime());
      }, 1000);

      return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
  };

  const getReturnValues = (countDown) => {
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
  };

  let midnight = new Date();
  midnight.setHours(24);
  midnight.setMinutes(0);
  midnight.setSeconds(0);

  const [days, hours, minutes, seconds] = useCountdown(1);
  const [days2, hours2, minutes2, seconds2] = useCountdown(2);

  useEffect(() => {
    weeklyData.map((element) => {
      if (element["name"] == user[1]) {
        console.log(element["name"])
        setRanking(weeklyData.indexOf(element));
      }
    });
  }, []);

  const getWeeklyPoints = () => {
    let sum = 0;
    const today = new Date();
    if (user[7] != undefined) {
      Object.keys(user[7]).forEach((key) => {
        console.log(key);
        let date = new Date(key);
        if (
          (today.getTime() - date.getTime()) / (1000 * 3600 * 24) <=
          today.getDay()
        ) {
          sum += user[7][key];
        }
      });
    }
    return sum;
  };

  const getLevel = () => {
    let total_points = user[13];
    let level = 1;
    while (total_points > 0) {
      total_points -= 2500 + level * 500;
      level++;
    }
    return level + 3;
  };

  return (
    <>
      <div className="background">
        <div className="app-course-page">
          <div className="course-page-head">
            <h2>
              Welcome,<br></br>
              <b className="original-bold">{user[1]}</b>
            </h2>
            <img
              className="profile-logo"
              id="course-page-top-right-logo"
              src={user[6]}
            ></img>
          </div>
          <p id="course-page-timer">
            Weekly Rank ({days}d {hours}h {minutes}m left)
          </p>
          <div className="ranking-container-courses">
            <h1 className="ranking-container-rank">{ranking + 1}</h1>
            <img
              className="ranking-container-profile-logo ranking-container-box-logo"
              src={user[6]}
            ></img>
            <div className="ranking-container-text">
              <h2>{user[1]}</h2>
              <h2 className="ranking-container-text-score">
                Level {getLevel()}
              </h2>
            </div>
            <h1 className="ranking-container-score-courses">
              {weeklyData[ranking]["points"]}
            </h1>
          </div>
          <div id="course-page-toggle-div">
            <p id="course-page-progress">Your Courses</p>
            <p id="course-page-toggle">
              {Math.ceil(((python[1] + webdev[1] + js[1]) * 100) / 118600)}%
              Complete
            </p>
          </div>
          <div id="course-page-search">
            <ReactSearchBox
              iconBoxSize="45px"
              inputHeight="44px"
              placeholder="Search Course Catalog"
              data={[
                {
                  key: "Python for Kids",
                  value: "Python for Kids",
                },
                {
                  key: "Basics of Web Dev",
                  value: "Basics of Web Dev",
                },
                {
                  key: "Intro to Javascript",
                  value: "Intro to Javascript",
                },
              ]}
              inputFontSize="17px"
              leftIcon={<img src="search3.png"></img>}
            ></ReactSearchBox>
          </div>
          <Link to="/python">
            <img
              src="python.png"
              style={{ marginTop: "1.5rem" }}
              className="course-page-course"
              alt=""
            />
          </Link>
          <Link to="/webdev">
            <img src="web.png" className="course-page-course" alt="" />
          </Link>
          <Link to="/javascript">
            <img src="js.png" className="course-page-course" alt="" />
          </Link>
          <p id="course-page-challenge">
            Daily Challenge ({hours2}h {minutes2}m {seconds2}s left)
          </p>
          <Link to="/challenge">
            <div className="course-page-challenges">
              <img
                className="course-page-challenge-img"
                src={"challenge.png"}
              ></img>
              <h2 id="course-page-challenge-text">Let's Loop!</h2>
              <h2 id="course-page-challenge-points">+1000</h2>
            </div>
          </Link>
          {/* <div className="course-page-challenges">
            <img
              className="course-page-challenge-img"
              src="challenge.png"
            ></img>
            <h2 id="course-page-challenge-text">Challenge Name</h2>
            <h2 id="course-page-challenge-points">+300</h2>
          </div>
          <div className="course-page-challenges">
            <img
              className="course-page-challenge-img"
              src="challenge.png"
            ></img>
            <h2 id="course-page-challenge-text">Challenge Name</h2>
            <h2 id="course-page-challenge-points">+100</h2>
          </div> */}
          <div className="bottom-space"></div>
          <div className="navbar">
            <div className="navbar-images">
              <Link to="/">
                <img src="learn-active.png" alt="" />
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
                <img src="profile-inactive.png" alt="" />
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
