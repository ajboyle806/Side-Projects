import "../App.css";
import React from "react";
import { useState } from "react";
import Head from "../Head";
import { Nav2 } from "../Nav";

export default function Discuss() {
  return (
    <section id="app">
      <div id="container">
        <Head />
        <Form />
        <Nav2 />
      </div>
    </section>
  );
}

const linebreak = (list, count) => {
  if (list.length - 1 != count) {
    return <div className="linebreak"></div>;
  }
};

const Form = () => {
  const [inputs, setInputs] = useState({});
  let [generalList, setGeneralList] = useLocalStorage("generalList", []);
  let [feedbackList, setFeedbackList] = useLocalStorage("feedbackList", []);
  let [firstList, setFirstList] = useLocalStorage("firstList", []);
  let [secondList, setSecondList] = useLocalStorage("secondList", []);
  let [thirdList, setThirdList] = useLocalStorage("thirdList", []);
  let [fourthList, setFourthList] = useLocalStorage("fourthList", []);
  let [fifthList, setFifthList] = useLocalStorage("fifthList", []);
  let [sixthList, setSixthList] = useLocalStorage("sixthList", []);
  let [seventhList, setSeventhList] = useLocalStorage("seventhList", []);
  let [eighthList, setEighthList] = useLocalStorage("eighthList", []);
  let [ninthList, setNinthList] = useLocalStorage("ninthList", []);
  let [tenthList, setTenthList] = useLocalStorage("tenthList", []);
  let [currentUser, setCurrentUser] = useLocalStorage("userInfo", {username: "", name: "", address: "", id: -1, sat:"",act:"",gpa:"", major:"", size:"", region:"", setting:"", type:"", exact: [], close: [], colleges:[]})
  let [message, setMessage] = useState("")
  const [commentType, setCommentType] = useState("-1");
  const handleChange = (event) => {
    setMessage("")
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentUser.username.length > 0) {
      inputs.username = currentUser.id;
      setInputs(inputs);
      if (inputs.comment == undefined) {
        setMessage("Please fill in the comment field");
      } else {
        if (commentType == "-1") {
          generalList.push(inputs);
          setGeneralList(generalList);
        } else if (commentType == "0") {
          feedbackList.push(inputs);
          setFeedbackList(feedbackList);
        } else if (commentType == "1") {
          firstList.push(inputs);
          setFirstList(firstList);
        } else if (commentType == "2") {
          secondList.push(inputs);
          setSecondList(secondList);
        } else if (commentType == "3") {
          thirdList.push(inputs);
          setThirdList(thirdList);
        } else if (commentType == "4") {
          fourthList.push(inputs);
          setFourthList(fourthList);
        } else if (commentType == "5") {
          fifthList.push(inputs);
          setFifthList(fifthList);
        } else if (commentType == "6") {
          sixthList.push(inputs);
          setSixthList(sixthList);
        } else if (commentType == "7") {
          seventhList.push(inputs);
          setSeventhList(seventhList);
        } else if (commentType == "8") {
          eighthList.push(inputs);
          setEighthList(eighthList);
        } else if (commentType == "9") {
          ninthList.push(inputs);
          setNinthList(ninthList);
        } else if (commentType == "10") {
          tenthList.push(inputs);
          setTenthList(tenthList);
        }
        setInputs(() => ({}));
      } 
    } else {
      window.location.replace("/Account");
    }
  };

  const dropChange = (event) => {
    setCommentType(event.target.value);
  };

  let count = -1;

  return (
    <>
      <h3 className="positionedHeader">College Discussion Forum</h3>
      <div className="formDiv">
        <form onSubmit={handleSubmit}>
          <label>
            <div className="enterDiv">
              <p id="topicLabel">Thread: </p>
              <select
                id="topicDropdown"
                value={commentType}
                onChange={dropChange}
              >
                <option value="-1">General Discussion</option>
                <option value="0">Questions for College Students</option>
                <option value="1">Advice for High School Students</option>
                <option value="2">Find a College</option>
                <option value="3">Find a Major</option>
                <option value="4">Tuition and Financial Aid</option>
                <option value="5">Jobs and Internships</option>
                <option value="6">The Application Process</option>
                <option value="7">College Life</option>
                <option value="8">Standardized Testing</option>
                <option value="9">Extracurriculars</option>
                <option value="10">App Feedback</option>
              </select>
            </div>
          </label>
          <label>
            <div className="enterDiv">
              <textarea
                id="textareaInput"
                placeholder="Type up your post/comment here"
                name="comment"
                value={inputs.comment || ""}
                onChange={handleChange}
              />
            </div>
          </label>
          <p className="boxedParagraph" style={{color: "red"}}>
            {message}
          </p>
          <input className="submitButton" type="submit" value="Post" />
        </form>
      </div>
      {check("General Discussion", [...generalList])}
      {check("Questions for College Students", [...feedbackList])}
      {check("Advice for High School Students", [...firstList])}
      {check("Find a College", [...secondList])}
      {check("Find a Major", [...thirdList])}
      {check("Tuition and Financial Aid", [...fourthList])}
      {check("Jobs and Internships", [...fifthList])}
      {check("The Application Process", [...sixthList])}
      {check("College Life", [...seventhList])}
      {check("Standardized Testing", [...eighthList])}
      {check("Extracurriculars", [...ninthList])}
      {check("App Feedback", [...tenthList])}
    </>
  );
};

const check = (threadName, threadList) => {
  if (threadList.length > 0) {
    return <CommentSection name={threadName} list={[...threadList]} />;
  }
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

const CommentSection = ({ name, list, user }) => {
  let [userList, setUserList] = useLocalStorage("userList", []);
  let count = -1;
  const scheck = (list) => {
    if (list.length > 1) {
      return "s";
    }
  };
  const major = (word) => {
    if (word != ""){
      return "(" + word + ")"
    }
  }
  return (
    <>
      <div className="commentHolderDiv">
        <h2
          style={{
            marginTop: "20px",
            marginRight: "20px",
            marginBottom: "20px",
            marginLeft: "20px",
            fontSize: "1.25rem",
          }}
        >
          {name} ({list.length} comment{scheck(list)})
        </h2>
        <p style={{ display: "none" }}>{(count = -1)}</p>
        <div key={count} className="commentDiv">
          {[...list].map((item) => {
            {
              count++;
            }
            let inputUser = userList[item.username].name;
            let inputComment = item.comment;
            const d = new Date();
            return (
              <div key={Math.random()}>
                <div className="topComment">
                  <img
                    src="userhead.png"
                    style={{ height: "50px" }}
                    alt=""
                  />
                  <h2 className="nameComment">{inputUser} {major(userList[item.username].major)}</h2>
                </div>
                <p className="commentText">{inputComment}</p>
                {linebreak([...list], count)}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
