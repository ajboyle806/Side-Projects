import "../App.css";
import React from "react";
import { useState } from "react";
import Head from "../Head";
import { Nav2_5 } from "../Nav";
import collegeList from "../collegeList";
import { Link } from "react-router-dom";

function Find() {
  return (
    <section id="app">
      <div id="container">
        <Head />
        <List />
        <Nav2_5 />
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

  const typeSchool = (sat, act, gpa) => {
    let safety = false;
    let target = false;
    let reach = false;
    let gpaCheck = 0;
    if (currentUser["sat"] != undefined){
      if (Math.abs(currentUser["sat"] - sat) < 150){
        
        target = true
      }
      else if ((currentUser["sat"] - sat) > 150){
        
        if (sat < 1470){
          safety = true
        }
        else{
          target = true
        }
      }
      else {
        reach = true
      }
    }
    if (currentUser["act"] != undefined){
      if (Math.abs(currentUser["act"] - act) < 4){
        
        target = true
      }
      else if ((currentUser["act"] - act) > 4){
        
        if (act < 32){
          safety = true
        }
        else{
          target = true
        }
      }
      else {
        reach = true
      }
    }
    if (currentUser["gpa"] != undefined){
      if (Math.abs(currentUser["gpa"] - gpa) < 0.1){
        gpaCheck = 2
      }
      else if ((currentUser["gpa"] - gpa) > 0.1){
        gpaCheck = 3
      }
      else {
        gpaCheck = 1
      }
    }
    if (currentUser["gpa"] == "" && currentUser["sat"] == "" && currentUser["act"] == ""){
      return ""
    }
    if (currentUser["gpa"] == undefined && currentUser["sat"] == undefined && currentUser["act"] == undefined){
      return ""
    }
    if (gpa == -1){
      if (safety == true) {
        return "(Safety)";
      }
      if (target == true) {
        return "(Target)";
      }
      return "(Reach)";
    }
    if (safety == true && gpa > 2){
      return "(Safety)"
    }
    if (safety == true || target == true){
      return "(Target)"
    }
    return "(Reach)"
  }

  const reorder = (list) => {
    if (currentUser["gpa"] == undefined && currentUser["sat"] == undefined && currentUser["act"] == undefined){
      return [...list]
    }
    if (currentUser["gpa"] == "" && currentUser["sat"] == "" && currentUser["act"] == ""){
      return [...list]
    }
    let safetyList = [];
    let targetList = [];
    let reachList = [];
    list.map((object)=>{
      const {gpa, sat, act} = object
      if (typeSchool(sat, act, gpa) == "(Reach)"){
        reachList.push(object)
      }
      else if (typeSchool(sat, act, gpa) == "(Target)"){
        targetList.push(object)
      }
      else{
        safetyList.push(object)
      }
    })
    let newList = safetyList.concat(targetList, reachList)
    return [...newList]
  }


  let [login, setLogin] = useLocalStorage("login", false);
  let [userList, setUserList] = useLocalStorage("userList", []);

  const format = (num) => {
    num = num.toString();
    if (num.length == 3) {
      return num + " ";
    }
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
  const getColor = (type) => {
    console.log(type)
    if (type == "(Safety)"){
      return "#c0f0d5";
    } else if (type == "(Target)"){
      return "#eef0c0";
    } else if (type == "(Reach)"){
      return "#e3bdb6";
    }
  }
  const Partial = () => {
    if (currentUser["close"].length > 0){
      return (
        <>
          {reorder(currentUser["close"]).map((object) => {
            const { name, sat, act, gpa, town, setting, size, type, link, image } =
              object;
            return (
              <div key={Math.random()}>
                <div
                  className="listItem"
                  style={{
                    backgroundColor: getColor(typeSchool(sat, act, gpa)),
                  }}
                >
                  <img src={image} style={{ width: "460px" }} />
                  <h3 className="listPlace">
                    {name} {typeSchool(sat, act, gpa)}
                  </h3>
                  <p className="listDescription">
                    Average SAT Score: {sat}
                    <br></br>Average ACT Score: {act}
                    <br></br>Average GPA: {gpa}
                  </p>
                  <p className="listDescription" style={{ fontSize: "1.1rem" }}>
                    {name} is a school located in {town} which has{" "}
                    {format(size)}
                    undergraduate students. It is {type.toLowerCase()} and has a{" "}
                    {settingParse({ setting })} setting.
                  </p>
                  <div className="listButtonDiv">
                    <button className="listButton yellow">
                      <a href={link} target="_blank">
                        <h3>Learn More</h3>
                      </a>
                    </button>
                    <button
                      className="listButton green"
                      onClick={() => {
                        let placed = false;
                        for (
                          let i = 0;
                          i < currentUser["colleges"].length;
                          i++
                        ) {
                          if (name == currentUser["colleges"][i]["name"]) {
                            placed = true;
                          }
                        }
                        if (!placed) {
                          let tempCollege = [...currentUser["colleges"]];
                          tempCollege.push(object);
                          userList[currentUser.id]["colleges"] = [
                            ...tempCollege,
                          ];
                          currentUser["colleges"] = [...tempCollege];
                          setUserList([...userList]);
                          setCurrentUser({ ...currentUser });
                        }
                      }}
                    >
                      <h3>Save College</h3>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    }
    else {
      return (
        <p className="boxedParagraph">
          There were no colleges that partially matched your criteria. Either
          you only got exact matches, or you need to alter your selection
          criteria in the profile tab!
        </p>
      );
    }
  }
  const settingParse = (setting) => {
    if (setting == "Urban"){
      return "an urban"
    }
    return "a suburban"
  }
  const Exact = () => {
    if (currentUser["exact"].length > 0){
      return (
      <>
        {reorder(currentUser["exact"]).map((object) => {
          const { name, sat, act, gpa, town, setting, size, type, link, image } =
            object;
          return (
            <div key={Math.random()}>
              <div
                className="listItem"
                style={{
                  backgroundColor: getColor(typeSchool(sat, act, gpa)),
                }}
              >
                <img src={image} style={{ width: "460px" }} />
                <h3 className="listPlace">
                  {name} {typeSchool(sat, act, gpa)}
                </h3>
                <p className="listDescription">
                  Average SAT Score: {sat}
                  <br></br>Average ACT Score: {act}
                  <br></br>Average GPA: {gpa}
                </p>
                <p className="listDescription" style={{ fontSize: "1.1rem" }}>
                  {name} is a school located in {town} which has {format(size)}
                  undergraduate students. It is {type.toLowerCase()} and has{" "}
                  {settingParse({ setting })} setting.
                </p>
                <div className="listButtonDiv">
                  <button className="listButton yellow">
                    <a href={link} target="_blank">
                      <h3>Learn More</h3>
                    </a>
                  </button>
                  <button
                    className="listButton green"
                    onClick={() => {
                      let placed = false;
                      for (let i = 0; i < currentUser["colleges"].length; i++) {
                        if (name == currentUser["colleges"][i]["name"]) {
                          placed = true;
                        }
                      }
                      if (!placed) {
                        let tempCollege = [...currentUser["colleges"]];
                        tempCollege.push(object);
                        userList[currentUser.id]["colleges"] = [...tempCollege];
                        currentUser["colleges"] = [...tempCollege];
                        setUserList([...userList]);
                        setCurrentUser({ ...currentUser });
                      }
                    }}
                  >
                    <h3>Save College</h3>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
      );
    }
    else {
      return (
        <p className="boxedParagraph">
          Sorry, there were no colleges that matched all of your criteria! Alter
          your list, or view partial matches below!
        </p>
      );
    }
  };

  const loginCheck = () => {
    if (login){
      return (
        <>
          <div className="linebreak" style={{ marginTop: "30px" }}></div>
          <h3 className="positionedHeader" style={{ marginTop: "25px", marginBottom: "25px", marginLeft: "-20px", textAlign: "center"}}>
            Exact Matches
          </h3>
          {Exact()}
          <div className="linebreak" style={{ marginTop: "25px" }}></div>
          <h3 className="positionedHeader" style={{ marginTop: "25px", marginBottom: "25px", marginLeft: "-20px", textAlign: "center"}}>Partial Matches</h3>
          {Partial()}
        </>
      );
    }
    else{
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
  }

  return (
    <>
      <h3 className="positionedHeader">Explore Colleges</h3>
      <p className="boxedParagraph">
        Here, a list of colleges will be provided that is fine tuned just for
        you. Fill in your profile to the best of your ability to get the
        greatest results. <br></br><br></br>We encourage you to look into these colleges by
        utilizing the provided information and links. You can save colleges to your college list to keep track of schools you like and get some additional information about them.
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
