import "./App.css";
import "swiper/css";
import "swiper/css/pagination";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Link } from "react-router-dom";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Account() {

  const [alertText, setAlertText] = useState("");
  const [alertStyle, setAlertStyle] = useState({
    display: "hidden",
    color: "red",
  });
  const [alertText2, setAlertText2] = useState("");
  const [alertStyle2, setAlertStyle2] = useState({
    display: "hidden",
    color: "red",
  });

  const [signedIn, setSignedIn] = useLocalStorage("loggedIn", -1);

  const [userInfo, setUserInfo] = useLocalStorage("userInfo", []);

  const [signInInputs, setSignInInputs] = useLocalStorage("signInInputs", {});

  const handleTypeChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const newObj = { ...signInInputs, [name]: value };
    setSignInInputs(newObj);
    setAlertText("")
    setAlertText2("")
    setAlertStyle({display: "hidden", color: "red"})
    setAlertStyle2({display: "hidden", color: "red"})
  };

  const [signInStyles, setSignInStyles] = useLocalStorage("signInStyles", {});
  const [formOpacity, setFormOpacity] = useLocalStorage("formOpacity", {
    opacity: 1,
  });

  const [logType, setLogType] = useLocalStorage("signinorup", "Sign In");

  const signOut = () => {
    setSignedIn(-1);
    setLogType("Sign In");
    setSignInStyles({ height: "19.5rem", marginTop: "21.5rem" });
    setFormOpacity({ opacity: 1 });
  };

  const switchType = async (event) => {
    if (logType == "Sign In") {
      setSignInStyles({ height: "39.5rem", marginTop: "11.5rem" });
      setFormOpacity({ opacity: 0 });
      await delay(300);
      setLogType("Sign Up");
      setFormOpacity({ opacity: 1 });
    } else {
      setFormOpacity({ opacity: 0 });
      await delay(300);
      setSignInStyles({ height: "19.5rem", marginTop: "21.5rem" });
      setLogType("Sign In");
      setFormOpacity({ opacity: 1 });
    }
  };

  const logIn = async (event) => {
    setFormOpacity({ opacity: 0 });
    await delay(300);
    setSignInStyles({
      height: "auto",
      marginTop: "5rem",
      marginBottom: "6rem",
    });
  };

  const addUser = async (event) => {
    event.preventDefault();
    let emails = [];
    userInfo.forEach((element) => {
      emails.unshift(element.email);
    });
    if (signInInputs.email1 != signInInputs.email2) {
      setAlertText2("Ensure the inputted emails are the same.");
      setAlertStyle2({ display: "relative", color: "red" });
    } else if (signInInputs.password1 != signInInputs.password2) {
      setAlertText2("Ensure the inputted passwords are the same.");
      setAlertStyle2({ display: "relative", color: "red" });
    } else if (emails.includes(signInInputs.email1)) {
      setAlertText2("Account already exists for this email.");
      setAlertStyle2({ display: "relative", color: "red" });
    } else {
      let localUserList = [...userInfo];
      let localUserInfo = {
        name: signInInputs.name,
        age: signInInputs.age,
        email: signInInputs.email1,
        password: signInInputs.password1,
        id: userInfo.length,
        adopts: [],
        events: [],
      };
      localUserList.push(localUserInfo);
      setUserInfo(localUserList);
      setSignInInputs({});
      setSignedIn(userInfo.length);
      setFormOpacity({ opacity: 0 });
      setSignInStyles({
        height: "auto",
        marginTop: "5rem",
        marginBottom: "6rem",
      });
    }
  };

  const signIn = async (event) => {
    event.preventDefault();
    let id = -1;
    userInfo.forEach((element) => {
      if (
        element.email == signInInputs.email &&
        element.password == signInInputs.password
      ) {
        id = element.id;
      }
    });
    setSignedIn(id);
    if (id != -1) {
      setFormOpacity({ opacity: 0 });
      await delay(300);
      setSignInStyles({
        height: "auto",
        marginTop: "5rem",
        marginBottom: "6rem",
      });
      setSignInInputs({});
    } else {
      setAlertText("Email and password do not match");
      setAlertStyle({ display: "relative", color: "red" });
    }
  };

  const removeAdoptionInterest = (name) => {
    let localAdopts = [...userInfo[signedIn].adopts];
    if (name == localAdopts[0].name) {
      localAdopts.splice(0, 1);
    } else {
      localAdopts.splice(1, 1);
    }
    let localUser = [...userInfo];
    let localUserInfo = {
      name: userInfo[signedIn].name,
      age: userInfo[signedIn].age,
      email: userInfo[signedIn].email,
      password: userInfo[signedIn].password,
      id: userInfo[signedIn].id,
      adopts: localAdopts,
      events: userInfo[signedIn].events,
    };
    localUser[signedIn] = localUserInfo;
    setUserInfo(localUser);
  };

  const removeEventInterest = (name) => {
    let localEvents = [...userInfo[signedIn].events];
    let ind = 0;
    for (let i = 0; i < localEvents.length; i++) {
      if (localEvents[i].name == name) {
        ind = i;
      }
    }
    localEvents.splice(ind, 1);
    let localUser = [...userInfo];
    let localUserInfo = {
      name: userInfo[signedIn].name,
      age: userInfo[signedIn].age,
      email: userInfo[signedIn].email,
      password: userInfo[signedIn].password,
      id: userInfo[signedIn].id,
      adopts: userInfo[signedIn].adopts,
      events: localEvents,
    };
    localUser[signedIn] = localUserInfo;
    setUserInfo(localUser);
  };

  const adopts = () => {
    if (userInfo[signedIn].adopts.length > 0) {
      return (
        <>
          {userInfo[signedIn].adopts.map((element) => {
            return (
              <div className="adoptUserDiv" style={{ marginBottom: "1rem" }}>
                <img src={element.url} alt="" />
                <div>
                  <h2 className="apph22" style={{ marginTop: "0.5rem" }}>
                    {element.name}: {element.gender}
                  </h2>
                  <p className="appp2" style={{ marginTop: "-1rem" }}>
                    {element.size}, {element.breed}, {element.age}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "-0.5rem",
                      width: "19rem",
                    }}
                  >
                    <a href="mailto:smallpawsshelter@gmail.com">
                      <button
                        style={{ marginLeft: "1rem", marginRight: "0.5rem" }}
                        className="button interest interest3"
                      >
                        Make inquiry
                      </button>
                    </a>
                    <button
                      onClick={() => {
                        removeAdoptionInterest(element.name);
                      }}
                      className="button interest interest2 interest3"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    } else {
      return (
        <p
          style={{
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "-0.5rem",
          }}
        >
          You have not declared interest in adopting any of our pets, head to
          the adoption page if you do have some!
        </p>
      );
    }
  };

  const volunteers = () => {
    if (userInfo[signedIn].events.length == 0) {
      return (
        <p
          style={{
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "-0.5rem",
          }}
        >
          You have not yet signed up for any volunteering events. If you have an
          interest in doing so, find one on the help page! We would really
          appreciate it!
        </p>
      );
    } else {
      return (
        <>
          {userInfo[signedIn].events.map((event) => {
            return (
              <div className="volunteerDiv2">
                <div className="volInfoHolder">
                  <h2 className="apph22">{event.name}</h2>
                  <p
                    style={{
                      marginLeft: "20px",
                      marginRight: "20px",
                      marginTop: "-0.75rem",
                    }}
                  >
                    {event.time}
                  </p>
                </div>
                <div className="volButtonHolder">
                  <button
                    className="volButton"
                    onClick={() => {
                      removeEventInterest(event.name);
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </>
      );
    }
  };

  const [donations_all, setDonations] = useLocalStorage("donations", []);
  const [contributions_all, setContributions] = useLocalStorage(
    "contributions",
    []
  );

  const donations = () => {
    let user_donations = [];
    donations_all.forEach((donation) => {
      if (donation.id == signedIn) {
        user_donations.unshift(donation);
      }
    });
    let user_contributions = [];
    contributions_all.forEach((contribution) => {
      if (contribution.id == signedIn) {
        user_contributions.unshift(contribution);
      }
    });
    if (user_donations.length == 0 && user_contributions.length == 0) {
      return (
        <p
          style={{
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "-0.5rem",
          }}
        >
          You have not yet made any donations nor contributions. If you are
          interested, head to the help page to make one; we would really
          appreciate it!
        </p>
      );
    } else {
      return (
        <>
          {user_donations.map((event) => {
            return (
              <div className="volunteerDiv2" style={{ height: "6.5rem" }}>
                <div className="volInfoHolder">
                  <h2 className="apph22">
                    {event.month}/{event.day}/{event.year} | ${event.amount} |
                    Facility Renovation
                  </h2>
                  <p
                    style={{
                      marginLeft: "20px",
                      marginRight: "20px",
                      marginTop: "-0.75rem",
                    }}
                  >
                    Transaction successfully made, thank you for your $
                    {event.amount} contribution!
                  </p>
                </div>
              </div>
            );
          })}
          {user_contributions.map((event) => {
            return (
              <div className="volunteerDiv2" style={{ height: "6.5rem" }}>
                <div className="volInfoHolder">
                  <h2 className="apph22">
                    {event.date} | {event.supplies}
                  </h2>
                  <p
                    style={{
                      marginLeft: "20px",
                      marginRight: "20px",
                      marginTop: "-0.75rem",
                    }}
                  >
                    You are yet to turn in these supplies, though we thank you
                    nonetheless for committing to!
                  </p>
                </div>
              </div>
            );
          })}
        </>
      );
    }
  };

  const returnForm = () => {
    if (signedIn >= 0) {
      return (
        <>
          <h2 className="apph2 accounth2">Hello, {userInfo[signedIn].name}</h2>
          <div className="linebreak"></div>
          <h2 className="apph2 accounth22">Pending adoption interests:</h2>
          {adopts()}
          <div className="linebreak"></div>
          <h2 className="apph2 accounth22">Volunteering event sign ups:</h2>
          {volunteers()}
          <div className="linebreak"></div>
          <h2 className="apph2 accounth22">Donations and contributions:</h2>
          {donations()}
          <div className="linebreak"></div>
          <button
            className="button buttonRed"
            onClick={() => {
              signOut();
            }}
            style={{ marginLeft: "1rem" }}
          >
            Log Out
          </button>
        </>
      );
    } else if (logType == "Sign In") {
      return (
        <>
          <form style={formOpacity} onSubmit={signIn}>
            <label>
              <div className="enterDiv signInInner">
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "14px",
                    marginLeft: "20px",
                  }}
                >
                  Sign in with email
                </p>
                <input
                  type="email"
                  className="textInput"
                  placeholder="example@gmail.com"
                  name="email"
                  autocomplete="off"
                  value={signInInputs.email || ""}
                  onChange={handleTypeChange}
                />
              </div>
            </label>
            {/* <div className="linebreak"></div> */}
            <label>
              <div className="enterDiv signInInner">
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "14px",
                    marginLeft: "20px",
                  }}
                >
                  Password
                </p>
                <input
                  type="password"
                  className="textInput"
                  placeholder="********"
                  name="password"
                  value={signInInputs.password || ""}
                  onChange={handleTypeChange}
                />
              </div>
            </label>
            <p className="eventalert2" style={alertStyle}>
              {alertText}
            </p>
            <input
              className="button signInButton"
              type="submit"
              value="Sign in"
              style={{
                marginLeft: "20px",
                fontSize: "15px",
                marginRight: "20px",
                width: "calc(100% - 40px)",
              }}
            />
            <p
              style={{
                marginTop: "1rem",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              Don't have an account?{" "}
              <b
                onClick={() => {
                  switchType();
                }}
              >
                Sign up!
              </b>
            </p>
          </form>
        </>
      );
    } else {
      return (
        <>
          <form style={formOpacity} onSubmit={addUser}>
            <label>
              <div className="enterDiv signInInner">
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "14px",
                    marginLeft: "20px",
                  }}
                >
                  Enter your name
                </p>
                <input
                  type="text"
                  className="textInput"
                  placeholder="Your Name"
                  name="name"
                  autocomplete="off"
                  value={signInInputs.name || ""}
                  onChange={handleTypeChange}
                  required
                />
              </div>
            </label>
            <label>
              <div className="enterDiv signInInner">
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "14px",
                    marginLeft: "20px",
                  }}
                >
                  Enter your birth date
                </p>
                <input
                  type="text"
                  className="textInput"
                  placeholder="MM/DD/YYYY"
                  autocomplete="off"
                  name="age"
                  value={signInInputs.age || ""}
                  onChange={handleTypeChange}
                  required
                />
              </div>
            </label>
            <label>
              <div className="enterDiv signInInner">
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "14px",
                    marginLeft: "20px",
                  }}
                >
                  Enter your email
                </p>
                <input
                  type="email"
                  className="textInput"
                  placeholder="example@gmail.com"
                  autocomplete="off"
                  name="email1"
                  value={signInInputs.email1 || ""}
                  onChange={handleTypeChange}
                  required
                />
              </div>
            </label>
            <label>
              <div className="enterDiv signInInner">
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "14px",
                    marginLeft: "20px",
                  }}
                >
                  Confirm your email
                </p>
                <input
                  type="email"
                  className="textInput"
                  placeholder="example@gmail.com"
                  autocomplete="off"
                  name="email2"
                  value={signInInputs.email2 || ""}
                  onChange={handleTypeChange}
                  required
                />
              </div>
            </label>
            <label>
              <div className="enterDiv signInInner">
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "14px",
                    marginLeft: "20px",
                  }}
                >
                  Create a password
                </p>
                <input
                  type="password"
                  className="textInput"
                  placeholder="********"
                  name="password1"
                  value={signInInputs.password1 || ""}
                  onChange={handleTypeChange}
                  minLength="8"
                  required
                />
              </div>
            </label>
            <label>
              <div className="enterDiv signInInner">
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "14px",
                    marginLeft: "20px",
                  }}
                >
                  Confirm your password
                </p>
                <input
                  type="password"
                  className="textInput"
                  placeholder="********"
                  name="password2"
                  value={signInInputs.password2 || ""}
                  onChange={handleTypeChange}
                  minLength="8"
                  required
                />
              </div>
            </label>
            <p className="eventalert2" style={alertStyle2}>
              {alertText2}
            </p>
            <input
              className="button signInButton"
              type="submit"
              value="Sign Up"
              style={{
                marginLeft: "20px",
                fontSize: "15px",
                marginRight: "20px",
                width: "calc(100% - 40px)",
              }}
            />
            <p
              style={{
                marginTop: "1rem",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              Have an account?{" "}
              <b
                onClick={() => {
                  switchType();
                }}
              >
                Sign in!
              </b>
            </p>
          </form>
        </>
      );
    }
  };

  return (
    <div className="background">
      <div className="app">
        <div className="banner">
          <img src="accounthead.png" alt="" />
        </div>
        <div className="signInDiv" style={signInStyles}>
          {returnForm()}
        </div>

        <div className="nav">
          <div className="navImages">
            <Link to="/home">
              <img src="homegrey.png" alt="" />
            </Link>
            <Link to="/pets">
              <img src="petsgrey.png" alt="" />
            </Link>
            <Link to="/help">
              <img src="helpgrey.png" alt="" />
            </Link>
            <Link to="/account">
              <img src="account.png" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const SignIn = () => {
  const [inputs, setInputs] = useState({});
  let [userList, setUserList] = useLocalStorage("userList", []);
  let [currentUser, setCurrentUser] = useLocalStorage("userInfo", {
    username: "",
    name: "",
    address: "",
    id: 1,
  });
  let [loggedIn, setLoggedIn] = useLocalStorage("loggedIn", false);
  const [info, setInfo] = useState({ name: "", address: "" });
  let [message, setMessage] = useState("");
  let [popup, setPopup] = useLocalStorage("popup2", true);
  const handleChange = (event) => {
    setMessage("");
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
};

export default Account;

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
