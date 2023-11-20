import "../App.css";
import React from "react";
import { useState, useEffect } from "react";
import Head from "../Head";
import { Nav4 } from "../Nav";
import collegeList from "../collegeList";

export default function Account() {
  return (
    <section id="app">
      <div id="container">
        <Head />
        <SignIn />
        <Nav4 />
      </div>
    </section>
  );
}

const SignIn = () => {
  const [inputs, setInputs] = useState({});
  let [userList, setUserList] = useLocalStorage("userList", []);
  let [currentUser, setCurrentUser] = useLocalStorage("userInfo", {
    username: "",
    name: "",
    address: "",
    id: -1,
    sat: "",
    act: "",
    gpa: "",
    major: "",
    size: "",
    region: "",
    setting: "",
    type: "",
    exact: [...collegeList],
    close: [],
    colleges: [],
  });
  let [login, setLogin] = useLocalStorage("login", false);
  const [info, setInfo] = useState({
    name: "",
    address: "",
    sat: "",
    act: "",
    gpa: "",
  });
  let [message, setMessage] = useState("");
  let [popup, setPopup] = useLocalStorage("popup2", true);
  const handleChange = (event) => {
    setMessage("");
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  let [majorChange, setMajor] = useState(false);
  let [sizeChange, setSize] = useState(false);
  let [settingChange, setSetting] = useState(false);
  let [regionChange, setRegion] = useState(false);
  let [typeChange, setType] = useState(false);
  let [accountAmount, setAmount] = useLocalStorage("amount", userList.length);

  const showPopup = () => {
    if (popup) {
      return (
        <div className="boxDiv white">
          <p className="boxedParagraph">
            When creating an account, ensure that your username has six or more
            characters and does not include spaces. Similarly, ensure that your
            password has eight or more characters and does not include spaces.{" "}
            <br></br>
          </p>
          <div className="listButtonDiv">
            <button
              className="listButton redRemove"
              onClick={() => {
                popup = false;
                setPopup(false);
              }}
            >
              <h3>Close message</h3>
            </button>
          </div>
        </div>
      );
    }
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    let already = false;
    userList.map(({ username }) => {
      if (inputs.username == username) {
        already = true;
      }
    });
    if (!already) {
      if (inputs.password.length >= 8) {
        if (inputs.username.length >= 6) {
          if (!/.*\s.*/.test(inputs.password)) {
            if (!/.*\s.*/.test(inputs.username)) {
              inputs.id = accountAmount;
              inputs.name = inputs.username;
              inputs.address = "";
              inputs.sat = "";
              inputs.act = "";
              inputs.gpa = "";
              inputs.major = "";
              inputs.size = "";
              inputs.region = "";
              inputs.setting = "";
              inputs.type = "";
              inputs.colleges = [];
              inputs.exact = [...collegeList];
              inputs.close = [];
              inputs.tempSize = "";
              inputs.tempSetting = "";
              inputs.tempRegion = "";
              inputs.tempType = "";
              setAmount((accountAmount) => {
                accountAmount + 1;
              });
              userList.push(inputs);
              setUserList(userList);
              setInputs({});
              handleSignIn(event);
              setInputs({});
            } else {
              setMessage("Make sure your username does not have a space in it");
            }
          } else {
            setMessage("Make your password does not have a space in it");
          }
        } else {
          setMessage("Make your username 6 or more letters");
        }
      } else {
        setMessage("Make your password 8 or more letters");
      }
    } else {
      setMessage("Username already taken");
    }
  };

  let tempExact = [];
  let tempClose = [];

  const handleSignIn = (event) => {
    event.preventDefault();
    let signedIn = false;
    userList.map(
      ({
        username,
        name,
        password,
        id,
        address,
        sat,
        act,
        gpa,
        type,
        major,
        size,
        close,
        region,
        colleges,
        setting,
        exact,
      }) => {
        if (inputs.username == username && inputs.password == password) {
          signedIn = true;
          currentUser.username = username;
          currentUser.name = name;
          currentUser.id = id;
          currentUser.address = address;
          currentUser.sat = sat;
          currentUser.act = act;
          currentUser.gpa = gpa;
          currentUser.major = major;
          currentUser.size = size;
          currentUser.region = region;
          currentUser.type = type;
          currentUser.setting = setting;
          currentUser.colleges = [...colleges];
          currentUser.exact = [...exact];
          currentUser.close = [...close];
          currentUser.tempSize = "";
          currentUser.tempSetting = "";
          currentUser.tempRegion = "";
          currentUser.tempType = "";
          setCurrentUser({ ...currentUser });
          setLogin(true);
        }
      }
    );
    if (!signedIn) {
      alert("Invalid username or password");
    }
  };

  const loggedIn = () => {
    if (login) {
      const handleChange2 = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInfo((values) => ({ ...values, [name]: value }));
      };
      const dropChange1 = (event) => {
        userList[currentUser.id].tempMajor = event.target.value;
        setUserList([...userList]);
        majorChange = true;
        setMajor(true);
      };
      const dropChange2 = (event) => {
        userList[currentUser.id].tempSize = event.target.value;
        setUserList([...userList]);
        sizeChange = true;
        setSize(true);
      };
      const dropChange3 = (event) => {
        userList[currentUser.id].tempSetting = event.target.value;
        setUserList([...userList]);
        settingChange = true;
        setSetting(true);
      };
      const dropChange4 = (event) => {
        userList[currentUser.id].tempRegion = event.target.value;
        setUserList([...userList]);
        regionChange = true;
        setRegion(true);
      };
      const dropChange5 = (event) => {
        userList[currentUser.id].tempType = event.target.value;
        setUserList([...userList]);
        typeChange = true;
        setType(true);
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        if (info.name != "") {
          currentUser.name = info.name;
          userList[currentUser.id].name = info.name;
          setUserList([...userList]);
        }
        if (info.address != "") {
          currentUser.address = info.address;
          userList[currentUser.id].address = info.address;
          setUserList([...userList]);
        }
        if (info.sat != "") {
          currentUser.sat = info.sat;
          userList[currentUser.id].sat = info.sat;
          setUserList([...userList]);
        }
        if (info.act != "") {
          console.log(info);
          currentUser.act = info.act;
          userList[currentUser.id].act = info.act;
          setUserList([...userList]);
        }
        if (info.gpa != "") {
          currentUser.gpa = info.gpa;
          userList[currentUser.id].gpa = info.gpa;
          setUserList([...userList]);
        }
        if (userList[currentUser.id].tempMajor != "" && majorChange == true) {
          userList[currentUser.id].major = userList[currentUser.id].tempMajor;
          currentUser.major = userList[currentUser.id].tempMajor;
          setUserList([...userList]);
        }
        if (userList[currentUser.id].tempSize != "" && sizeChange == true) {
          userList[currentUser.id].size = userList[currentUser.id].tempSize;
          currentUser.size = userList[currentUser.id].tempSize;
          setUserList([...userList]);
        }
        if (
          userList[currentUser.id].tempSetting != "" &&
          settingChange == true
        ) {
          userList[currentUser.id].setting =
            userList[currentUser.id].tempSetting;
          currentUser.setting = userList[currentUser.id].tempSetting;
          setUserList([...userList]);
        }
        if (userList[currentUser.id].tempRegion != "" && regionChange == true) {
          userList[currentUser.id].region = userList[currentUser.id].tempRegion;
          currentUser.region = userList[currentUser.id].tempRegion;
          setUserList([...userList]);
        }
        if (userList[currentUser.id].tempType != "" && typeChange == true) {
          userList[currentUser.id].type = userList[currentUser.id].tempType;
          currentUser.type = userList[currentUser.id].tempType;
          setUserList([...userList]);
        }
        tempExact = [];
        tempClose = [];
        for (let i = 0; i < collegeList.length; i++) {
          if (
            userList[currentUser.id].region == "" ||
            userList[currentUser.id].region == collegeList[i].region
          ) {
            if (
              userList[currentUser.id].type == "" ||
              userList[currentUser.id].type == collegeList[i].type
            ) {
              if (
                userList[currentUser.id].setting == "" ||
                userList[currentUser.id].setting == collegeList[i].setting
              ) {
                if (
                  userList[currentUser.id].size == "" ||
                  userList[currentUser.id]["size"] == collegeList[i]["sizeStr"]
                ) {
                  if (
                    (userList[currentUser.id].gpa == undefined &&
                      userList[currentUser.id].sat == undefined &&
                      userList[currentUser.id].act == undefined) ||
                    (userList[currentUser.id].gpa == "" &&
                      userList[currentUser.id].sat == "" &&
                      userList[currentUser.id].act == "") ||
                    Math.abs(
                      userList[currentUser.id].gpa - collegeList[i].sat
                    ) < 0.75 ||
                    Math.abs(
                      userList[currentUser.id].sat - collegeList[i].sat
                    ) < 200 ||
                    Math.abs(
                      userList[currentUser.id].act - collegeList[i].act
                    ) < 6
                  ) {
                    tempExact.push(collegeList[i]);
                  }
                }
              }
            }
          }
        }
        for (let i = 0; i < collegeList.length; i++) {
          let count = 0;
          let region = false;
          if (
            userList[currentUser.id].region == "" ||
            userList[currentUser.id].region == collegeList[i].region
          ) {
            region = true;
          }
          if (
            userList[currentUser.id].type == "" ||
            userList[currentUser.id].type == collegeList[i].type
          ) {
            count++;
          }
          if (
            userList[currentUser.id].setting == "" ||
            userList[currentUser.id].setting == collegeList[i].setting
          ) {
            count++;
          }
          if (
            userList[currentUser.id].region == "" ||
            userList[currentUser.id].region == collegeList[i].region
          ) {
            count++;
          }
          if (
            userList[currentUser.id].size == "" ||
            userList[currentUser.id]["size"] == collegeList[i]["sizeStr"]
          ) {
            count++;
          }
          if (region == true && count > 2) {
            let exact = false;
            for (let k = 0; k < tempExact.length; k++) {
              if (tempExact[k]["name"] == collegeList[i]["name"]) {
                exact = true;
              }
            }
            if (exact == false) {
              tempClose.push(collegeList[i]);
            }
          }
        }
        userList[currentUser.id].exact = [...tempExact];
        userList[currentUser.id].close = [...tempClose];
        currentUser.exact = [...tempExact];
        currentUser.close = [...tempClose];
        setUserList([...userList]);
        setCurrentUser({ ...currentUser });
        majorChange = false;
        setMajor(false);
        sizeChange = false;
        setSize(false);
        settingChange = false;
        setSetting(false);
        regionChange = false;
        setRegion(false);
        typeChange = false;
        setType(false);
      };
      return (
        <>
          <h3 style={{ marginTop: "20px", marginLeft: "25px" }}>
            Hello, {currentUser.username}
          </h3>
          <p className="boxedParagraph">
            This is your profile page. You can add and change personal
            information in the form below, and such will be updated when you hit
            the blue button
          </p>
          <div className="formDiv">
            <h3
              style={{
                marginTop: "20px",
                marginLeft: "20px",
                marginBottom: "20px",
              }}
            >
              Profile Info
            </h3>
            <div className="linebreak"></div>
            <p style={{ marginTop: "20px", marginLeft: "20px" }}>
              Display Name: {currentUser.name}
            </p>
            <form onSubmit={handleSubmit}>
              <label>
                <div className="enterDiv" style={{ marginBottom: "30px" }}>
                  <p className="enterLabel">Update:</p>
                  <input
                    className="textInput"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={info.name || ""}
                    onChange={handleChange2}
                  />
                </div>
                <div className="linebreak"></div>
              </label>
              <p style={{ marginTop: "20px", marginLeft: "20px" }}>
                Home Address: {currentUser.address}
              </p>
              <label>
                <div className="enterDiv" style={{ marginBottom: "30px" }}>
                  <p className="enterLabel">Update:</p>
                  <input
                    className="textInput"
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={info.address || ""}
                    onChange={handleChange2}
                  />
                </div>
                <div className="linebreak"></div>
              </label>
              <p style={{ marginTop: "20px", marginLeft: "20px" }}>
                SAT Score: {currentUser.sat}
              </p>
              <label>
                <div className="enterDiv" style={{ marginBottom: "30px" }}>
                  <p className="enterLabel">Update:</p>
                  <input
                    className="textInput"
                    type="text"
                    placeholder="Enter score between 400 and 1600"
                    name="sat"
                    value={info.sat || ""}
                    onChange={handleChange2}
                  />
                </div>
                <div className="linebreak"></div>
              </label>
              <p style={{ marginTop: "20px", marginLeft: "20px" }}>
                ACT Score: {currentUser.act}
              </p>
              <label>
                <div className="enterDiv" style={{ marginBottom: "30px" }}>
                  <p className="enterLabel">Update:</p>
                  <input
                    className="textInput"
                    type="text"
                    placeholder="Enter score between 0 and 36"
                    name="act"
                    value={info.act || ""}
                    onChange={handleChange2}
                  />
                </div>
                <div className="linebreak"></div>
              </label>
              <p style={{ marginTop: "20px", marginLeft: "20px" }}>
                Unweighted GPA: {currentUser.gpa}
              </p>
              <label>
                <div className="enterDiv" style={{ marginBottom: "30px" }}>
                  <p className="enterLabel">Update:</p>
                  <input
                    className="textInput"
                    type="text"
                    placeholder="Enter score between 0 and 4.0"
                    name="gpa"
                    value={info.gpa || ""}
                    onChange={handleChange2}
                  />
                </div>
                <div className="linebreak"></div>
              </label>
              <p style={{ marginTop: "20px", marginLeft: "20px" }}>
                Field of Study: {currentUser.major}
              </p>
              <label>
                <div className="enterDiv" style={{ marginBottom: "30px" }}>
                  <select
                    className="profileDropdown"
                    value={currentUser.tempmajor}
                    onChange={dropChange1}
                  >
                    <option value="">Update</option>
                    <option value="Business">Business</option>
                    <option value="Computer Science">Communications</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Education">Education</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Fine Arts">Fine Arts</option>
                    <option value="Law">Law</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Public Affairs">Public Affairs</option>
                    <option value="Science">Science</option>
                    <option value="Social Science">Social Science</option>
                    <option value="Undecided">Undecided</option>
                  </select>
                </div>
                <div className="linebreak"></div>
              </label>
              <p style={{ marginTop: "20px", marginLeft: "20px" }}>
                Preferred School Size: {currentUser.size}
              </p>
              <label>
                <div className="enterDiv" style={{ marginBottom: "30px" }}>
                  <select
                    className="profileDropdown"
                    value={currentUser.tempsize}
                    onChange={dropChange2}
                  >
                    <option value="">Update</option>
                    <option value="Small">Small (Fewer than 7,500)</option>
                    <option value="Medium">Medium (7,500 - 20,000)</option>
                    <option value="Large">Large (20,000+)</option>
                  </select>
                </div>
                <div className="linebreak"></div>
              </label>
              <p style={{ marginTop: "20px", marginLeft: "20px" }}>
                Preferred School Setting: {currentUser.setting}
              </p>
              <label>
                <div className="enterDiv" style={{ marginBottom: "30px" }}>
                  <select
                    className="profileDropdown"
                    value={currentUser.tempsetting}
                    onChange={dropChange3}
                  >
                    <option value="">Update</option>
                    <option value="Urban">Urban</option>
                    <option value="Suburban">Suburban</option>
                  </select>
                </div>
                <div className="linebreak"></div>
              </label>
              <p style={{ marginTop: "20px", marginLeft: "20px" }}>
                Preferred School Region: {currentUser.region}
              </p>
              <label>
                <div className="enterDiv" style={{ marginBottom: "30px" }}>
                  <select
                    className="profileDropdown"
                    value={currentUser.tempregion}
                    onChange={dropChange4}
                  >
                    <option value="">Update</option>
                    <option value="Northeast">Northeast</option>
                    <option value="South">South</option>
                    <option value="Midwest">Midwest</option>
                    <option value="West">West</option>
                  </select>
                </div>
                <div className="linebreak"></div>
              </label>
              <p style={{ marginTop: "20px", marginLeft: "20px" }}>
                Preferred School Type: {currentUser.type}
              </p>
              <label>
                <div className="enterDiv" style={{ marginBottom: "30px" }}>
                  <select
                    className="profileDropdown"
                    value={currentUser.temptype}
                    onChange={dropChange5}
                  >
                    <option value="">Update</option>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
                <div className="linebreak"></div>
              </label>
              <input
                className="submitButton"
                type="submit"
                value="Save Changes"
              />
            </form>
          </div>
          <button
            className="redButton"
            onClick={() => {
              setCurrentUser({ username: "", name: "", address: "" });
              login = false;
              setLogin(false);
            }}
          >
            Log Out
          </button>
        </>
      );
    }
    if (!login) {
      return (
        <>
          <h3 style={{ marginTop: "20px", marginLeft: "25px" }}>
            Account Sign Up / Login
          </h3>
          {showPopup()}
          <div className="formDiv">
            <form onSubmit={handleSignIn}>
              <label>
                <div className="enterDiv">
                  <p className="enterLabel">Username:</p>
                  <input
                    type="text"
                    className="textInput"
                    placeholder="Username"
                    name="username"
                    value={inputs.username || ""}
                    onChange={handleChange}
                  />
                </div>
              </label>
              <label>
                <div className="enterDiv">
                  <p className="enterLabel">Password:</p>
                  <input
                    type="password"
                    className="textInput"
                    placeholder="Password"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                  />
                </div>
                <p className="boxedParagraph" style={{ color: "red" }}>
                  {message}
                </p>
              </label>
              <input className="submitButton" type="submit" value="Sign In" />
            </form>
            <form onSubmit={handleSignUp}>
              <input className="submitButton" type="submit" value="Sign Up" />
            </form>
          </div>
        </>
      );
    }
  };

  return <>{loggedIn()}</>;
};

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
