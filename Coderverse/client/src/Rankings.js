import logo from "./logo.svg";
import "./Rankings.css";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Learn() {
  let [filteredWeekly, setFilteredWeekly] = useState(true);
  const [switchStyle, setSwitchStyle] = useState({ marginLeft: "0rem" });
  const [switchTextStyle, setSwitchTextStyle] = useState({ color: "#9a5fa2" });
  const [switchTextText, setSwitchTextText] = useState("Weekly");
  const [rankingTextStyle, setRankingTextStyle] = useState({ opacity: 1 });

  const [weeklyData, setWeeklyData] = useLocalStorage("weekly_data", []);
  const [allTimeData, setAllTimeData] = useLocalStorage("all_time_data", []);

  useEffect(() => {
    fetch("/get_weekly_ranks").then((response) =>
      response.json().then((data) => {
        setWeeklyData([...data]);
        setCurrentData([...weeklyData]);
      })
    );
    fetch("/get_all_time_ranks").then((response) =>
      response.json().then((data) => {
        setAllTimeData([...data]);
        setCurrentData([...weeklyData]);
      })
    );
  }, []);

  const [currentData, setCurrentData] = useState([...weeklyData]);

  const switchSwitch = async () => {
    setRankingTextStyle({ opacity: 0 });
    if (switchStyle["marginLeft"] == "0rem") {
      filteredWeekly = false;
      setSwitchStyle({ marginLeft: "12rem" });
      await delay(150);
      setCurrentData([...allTimeData]);
    } else {
      filteredWeekly = true;
      setSwitchStyle({ marginLeft: "0rem" });
      await delay(150);
      setCurrentData([...weeklyData]);
    }
    setSwitchTextStyle({ color: "#9a5fa2" });
    if (filteredWeekly) {
      setSwitchTextText("Weekly");
    } else {
      setSwitchTextText("All Time");
    }
    setRankingTextStyle({ opacity: 1 });
    setSwitchTextStyle({ color: "#9a5fa2" });
  };

  const getLevel = (points) => {
    let total_points = points;
    let level = 1;
    while (total_points > 0) {
      total_points -= 500 * level;
      level++;
    }
    return level - 1;
  };

  return (
    <>
      <div className="background">
        <div className="app-page">
          <div id="rankings-header">
            <img
              src="help.png"
              id="rankings-help"
              alt=""
              style={{ opacity: 0 }}
            />
            <div id="rankings-header-text-container">
              <div>
                <h2 className="lower-rankings-text" style={rankingTextStyle}>
                  {currentData[1]["name"]}
                </h2>
                <h2 className="rankings-text-score" style={rankingTextStyle}>
                  {currentData[1]["points"]}
                </h2>
              </div>
              <div>
                <h2 style={rankingTextStyle}>{currentData[0]["name"]}</h2>
                <h2 className="rankings-text-score" style={rankingTextStyle}>
                  {currentData[0]["points"]}
                </h2>
              </div>
              <div>
                <h2 className="lower-rankings-text" style={rankingTextStyle}>
                  {currentData[2]["name"]}
                </h2>
                <h2 className="rankings-text-score" style={rankingTextStyle}>
                  {currentData[2]["points"]}
                </h2>
              </div>
            </div>
            <div className="switch">
              <div
                onClick={() => {
                  switchSwitch();
                }}
              >
                <h2>Weekly</h2>
              </div>
              <div
                onClick={() => {
                  switchSwitch();
                }}
              >
                <h2>All Time</h2>
              </div>
              <div style={switchStyle} className="active-slider">
                <h2 style={switchTextStyle}>{switchTextText}</h2>
              </div>
            </div>
          </div>
          <div id="ranking-page-spacer"></div>
          <div className="ranking-list">
            {currentData.slice(3, 10).map((element) => {
              let { name, level, points, url, total } = element;
              let margin = 0;
              if (currentData.indexOf(element) + 1 == 4) {
                margin = "1.5rem";
              }
              return (
                <div
                  className="ranking-container"
                  style={{ marginTop: margin }}
                >
                  <h1
                    className="ranking-container-rank"
                    // style={rankingTextStyle}
                  >
                    {currentData.indexOf(element) + 1}
                  </h1>
                  <img
                    className="ranking-container-profile-logo ranking-container-box-logo"
                    src={url}
                    style={rankingTextStyle}
                  ></img>
                  <div
                    className="ranking-container-text"
                    style={rankingTextStyle}
                  >
                    <h2>{name}</h2>
                    <h2 className="ranking-container-text-score">
                      Level {getLevel(total)}
                    </h2>
                  </div>
                  <h1
                    className="ranking-container-score"
                    style={rankingTextStyle}
                  >
                    {points}
                  </h1>
                </div>
              );
            })}
          </div>
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
                  src="rankings-active-alternate.png"
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
