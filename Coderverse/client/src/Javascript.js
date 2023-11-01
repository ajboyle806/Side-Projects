import logo from "./logo.svg";
import "./Python.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Learn() {
  const [js, setJs] = useLocalStorage("js", []);

  const getComplete = (num) => {
    if (num < js[3]) {
      return 2;
    } else if (num > js[3]) {
      return 0;
    }
    return 1;
  };

  return (
    <>
      <div className="background">
        <div className="app-page-lessons">
          <div className="lessons-page-head python">
            <div className="lessons-header-text-div">
              <h2 className="lessons-header-name">
                Intro to Javascript ({Math.ceil(js[1] / 32100)}%)
              </h2>
              <Link to="/">
                <h2 className="lessons-header-exit">✕</h2>
              </Link>
            </div>
            <div className="lessons-header-progress-back">
              <div
                style={{ width: ((js[1] / 32100) * 100).toString() + "%" }}
                className="lessons-header-progress-front"
              ></div>
            </div>
          </div>
          <div className="lessons-desc">
            <h2 className="lessons-desc-header">What you'll learn</h2>
            <p className="lessons-desc-paragraph">
              ✔&nbsp;&nbsp;How to write your own programs
            </p>
            <p className="lessons-desc-paragraph">
              ✔&nbsp;&nbsp;How Javascript relates to what you already know
            </p>
            <p className="lessons-desc-paragraph">
              ✔&nbsp;&nbsp;Basics of programming concepts
            </p>
            <div className="lessons-desc-divider"></div>
            <h2 className="lessons-desc-header lessons-progress">Progress</h2>
            <p className="lessons-desc-paragraph lessons-progress-stats">
              {js[1]} / 32100 MP&nbsp;&nbsp;•&nbsp;&nbsp;{js[3]} / 45 Modules
            </p>
            <div className="next-lesson-button">
              <h2 className="lessons-desc-header">Next Lesson</h2>
            </div>
          </div>
          <div className="course-pathway">
            <div className="course-nodes">
              <Node color={1} complete={getComplete(0)} />
              <Connector color={1} type={0} complete={getComplete(0)} />
              <Connector color={1} type={1} complete={getComplete(1)} />
              <Connector color={1} type={1} complete={getComplete(3)} />
              <Node color={2} complete={getComplete(4)} />
              <Connector color={2} type={0} complete={getComplete(4)} />
              <Connector color={2} type={1} complete={getComplete(5)} />
              <Connector color={2} type={1} complete={getComplete(7)} />
              <Connector color={2} type={1} complete={getComplete(9)} />
              <Connector color={2} type={1} complete={getComplete(11)} />
              <Connector color={2} type={1} complete={getComplete(13)} />
              <Connector color={2} type={1} complete={getComplete(14)} />
              <Node color={3} complete={getComplete(15)} />
              <Connector color={3} type={0} complete={getComplete(15)} />
              <Connector color={3} type={1} complete={getComplete(16)} />
              <Connector color={3} type={1} complete={getComplete(18)} />
              <Connector color={3} type={1} complete={getComplete(20)} />
              <Connector color={3} type={1} complete={getComplete(21)} />
              <Connector color={3} type={1} complete={getComplete(22)} />
              <Node color={4} complete={getComplete(23)} />
              <Connector color={4} type={0} complete={getComplete(23)} />
              <Connector color={4} type={1} complete={getComplete(25)} />
              <Connector color={4} type={1} complete={getComplete(27)} />
              <Connector color={4} type={1} complete={getComplete(28)} />
              <Connector color={4} type={1} complete={getComplete(29)} />
              <Node color={3} complete={getComplete(30)} />
              <Connector color={3} type={0} complete={getComplete(30)} />
              <Connector color={3} type={1} complete={getComplete(31)} />
              <Connector color={3} type={1} complete={getComplete(33)} />
              <Connector color={3} type={1} complete={getComplete(35)} />
              <Connector color={3} type={1} complete={getComplete(36)} />
              <Connector color={3} type={1} complete={getComplete(38)} />
              <Connector color={3} type={1} complete={getComplete(40)} />
              <Connector color={3} type={1} complete={getComplete(41)} />
              <Node color={2} complete={getComplete(42)} />
              <Connector color={2} type={0} complete={getComplete(43)} />
              <Connector color={2} type={1} complete={getComplete(44)} />
              <Node color={1} complete={getComplete(45)} />
            </div>
            <div className="lesson-blocks">
              <Unit color={1} text={"Meet Javascript"} />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={1}
                  complete={getComplete(0)}
                  title={"1.1: Lesson"}
                  name={"Hello, World!"}
                  points={"300 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={1}
                  complete={getComplete(1)}
                  title={"1.2: Lesson"}
                  name={"JS Programs"}
                  points={"500 MP"}
                  link={"/python-lesson-1.2"}
                />
                <SecondBlock
                  layer={2}
                  color={1}
                  complete={getComplete(2)}
                  title={"1.2: Activity"}
                  name={"Syntax Search"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={3}
                  color={1}
                  complete={getComplete(3)}
                  title={"1.3: Lesson"}
                  name={"console.log"}
                  points={"300 MP"}
                  link={"/python-lesson-1.2"}
                />
              </div>
              <Unit color={2} text={"Data Dash"} complete={getComplete(4)} />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={2}
                  complete={getComplete(4)}
                  title={"2.1: Lesson"}
                  name={"Nifty Numbers"}
                  points={"300 MP"}
                />
                {/* <SecondBlock layer={1} /> */}
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(5)}
                  title={"2.2: Lesson"}
                  name={"Oh, Operators"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={2}
                  complete={getComplete(6)}
                  title={"2.2: Activity"}
                  name={"Put It Together"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(7)}
                  title={"2.3: Lesson"}
                  name={"Variables!"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={2}
                  complete={getComplete(8)}
                  title={"2.3: Activity"}
                  name={"Super Store"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(9)}
                  title={"2.4: Lesson"}
                  name={"Super Strings"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={2}
                  complete={getComplete(10)}
                  title={"2.4: Activity"}
                  name={"Text It"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(11)}
                  title={"2.5: Lesson"}
                  name={"True or False"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={2}
                  complete={getComplete(12)}
                  title={"2.5: Activity"}
                  name={"Compare Them!"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(13)}
                  title={"2.6: Project"}
                  name={"Take Inventory"}
                  points={"2000 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={3}
                  color={3}
                  complete={getComplete(14)}
                  title={"Unit 2 Test"}
                  name={"10 Questions"}
                  points={"1000 MP"}
                />
              </div>
              <Unit
                color={3}
                text={"All About Arrays"}
                complete={getComplete(15)}
              />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={3}
                  complete={getComplete(15)}
                  title={"3.1: Lesson"}
                  name={"Lookin' at Arrays"}
                  points={"300 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(16)}
                  title={"3.2: Lesson"}
                  name={"Oh, Indices"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={3}
                  complete={getComplete(17)}
                  title={"3.2: Activity"}
                  name={"Index Impossible"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(18)}
                  title={"3.3: Lesson"}
                  name={"List Operators"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={3}
                  complete={getComplete(19)}
                  title={"3.3: Activity"}
                  name={"Morph Madness"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(20)}
                  title={"3.4: Lesson"}
                  name={"Apply Arrays"}
                  points={"300 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(21)}
                  title={"3.5: Project"}
                  name={"Joke Generator"}
                  points={"2000 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={3}
                  color={3}
                  complete={getComplete(22)}
                  title={"Unit 3 Quiz"}
                  name={"5 Questions"}
                  points={"500 MP"}
                />
              </div>
              <Unit
                color={4}
                text={"Object Oasis"}
                complete={getComplete(23)}
              />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={3}
                  complete={getComplete(23)}
                  title={"4.1: Lesson"}
                  name={"Keys and Values"}
                  points={"300 MP"}
                />
                <SecondBlock
                  layer={1}
                  color={4}
                  complete={getComplete(24)}
                  title={"4.1: Activity"}
                  name={"Bracket Bash"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(25)}
                  title={"4.2: Lesson"}
                  name={"Object Add On"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={4}
                  complete={getComplete(26)}
                  title={"4.2: Activity"}
                  name={"Dots Declare"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(27)}
                  title={"4.3: Lesson"}
                  name={"To the Console!"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(28)}
                  title={"4.4: Project"}
                  name={"Your Account"}
                  points={"2000 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={3}
                  color={4}
                  complete={getComplete(29)}
                  title={"Unit 4 Quiz"}
                  name={"5 Questions"}
                  points={"500 MP"}
                />
              </div>
              <Unit
                color={3}
                text={"If I Loop..."}
                complete={getComplete(30)}
              />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={3}
                  complete={getComplete(30)}
                  title={"5.1: Lesson"}
                  name={"Looping Back"}
                  points={"300 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(31)}
                  title={"5.2: Lesson"}
                  name={"Loop a While"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={4}
                  complete={getComplete(32)}
                  title={"5.2: Activity"}
                  name={"Come Again?"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(33)}
                  title={"5.3: Lesson"}
                  name={"For!"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={4}
                  complete={getComplete(34)}
                  title={"5.3: Activity"}
                  name={"Insane Iteration"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(35)}
                  title={"5.4: Lesson"}
                  name={"Conditionals"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(36)}
                  title={"5.5: Lesson"}
                  name={"What if?"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={4}
                  complete={getComplete(37)}
                  title={"5.5: Activity"}
                  name={"What Happens?"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(38)}
                  title={"5.6: Lesson"}
                  name={"If... Else?"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={4}
                  complete={getComplete(39)}
                  title={"5.6: Activity"}
                  name={"Chain It Up"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(40)}
                  title={"5.7: Project"}
                  name={"The Scanner"}
                  points={"2000 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={3}
                  color={4}
                  complete={getComplete(41)}
                  title={"Unit 5 Test"}
                  name={"10 Questions"}
                  points={"1000 MP"}
                />
              </div>
              <Unit
                color={1}
                text={"Take It Away"}
                complete={getComplete(42)}
              />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={4}
                  complete={getComplete(43)}
                  title={"F.1: Lesson"}
                  name={"Review"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(44)}
                  title={"F.2: Project"}
                  name={"Weatherman"}
                  points={"5000 MP"}
                />
              </div>
            </div>
          </div>
          <div className="lesson-spacer"></div>
        </div>
      </div>
    </>
  );
}

const Block = ({ layer, color, complete, title, name, points, link }) => {
  if (layer == 1) {
    return (
      <Link to={link}>
        <div className="lesson-block reduce-bottom">
          <Content
            color={color}
            complete={complete}
            title={title}
            name={name}
            points={points}
          />
        </div>
      </Link>
    );
  } else if (layer == 2) {
    return (
      <div className="lesson-block reduce-top  reduce-bottom">
        <Content
          color={color}
          complete={complete}
          title={title}
          name={name}
          points={points}
        />
      </div>
    );
  } else if (layer == 3) {
    return (
      <Link to={link}>
        <div className="lesson-block reduce-top">
          <Content
            color={color}
            complete={complete}
            title={title}
            name={name}
            points={points}
          />
        </div>
      </Link>
    );
  }
  return (
    <Link to={link}>
      <div className="lesson-block">
        <Content
          color={color}
          complete={complete}
          title={title}
          name={name}
          points={points}
        />
      </div>
    </Link>
  );
};

const Content = ({ color, complete, title, name, points }) => {
  if (complete == 0) {
    return (
      <>
        <div className="lesson-block-head">
          <h2 className="locked">{title}</h2>
          <img src="locked.png" alt="" />
        </div>
        <h2 className="lesson-desc locked">{name}</h2>
        <h2 className="lesson-points locked">{points}</h2>
      </>
    );
  }
  let img = "";
  if (complete == 2) {
    img = "complete-" + color.toString() + ".png";
  } else if (complete == 1) {
    img = "current-" + color.toString() + ".png";
  }
  if (color == 1) {
    return (
      <>
        <div className="lesson-block-head">
          <h2 className="color1">{title}</h2>
          <img src={img} alt="" />
        </div>
        <h2 className="lesson-desc color1-dark">{name}</h2>
        <h2 className="lesson-points color1-dark">{points}</h2>
      </>
    );
  } else if (color == 2) {
    return (
      <>
        <div className="lesson-block-head">
          <h2 className="color2">{title}</h2>
          <img src={img} alt="" />
        </div>
        <h2 className="lesson-desc color2-dark">{name}</h2>
        <h2 className="lesson-points color2">{points}</h2>
      </>
    );
  } else if (color == 3) {
    return (
      <>
        <div className="lesson-block-head">
          <h2 className="color3">{title}</h2>
          <img src={img} alt="" />
        </div>
        <h2 className="lesson-desc color3-dark">{name}</h2>
        <h2 className="lesson-points color3-dark">{points}</h2>
      </>
    );
  } else if (color == 4) {
    return (
      <>
        <div className="lesson-block-head">
          <h2>{title}</h2>
          <img src={img} alt="" />
        </div>
        <h2 className="lesson-desc">{name}</h2>
        <h2 className="lesson-points">{points}</h2>
      </>
    );
  }
};

const SecondBlock = ({ layer, color, complete, title, name, points }) => {
  if (layer == 1) {
    return (
      <>
        <div className="connector"></div>
        <div className="lesson-block reduce-bottom">
          <Content
            color={color}
            title={title}
            complete={complete}
            name={name}
            points={points}
          />
        </div>
      </>
    );
  } else if (layer == 2) {
    return (
      <>
        <div className="connector higher"></div>
        <div className="lesson-block reduce-top reduce-bottom">
          <Content
            color={color}
            title={title}
            complete={complete}
            name={name}
            points={points}
          />
        </div>
      </>
    );
  } else if (layer == 3) {
    return (
      <>
        <div className="connector higher"></div>
        <div className="lesson-block reduce-top">
          <Content
            color={color}
            title={title}
            complete={complete}
            name={name}
            points={points}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="connector"></div>
      <div className="lesson-block">
        <Content
          color={color}
          title={title}
          complete={complete}
          name={name}
          points={points}
        />
      </div>
    </>
  );
};

const Node = ({ color, complete }) => {
  if (complete == 0) {
    return <img src="node-0.png"></img>;
  }
  return <img src={"node-" + color.toString() + ".png"} />;
};

const Connector = ({ color, type, complete }) => {
  let ending = ".png";
  if (type == 1) {
    ending = "-s" + ending;
  }
  if (complete == 0) {
    return <img src={"connector-0" + ending} />;
  }
  return <img src={"connector-" + color.toString() + ending} />;
};

const Unit = ({ color, text, complete }) => {
  let color_style = "#b9b8c0";
  if (color == 1) {
    color_style = "#df788b";
  } else if (color == 2) {
    color_style = "#b1689b";
  } else if (color == 3) {
    color_style = "#8a58a7";
  } else if (color == 4) {
    color_style = "#7b60bd";
  }
  if (complete == 0) {
    color_style = "#b9b8c0";
  }
  return (
    <h2 className="unit-header" style={{ color: color_style }}>
      {text}
    </h2>
  );
};

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
