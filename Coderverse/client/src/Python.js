import logo from "./logo.svg";
import "./Python.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Learn() {
  const [python, setPython] = useLocalStorage("python", []);

  const getComplete = (num) => {
    if (num < python[3]) {
      return 2;
    } else if (num > python[3]) {
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
                Python for Kids ({Math.ceil(python[1] / 38300 * 100)}%)
              </h2>
              <Link to="/">
                <h2 className="lessons-header-exit">✕</h2>
              </Link>
            </div>
            <div className="lessons-header-progress-back">
              <div
                style={{ width: ((python[1] / 38300) * 100).toString() + "%" }}
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
              ✔&nbsp;&nbsp;How Python relates to what you already know
            </p>
            <p className="lessons-desc-paragraph">
              ✔&nbsp;&nbsp;Basics of programming concepts
            </p>
            <div className="lessons-desc-divider"></div>
            <h2 className="lessons-desc-header lessons-progress">Progress</h2>
            <p className="lessons-desc-paragraph lessons-progress-stats">
              {python[1]} / 38300 MP&nbsp;&nbsp;•&nbsp;&nbsp;{python[3]} / 52
              Modules
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
              <Node color={2} complete={getComplete(3)} />
              <Connector color={2} type={0} complete={getComplete(3)} />
              <Connector color={2} type={1} complete={getComplete(4)} />
              <Connector color={2} type={1} complete={getComplete(6)} />
              <Connector color={2} type={1} complete={getComplete(8)} />
              <Connector color={2} type={1} complete={getComplete(10)} />
              <Connector color={2} type={1} complete={getComplete(12)} />
              <Connector color={2} type={1} complete={getComplete(13)} />
              <Node color={3} complete={getComplete(13)} />
              <Connector color={3} type={0} complete={getComplete(14)} />
              <Connector color={3} type={1} complete={getComplete(15)} />
              <Connector color={3} type={1} complete={getComplete(17)} />
              <Connector color={3} type={1} complete={getComplete(19)} />
              <Connector color={3} type={1} complete={getComplete(20)} />
              <Node color={4} complete={getComplete(21)} />
              <Connector color={4} type={0} complete={getComplete(21)} />
              <Connector color={4} type={1} complete={getComplete(22)} />
              <Connector color={4} type={1} complete={getComplete(24)} />
              <Connector color={4} type={1} complete={getComplete(26)} />
              <Connector color={4} type={1} complete={getComplete(28)} />
              <Connector color={4} type={1} complete={getComplete(29)} />
              <Connector color={4} type={1} complete={getComplete(31)} />
              <Connector color={4} type={1} complete={getComplete(32)} />
              <Node color={3} complete={getComplete(33)} />
              <Connector color={3} type={0} complete={getComplete(33)} />
              <Connector color={3} type={1} complete={getComplete(35)} />
              <Connector color={3} type={1} complete={getComplete(37)} />
              <Connector color={3} type={1} complete={getComplete(39)} />
              <Connector color={3} type={1} complete={getComplete(41)} />
              <Connector color={3} type={1} complete={getComplete(42)} />
              <Connector color={3} type={1} complete={getComplete(43)} />
              <Node color={2} complete={getComplete(44)} />
              <Connector color={2} type={0} complete={getComplete(44)} />
              <Connector color={2} type={1} complete={getComplete(46)} />
              <Connector color={2} type={1} complete={getComplete(48)} />
              <Connector color={2} type={1} complete={getComplete(49)} />
              <Node color={1} complete={getComplete(50)} />
              <Connector color={1} type={0} complete={getComplete(50)} />
              <Connector color={1} type={1} complete={getComplete(51)} />
              <Node color={1} complete={getComplete(52)} />
            </div>
            <div className="lesson-blocks">
              <Unit color={1} text={"Python's Prologue"} />
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
                  layer={3}
                  color={1}
                  complete={getComplete(1)}
                  title={"1.2: Lesson"}
                  name={"Programs!"}
                  points={"500 MP"}
                  link={"/python-lesson-1.2"}
                />
                <SecondBlock
                  layer={3}
                  color={1}
                  complete={getComplete(2)}
                  title={"1.2: Activity"}
                  name={"print('Hello')"}
                  points={"500 MP"}
                  link={"/python-lesson-1.2a"}
                />
              </div>
              <Unit
                color={2}
                text={"Numbers and Letters"}
                complete={getComplete(3)}
              />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={2}
                  complete={getComplete(3)}
                  title={"2.1: Lesson"}
                  name={"Strings"}
                  points={"300 MP"}
                />
                {/* <SecondBlock layer={1} /> */}
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(4)}
                  title={"2.2: Lesson"}
                  name={"String Operators"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={2}
                  complete={getComplete(5)}
                  title={"2.2: Activity"}
                  name={"Silly String(s)"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(6)}
                  title={"2.3: Lesson"}
                  name={"Numbers"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={2}
                  complete={getComplete(7)}
                  title={"2.3: Activity"}
                  name={"Quick Math"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(8)}
                  title={"2.4: Lesson"}
                  name={"Variables"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={2}
                  complete={getComplete(9)}
                  title={"2.4: Activity"}
                  name={"I Declare!"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(10)}
                  title={"2.5: Lesson"}
                  name={"Var Operations"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={2}
                  complete={getComplete(11)}
                  title={"2.5: Activity"}
                  name={"Mixer Madness"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(12)}
                  title={"2.6: Project"}
                  name={"The Classroom"}
                  points={"2000 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={3}
                  color={3}
                  complete={getComplete(13)}
                  title={"Unit 2 Test"}
                  name={"10 Questions"}
                  points={"1000 MP"}
                />
              </div>
              <Unit
                color={3}
                text={"Loads of Lists"}
                complete={getComplete(14)}
              />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={3}
                  complete={getComplete(14)}
                  title={"3.1: Lesson"}
                  name={"Lookin' at Lists"}
                  points={"300 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(15)}
                  title={"3.2: Lesson"}
                  name={"Oh, Indices"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={3}
                  complete={getComplete(16)}
                  title={"3.2: Activity"}
                  name={"Index Impossible"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(17)}
                  title={"3.3: Lesson"}
                  name={"List Operators"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={3}
                  complete={getComplete(18)}
                  title={"3.3: Activity"}
                  name={"Morph Madness"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(19)}
                  title={"3.4: Project"}
                  name={"Rollercoaster"}
                  points={"2000 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={3}
                  color={3}
                  complete={getComplete(20)}
                  title={"Unit 3 Quiz"}
                  name={"5 Questions"}
                  points={"500 MP"}
                />
              </div>
              <Unit
                color={4}
                text={"Crazy Conditions"}
                complete={getComplete(21)}
              />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={4}
                  complete={getComplete(21)}
                  title={"4.1: Lesson"}
                  name={"Let's Logic"}
                  points={"300 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(22)}
                  title={"4.2: Lesson"}
                  name={"Comparisons"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={4}
                  complete={getComplete(23)}
                  title={"4.2: Activity"}
                  name={"Equal or not?"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(24)}
                  title={"4.3: Lesson"}
                  name={"Member or not?"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={4}
                  complete={getComplete(25)}
                  title={"4.3: Activity"}
                  name={"In the Lists"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(26)}
                  title={"4.4: Lesson"}
                  name={"And, Or, and Not"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={4}
                  complete={getComplete(27)}
                  title={"4.4: Activity"}
                  name={"Boolean Bash"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(28)}
                  title={"4.5: Lesson"}
                  name={"What If?"}
                  points={"300 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(29)}
                  title={"4.6: Lesson"}
                  name={"What Else?!"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={4}
                  complete={getComplete(30)}
                  title={"4.6: Activity"}
                  name={"Condition Craze"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(31)}
                  title={"4.7: Project"}
                  name={"The Elevator"}
                  points={"2000 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={3}
                  color={4}
                  complete={getComplete(32)}
                  title={"Unit 4 Test"}
                  name={"10 Questions"}
                  points={"1000 MP"}
                />
              </div>
              <Unit
                color={3}
                text={"Looping Around"}
                complete={getComplete(33)}
              />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={3}
                  complete={getComplete(33)}
                  title={"5.1: Lesson"}
                  name={"Looping Back"}
                  points={"300 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(34)}
                  title={"5.2: Lesson"}
                  name={"Iterating"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={3}
                  complete={getComplete(35)}
                  title={"5.2: Activity"}
                  name={"For each!"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(36)}
                  title={"5.3: Lesson"}
                  name={"Break!"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={3}
                  complete={getComplete(37)}
                  title={"5.3: Activity"}
                  name={"Stop or Go?"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(38)}
                  title={"5.4: Lesson"}
                  name={"Range Ranger"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={3}
                  complete={getComplete(39)}
                  title={"5.4: Activity"}
                  name={"The Infamous i"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(40)}
                  title={"5.4: Lesson"}
                  name={"Nesting"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={3}
                  complete={getComplete(41)}
                  title={"5.5: Activity"}
                  name={"Loop de Loops"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(42)}
                  title={"5.6: Project"}
                  name={"2D Structure"}
                  points={"2000 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={3}
                  color={3}
                  complete={getComplete(43)}
                  title={"Unit 5 Test"}
                  name={"10 Questions"}
                  points={"1000 MP"}
                />
              </div>
              <Unit
                color={2}
                text={"Fun with Functions"}
                complete={getComplete(44)}
              />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={2}
                  complete={getComplete(44)}
                  title={"6.1: Lesson"}
                  name={"In and Out"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={1}
                  color={2}
                  complete={getComplete(45)}
                  title={"6.1: Activity"}
                  name={"def do_this:"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(46)}
                  title={"6.2: Lesson"}
                  name={"Function body"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={2}
                  complete={getComplete(47)}
                  title={"6.2: Activity"}
                  name={"Passing through"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(48)}
                  title={"6.3: Lesson"}
                  name={"write_em_up()"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={3}
                  color={2}
                  complete={getComplete(49)}
                  title={"6.4: Project"}
                  name={"The Banker"}
                  points={"2000 MP"}
                />
              </div>
              <Unit
                color={1}
                text={"From the Top"}
                complete={getComplete(50)}
              />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={1}
                  complete={getComplete(50)}
                  title={"F.1: Lesson"}
                  name={"Review"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={1}
                  complete={getComplete(51)}
                  title={"F.2: Project"}
                  name={"Christmas"}
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

const SecondBlock = ({ layer, color, complete, title, name, points, link }) => {
  if (complete == 0) {
    link = "";
  }
  if (layer == 1) {
    return (
      <>
        <div className="connector"></div>
        <Link to={link}>
          <div className="lesson-block reduce-bottom">
            <Content
              color={color}
              title={title}
              complete={complete}
              name={name}
              points={points}
            />
          </div>
        </Link>
      </>
    );
  } else if (layer == 2) {
    return (
      <>
        <div className="connector higher"></div>
        <Link to={link}>
          <div className="lesson-block reduce-top reduce-bottom">
            <Content
              color={color}
              title={title}
              complete={complete}
              name={name}
              points={points}
            />
          </div>
        </Link>
      </>
    );
  } else if (layer == 3) {
    return (
      <>
        <div className="connector higher"></div>
        <Link to={link}>
          <div className="lesson-block reduce-top">
            <Content
              color={color}
              title={title}
              complete={complete}
              name={name}
              points={points}
            />
          </div>
        </Link>
      </>
    );
  }
  return (
    <>
      <div className="connector"></div>
      <Link to={link}>
        <div className="lesson-block">
          <Content
            color={color}
            title={title}
            complete={complete}
            name={name}
            points={points}
          />
        </div>
      </Link>
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
