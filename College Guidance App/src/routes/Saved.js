import "../App.css";
import React from "react";
import { useState } from "react";
import Head from "../Head";
import { Nav3 } from "../Nav";
import collegeList from "../collegeList";

function Find() {
  return (
    <section id="app">
      <div id="container">
        <Head />
        <List />
        <Nav3 />
      </div>
    </section>
  );
}

function List() {
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
    exact: [],
    close: [],
    colleges: [],
  });

  let [login, setLogin] = useLocalStorage("login", false);

  let [userList, setUserList] = useLocalStorage("userList", []);
  const Link = (name) => {
    let glink = "https://maps.google.com/maps?q=";
    for (let i = 0; i < name.length; i++) {
      if (name[i] != " ") {
        glink += name[i];
      } else {
        glink += "%20";
      }
    }
    glink += "&t=&z=13&ie=UTF8&iwloc=&output=embed";
    return glink;
  };

  const typeSchool = (sat, act, gpa) => {
    let safety = false;
    let target = false;
    let reach = false;
    let gpaCheck = 0;
    if (currentUser["sat"] != "") {
      if (Math.abs(currentUser["sat"] - sat) < 150) {
        target = true;
      } else if (currentUser["sat"] - sat > 150) {
        if (sat < 1470) {
          safety = true;
        } else {
          target = true;
        }
      } else {
        reach = true;
      }
    }
    if (currentUser["act"] != "") {
      if (Math.abs(currentUser["act"] - act) < 4) {
        target = true;
      } else if (currentUser["act"] - act > 4) {
        if (act < 32) {
          safety = true;
        } else {
          target = true;
        }
      } else {
        reach = true;
      }
    }
    if (currentUser["gpa"] != "") {
      if (Math.abs(currentUser["gpa"] - gpa) < 0.1) {
        gpaCheck = 2;
      } else if (currentUser["gpa"] - gpa > 0.1) {
        gpaCheck = 3;
      } else {
        gpaCheck = 1;
      }
    }
    if (currentUser["gpa"] == "" && currentUser["sat"] == "" && currentUser["act"] == ""){
      return ""
    }
    if (currentUser["gpa"] == undefined && currentUser["sat"] == undefined && currentUser["act"] == undefined){
      return ""
    }
    if (gpa == -1) {
      if (safety == true) {
        return "(Safety)";
      }
      if (target == true) {
        return "(Target)";
      }
      return "(Reach)";
    }
    if (safety == true && gpa > 2) {
      return "(Safety)";
    }
    if (safety == true || target == true) {
      return "(Target)";
    }
    return "(Reach)";
  };

  const reorder = (list) => {
    if (
      currentUser["gpa"] == "" &&
      currentUser["sat"] == "" &&
      currentUser["act"] == ""
    ) {
      return [...list];
    }
    if (
      currentUser["gpa"] == undefined &&
      currentUser["sat"] == undefined &&
      currentUser["act"] == undefined
    ) {
      return [...list];
    }
    let safetyList = [];
    let targetList = [];
    let reachList = [];
    list.map((object) => {
      const { gpa, sat, act } = object;
      if (typeSchool(sat, act, gpa) == "(Reach)") {
        reachList.push(object);
      } else if (typeSchool(sat, act, gpa) == "(Target)") {
        targetList.push(object);
      } else {
        safetyList.push(object);
      }
    });
    let newList = safetyList.concat(targetList, reachList);
    return [...newList];
  };

  const format = (num) => {
    if (num.length == 3){
      return num
    }
    num = num.toString();
    let newNum = "";
    let count = 1;
    for (let i = num.length - 1; i >= 0; i--) {
      newNum += num[i];
      if (count % 3 == 0) {
        newNum += ",";
      }
      count++;
    }
    num = "";
    for (let i = newNum.length - 1; i >= 0; i--) {
      num += newNum[i];
    }
    num += " ";
    return num;
  };
  const directions = (place, address) => {
    return (
      <form action="http://maps.google.com/maps" method="get" target="_blank">
        <input type="hidden" name="saddr" value={address} />
        <input type="hidden" name="daddr" value={place} />
        <input
          type="submit"
          className="listButton listButton2"
          value="Get Directions"
        />
      </form>
    );
  };
  const settingParse = (setting) => {
    if (setting == "Urban") {
      return "an urban";
    }
    return "a suburban";
  };
  const Colleges = () => {
    if (currentUser["colleges"].length > 0) {
      return (
        <>
          {reorder(currentUser["colleges"]).map((object) => {
            const { name, sat, act, gpa, town, setting, size, type, link, image } =
              object;
            return (
              <div key={Math.random()}>
                <div className="listItem">
                  <img src={image} style={{ width: "460px" }} />
                  <div className="gmap_canvas">
                    <iframe
                      width="460"
                      height="300"
                      id="gmap_canvas"
                      src={Link(name)}
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                    ></iframe>
                    <br />
                    <a href="https://www.embedgooglemap.net"></a>
                  </div>
                  <h3 className="listPlace">{name} {typeSchool(sat, act, gpa)}</h3>
                  <p className="listDescription">
                    Average SAT Score: {sat}
                    <br></br>Average ACT Score: {act}
                    <br></br>Average GPA: {gpa}
                  </p>
                  <p className="listDescription">
                    {name} is a school located in {town} which has{" "}
                    {format(size)}
                    undergraduate students. It is {type.toLowerCase()} and has{" "}
                    {settingParse(setting)} setting.
                  </p>
                  <div className="listButtonDiv">
                    <button className="listButton yellow">
                      <a href={link} target="_blank">
                        <h3>Learn More</h3>
                      </a>
                    </button>
                    {directions(name, currentUser.address)}
                    <button
                      className="listButton redRemove"
                      onClick={() => {
                        let tempCollege = [];
                        for (
                          let i = 0;
                          i < currentUser["colleges"].length;
                          i++
                        ) {
                          if (currentUser["colleges"][i]["name"] != name) {
                            tempCollege.push(currentUser["colleges"][i]);
                          }
                        }
                        console.log(tempCollege);
                        currentUser["colleges"] = [...tempCollege];
                        setUserList([ ...userList ]);
                        setCurrentUser({ ...currentUser });
                      }}
                    >
                      <h3>Unsave College</h3>
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
        <p className="boxedParagraph">
          You haven't saved any, so go back to the explore tab and find some you
          like!
        </p>
      );
    }
  };
  const loginCheck = () => {
    if (login) {
      return <>{Colleges()}</>;
    } else {
      return (
        <p className="boxedParagraph">
          You aren't logged in, so you can't access this part of the app yet.
          Please go log in or set up an account on the{" "}
          <a href="/account" className="coloredLink">
            profile page
          </a>
          !
        </p>
      );
    }
  };
  return (
    <>
      <h3 className="positionedHeader">College List</h3>
      <p className="boxedParagraph">
        Colleges you save from the explore page will appear here! Remember that
        you can look into these colleges by viewing the images embedded with
        Google Maps, and going to the linked websites! If you lose interest in a
        school, remove it with the red button.
      </p>
      {loginCheck()}
    </>
  );
}

export default Find;

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
