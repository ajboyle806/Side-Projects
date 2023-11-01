import logo from "./logo.svg";
import "./Assistant.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Learn() {
  const [message, setMessage] = useState("");
  const [sendImg, setSendImg] = useState("send-unfocused.png");
  let [loading, setLoading] = useState(false);
  const [user, setUser] = useLocalStorage("user", []);

  const handleSubmit = async () => {
    if (chats.length == 1 || chats[1]["message"] != "...") {
      setMessage("");
      setSendImg("send-unfocused.png");
      chats.unshift({ author: "User", message: message, url: user[6] });
      if (chats.length == 2) {
        chats.pop();
      }
      setChats([...chats]);
      if (message.length > 0) {
        let question = message;
        question = { question };
        await fetch("/add_chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(question),
        });
        await delay(250);
        chats.splice(1, 0, {
          author: "AI",
          message: "...",
          url: "bot_logo_a.png",
        });
        setChats([...chats]);
        if (!model) {
          await fetch("/app_query").then((response) =>
            response.json().then((data) => {
              if (data["score"] < 0.01 || data["answer"] == "") {
                chats[1] = {
                  author: "AI",
                  message:
                    "Sorry, I don't know how to respond! Could you rephrase your question, and make sure you're asking about programming or the app? Alternatively, ask this as a general query!",
                  url: "bot_logo_a.png",
                };
              } else if (
                data["answer"].split(" ")[0].includes("(") &&
                data["answer"][data["answer"].length - 1] == ")"
              ) {
                chats[1] = {
                  author: "AI",
                  message: data["answer"],
                  url: "bot_logo_a.png",
                };
              } else if (data["answer"].split(" ")[0].includes("(")) {
                chats[1] = {
                  author: "AI",
                  message: data["answer"] + "!",
                  url: "bot_logo_a.png",
                };
              } else if (
                data["answer"][data["answer"].length - 1] == ")" ||
                data["answer"][data["answer"].length - 1] == "!" ||
                data["answer"][data["answer"].length - 1] == "]" ||
                data["answer"][data["answer"].length - 1] == "."
              ) {
                chats[1] = {
                  author: "AI",
                  message:
                    data["answer"][0].toUpperCase() +
                    data["answer"].substring(1, data["answer"].length),
                  url: "bot_logo_a.png",
                };
              } else {
                chats[1] = {
                  author: "AI",
                  message:
                    data["answer"][0].toUpperCase() +
                    data["answer"].substring(1, data["answer"].length) +
                    "!",
                  url: "bot_logo_a.png",
                };
              }
              setChats([...chats]);
              if (message != "" && message != undefined) {
                setSendImg("send-focused.png");
              }
            })
          );
        } else {
          await fetch("/general_query").then((response) =>
            response.json().then((data) => {
              console.log(data["answer"]);
              console.log(data["score"]);
              chats[1] = {
                author: "AI",
                message: data["answer"].split("fidhuosd"),
                url: "bot_logo_a.png",
              };
              setChats([...chats]);
              if (message != "" && message != undefined) {
                setSendImg("send-focused.png");
              }
            })
          );
        }
      }
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    handleSubmit();
  };

  let [chats, setChats] = useLocalStorage("chat_history", [
    {
      author: "AI",
      message: "Feel free to ask me your questions!",
      url: "bot_logo_a.png",
    },
  ]);

  // const getSendButton = () => {
  //   if (message == "") {
  //     return (
  //       <img
  //         className="send-button"
  //         src="send-unfocused.png"
  //         onClick={() => {
  //           handleSubmit();
  //         }}
  //         type="submit"
  //       ></img>
  //     );
  //   }
  //   return (
  //     <img
  //       className="send-button"
  //       src="send-focused.png"
  //       onClick={() => {
  //         handleSubmit();
  //       }}
  //       type="submit"
  //     ></img>
  //   );
  // };

  const [switchStyle, setSwitchStyle] = useLocalStorage("switch-style", { marginLeft: "2rem" });
  const [switchTextStyle, setSwitchTextStyle] = useLocalStorage("text-style", {
    color: "#9a5fa2",
  });
  const [switchTextText, setSwitchTextText] = useLocalStorage("query-type", "Lesson Query");
  let [model, setModel] = useState(false);

  const switchSwitch = async () => {
    // setRankingTextStyle({ opacity: 0 });
    if (switchStyle["marginLeft"] == "2rem") {
      model = true;
      setModel(true);
      setSwitchStyle({ marginLeft: "14rem" });
      await delay(150);
    } else {
      model = false;
      setModel(false);
      setSwitchStyle({ marginLeft: "2rem" });
      await delay(150);
    }
    setSwitchTextStyle({ color: "#9a5fa2" });
    if (model) {
      setSwitchTextText("General Query");
    } else {
      setSwitchTextText("Lesson Query");
    }
    // setRankingTextStyle({ opacity: 1 });
    setSwitchTextStyle({ color: "#9a5fa2" });
  };

  const getMessage = (message) => {
    if (typeof message == "string") {
      return <p className="chat-text">{message}</p>;
    }
    let code = false;
    let codeCount = 0;
    let codeLines = 0;
    if (message[message.length - 1] == "```") {
      message.pop();
    }
    return (
      <>
        <span className="chat-text">
          {message.map((line) => {
            if (line != " ") {
              let index = message.indexOf(line);
              if (line.includes("```")) {
                code = !code;
                codeCount = 0;
              }
              codeCount++;
              if (code && codeCount > 1) {
                if (codeCount == 2) {
                  codeLines++;
                  let marginTop = 0;
                  if (
                    index != 0 &&
                    (message[index - 1] != "" ||
                      message[index - 1].includes("```") == false)
                  ) {
                    marginTop = "1rem";
                  }
                  if (
                    index == message.length - 1 ||
                    message[index + 1].includes("```")
                  ) {
                    return (
                      <p
                        style={{
                          backgroundColor: "#2c2c2c",
                          color: "#c185ae",
                          fontFamily: "Lucida Console",
                          paddingTop: "1rem",
                          paddingBottom: "0.75rem",
                          marginTop: marginTop,
                          fontSize: "0.875rem",
                          borderRadius: "0.5rem",
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                        }}
                      >
                        {line}
                      </p>
                    );
                  }
                  return (
                    <p
                      style={{
                        backgroundColor: "#2c2c2c",
                        color: "#c185ae",
                        fontFamily: "Lucida Console",
                        paddingTop: "1rem",
                        paddingBottom: "0.75rem",
                        marginTop: marginTop,
                        fontSize: "0.875rem",
                        borderTopRightRadius: "0.5rem",
                        borderTopLeftRadius: "0.5rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                      }}
                    >
                      {line
                        .replace("```python", "")
                        .replace("```html", "")
                        .replace("```java", "")
                        .replace("```script", "")}
                    </p>
                  );
                }
                if (
                  index == message.length - 1 ||
                  message[index + 1].includes("```")
                ) {
                  return (
                    <p
                      style={{
                        backgroundColor: "#2c2c2c",
                        color: "#c185ae",
                        fontFamily: "Lucida Console",
                        paddingBottom: "1rem",
                        marginTop: "0rem",
                        fontSize: "0.875rem",
                        borderBottomRightRadius: "0.5rem",
                        borderBottomLeftRadius: "0.5rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                      }}
                    >
                      {line
                        .replace("```python", "")
                        .replace("```html", "")
                        .replace("```java", "")
                        .replace("```script", "")}
                    </p>
                  );
                }
                if (line.includes("```")) {
                } else {
                  return (
                    <p
                      style={{
                        backgroundColor: "#2c2c2c",
                        color: "#c185ae",
                        fontFamily: "Lucida Console",
                        paddingTop: "0.25rem",
                        paddingBottom: "0.5rem",
                        fontSize: "0.875rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                      }}
                    >
                      {line
                        .replace("```python", "")
                        .replace("```html", "")
                        .replace("```java", "")
                        .replace("```script", "")}
                    </p>
                  );
                }
              } else if (!code && codeLines > 0) {
                codeLines = 0;
                return (
                  <>
                    <p
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      {line
                        .replace("```python", "")
                        .replace("```html", "")
                        .replace("```java", "")
                        .replace("```script", "")
                        .replace("```", "")}
                    </p>
                  </>
                );
              }
              if (
                [
                  "javascript",
                  "python",
                  "html",
                  "java",
                  "sql",
                  "```python",
                  "```html",
                  "```java",
                  "```javascript",
                  "```sql",
                ].includes(line)
              ) {
                
              } else {
                return (
                  <>
                    {line
                      .replace("```python", "")
                      .replace("```html", "")
                      .replace("```java", "")
                      .replace("```script", "")
                      .replace("```", "")}
                    <br></br>
                  </>
                );
              }
            }
          })}
        </span>
      </>
    );
  };

  return (
    <>
      <div className="background">
        <div className="app-page-overflow">
          <div id="assistant-header"></div>
          <div id="chats">
            <div className="switch-reverse">
              <div
                onClick={() => {
                  switchSwitch();
                }}
              >
                <h2>Lesson Query</h2>
              </div>
              <div
                onClick={() => {
                  switchSwitch();
                }}
              >
                <h2>General Query</h2>
              </div>
            </div>
            <div style={switchStyle} className="active-slider-reverse">
              <h2 style={switchTextStyle}>{switchTextText}</h2>
            </div>
            {chats.map((element) => {
              let { author, message, url } = element;
              const line = () => {
                let height = "1px";
                if (author != "AI") {
                  height = "3px";
                }
                return <div className="line" style={{ height: height }}></div>;
              };

              return (
                <>
                  {line()}
                  <div className="chat-container">
                    <img className="chat-profile-pic" src={url}></img>
                    {getMessage(message)}
                  </div>
                </>
              );
            })}
            <div id="chat-bottom-spacer"></div>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="message-input-div">
              <input
                className="message-input"
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  console.log(model);
                  if (
                    chats.length == 1 || e.target.value != "" &&
                    chats[1]["message"] != "..."
                  ) {
                    setSendImg("send-focused.png");
                  } else {
                    setSendImg("send-unfocused.png");
                  }
                }}
                placeholder="Type here to talk to Amanda"
              />
              <img
                className="send-button"
                src={sendImg}
                onClick={() => {
                  handleSubmit();
                }}
                type="submit"
              ></img>
            </div>
          </form>
          <div className="navbar">
            <div className="navbar-images">
              <Link to="/">
                <img src="learn-inactive.png" alt="" />
              </Link>
              <Link to="/assistant">
                <img src="assistant-active.png" alt="" />
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
