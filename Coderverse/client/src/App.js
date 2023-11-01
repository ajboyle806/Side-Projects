import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const salt = bcrypt.genSaltSync(10);

function App() {
  const navigate = useNavigate();

  const [signInFormStyle, setSignInFormStyle] = useState({ opacity: 1 });
  const [signUpFormStyle, setSignUpFormStyle] = useState({
    opacity: 0,
    display: "none",
  });
  const [signInHeadStyle, setSignInHeadStyle] = useState({ opacity: 1 });
  const [signUpHeadStyle, setSignUpHeadStyle] = useState({ opacity: 0.5 });

  const [user, setUser] = useLocalStorage("user", []);
  const [python, setPython] = useLocalStorage("python", []);
  const [webdev, setWebdev] = useLocalStorage("webdev", []);
  const [js, setJs] = useLocalStorage("js", []);
  const [weeklyData, setWeeklyData] = useLocalStorage("weekly_data", []);
  const [allTimeData, setAllTimeData] = useLocalStorage("all_time_data", []);

  const [userIn, setUserIn] = useState("");
  const [passwordIn, setPasswordIn] = useState("");
  const [nameUp, setNameUp] = useState("");
  const [emailUp, setEmailUp] = useState("");
  const [dateUp, setDateUp] = useState("");
  const [passwordUp, setPasswordUp] = useState("");

  // useEffect(() => {
  //   updateUserData();
  // }, []);

  // const updateUserData = async () => {
  //   fetch("/get_user").then((response) =>
  //     response.json().then((data) => {
  //       setUsers(data);
  //     })
  //   );
  // };

  const toSignUp = async () => {
    if (signInHeadStyle["opacity"] == 1) {
      setSignInFormStyle({ opacity: 0 });
      setSignInHeadStyle({ opacity: 0.5 });
      await delay(300);
      setSignInFormStyle({ opacity: 0, display: "none" });
      setSignUpFormStyle({ opacity: 0 });
      await delay(100);
      setSignUpHeadStyle({ opacity: 1 });
      setSignUpFormStyle({ opacity: 1 });
    }
  };

  const toSignIn = async () => {
    if (signInHeadStyle["opacity"] == 0.5) {
      setSignUpFormStyle({ opacity: 0 });
      setSignUpHeadStyle({ opacity: 0.5 });
      await delay(300);
      setSignUpFormStyle({ opacity: 0, display: "none" });
      setSignInFormStyle({ opacity: 0 });
      await delay(100);
      setSignInHeadStyle({ opacity: 1 });
      setSignInFormStyle({ opacity: 1 });
    }
  };

  const [signInText, setSignInText] = useState("");
  const [signUpText, setSignUpText] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (userIn == "") {
      setSignUpText("Must input email or password.");
    } else if (passwordIn == "") {
      setSignUpText("Must input email.");
    } else {
      let user = userIn;
      let password = passwordIn;
      let correct = false;
      await fetch("/account_exists_post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, password }),
      });
      await fetch("/account_exists_get").then((response) =>
        response.json().then((data) => {
          correct = data[0];
          user = data[1];
        })
      );
      if (correct) {
        setSignInText("");
        await fetch("/get_user_post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user }),
        });
        await fetch("/get_user").then((response) =>
          response.json().then((data) => {
            setUser([...data[0]]);
          })
        );
        await fetch("/get_python").then((response) =>
          response.json().then((data) => {
            console.log(data);
            setPython([...data[0]]);
          })
        );
        await fetch("/get_webdev").then((response) =>
          response.json().then((data) => {
            setWebdev([...data[0]]);
          })
        );
        await fetch("/get_js").then((response) =>
          response.json().then((data) => {
            setJs([...data[0]]);
          })
        );
        await fetch("/get_weekly_ranks").then((response) =>
          response.json().then((data) => {
            setWeeklyData([...data]);
          })
        );
        navigate("/");
      } else {
        setSignInText("Invalid email / username or password.");
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (nameUp == "") {
      setSignUpText("Must input username.");
    } else if (emailUp == "") {
      setSignUpText("Must input email.");
    } else if (dateUp == "") {
      setSignUpText("Must input birth date.");
    } else if (passwordUp == "") {
      setSignUpText("Must input password.");
    } else if (nameUp.length < 2) {
      setSignUpText("Username must be at least 2 characters.");
    } else if (!/^[A-Za-z0-9_.]*$/.test(nameUp)) {
      setSignUpText(
        "Usernames can only use letters, numbers, underscores, and periods."
      );
    } else if (nameUp[0] == "." || nameUp[nameUp.length - 1] == ".") {
      setSignUpText("Usernames cannot begin or end with periods.");
    } else if (nameUp.includes("..")) {
      setSignUpText("Usernames cannot have consecutive periods.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailUp)) {
      setSignUpText("Enter a valid email.");
    } else if (passwordUp.length < 8) {
      setSignUpText("Password must be at least 8 characters.");
    } else if (
      !/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,100}$/.test(passwordUp)
    ) {
      setSignUpText("Password must have a number and special character.");
    } else {
      let name = nameUp;
      let name_exists = false;
      await fetch("/check_name_post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      await fetch("/check_name_get").then((response) =>
        response.json().then((data) => {
          if (data.length != 0) {
            name_exists = true;
          }
        })
      );
      if (name_exists) {
        setSignUpText("Username already in use.");
      } else {
        let email = emailUp;
        let email_exists = false;
        await fetch("/check_email_post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        await fetch("/check_email_get").then((response) =>
          response.json().then((data) => {
            if (data.length != 0) {
              email_exists = true;
            }
          })
        );
        if (email_exists) {
          setSignUpText("Email already in use.");
        } else {
          setSignUpText("");
          let birth_date = dateUp;
          let password = bcrypt.hashSync(passwordUp, salt);
          await fetch("/add_user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              birth_date,
              password,
              salt,
            }),
          });
          await fetch("/get_user_post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user }),
          });
          await fetch("/get_user").then((response) =>
            response.json().then((data) => {
              setUser([...data[0]]);
            })
          );
          await fetch("/get_python").then((response) =>
            response.json().then((data) => {
              console.log(data);
              setPython([...data[0]]);
            })
          );
          await fetch("/get_webdev").then((response) =>
            response.json().then((data) => {
              setWebdev([...data[0]]);
            })
          );
          await fetch("/get_js").then((response) =>
            response.json().then((data) => {
              setJs([...data[0]]);
            })
          );
          await fetch("/get_weekly_ranks").then((response) =>
            response.json().then((data) => {
              setWeeklyData([...data]);
            })
          );
          await fetch("/get_all_time_ranks").then((response) =>
            response.json().then((data) => {
              setAllTimeData([...data]);
            })
          );
          navigate("/");
        }
      }
    }
  };

  return (
    <>
      <div className="background">
        <div className="app">
          <div className="sign-in-sign-out">
            <h1
              id="sign-in"
              onClick={() => {
                toSignIn();
              }}
              style={signInHeadStyle}
            >
              Sign In
            </h1>
            <h1
              id="sign-up"
              onClick={() => {
                toSignUp();
              }}
              style={signUpHeadStyle}
            >
              Sign Up
            </h1>
          </div>
          <form action="" style={signInFormStyle} onSubmit={handleSignIn}>
            <h2 className="log-in-field">Your email or username</h2>
            <input
              className="log-in-input"
              type="text"
              value={userIn}
              onChange={(e) => {
                setUserIn(e.target.value);
              }}
            />
            <h2 className="log-in-field">Your password</h2>
            <input
              className="log-in-input"
              type="password"
              value={passwordIn}
              onChange={(e) => {
                setPasswordIn(e.target.value);
              }}
            />
            <p className="notice-text">{signInText}</p>
            <input
              type="submit"
              className="log-in-button"
              value="Sign In"
            ></input>
          </form>
          <form action="" style={signUpFormStyle} onSubmit={handleSignUp}>
            <h2 className="log-in-field">Username</h2>
            <input
              className="log-in-input"
              type="text"
              value={nameUp}
              onChange={(e) => {
                if (e.target.value.length <= 15) {
                  setNameUp(e.target.value);
                }
              }}
            />
            <h2 className="log-in-field">Your email</h2>
            <input
              className="log-in-input"
              type="text"
              value={emailUp}
              onChange={(e) => {
                setEmailUp(e.target.value);
              }}
            />
            <h2 className="log-in-field">Your birth date</h2>
            <input
              className="log-in-input"
              type="date"
              value={dateUp}
              onChange={(e) => {
                setDateUp(e.target.value);
              }}
            />
            <h2 className="log-in-field">Your password</h2>
            <input
              className="log-in-input"
              type="password"
              value={passwordUp}
              onChange={(e) => {
                if (passwordUp.length <= 100) {
                  setPasswordUp(e.target.value);
                }
              }}
            />
            <p className="notice-text">{signUpText}</p>
            <input
              type="submit"
              className="log-in-button"
              value="Sign Up"
            ></input>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;

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
