import logo from "./logo.svg";
import "./Python.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Learn() {

  const [webdev, setWebdev] = useLocalStorage("webdev", []);

  const getComplete = (num) => {
    if (num < webdev[3]) {
      return 2;
    } else if (num > webdev[3]) {
      return 0;
    }
    return 1;
  };

  return (
    <>
      <div className="background">
        <div className="app-page-lessons">
          <div className="lessons-page-head webdev">
            <div className="lessons-header-text-div">
              <h2 className="lessons-header-name">
                Basics of Web Dev ({Math.ceil(webdev[1] / 48200 * 100)}%)
              </h2>
              <Link to="/">
                <h2 className="lessons-header-exit">✕</h2>
              </Link>
            </div>
            <div className="lessons-header-progress-back">
              <div
                style={{ width: ("calc(" + (webdev[1] / 48200) * 100).toString() + "% - 6px)" }}
                className="lessons-header-progress-front"
              ></div>
            </div>
          </div>
          <div className="lessons-desc">
            <h2 className="lessons-desc-header">What you'll learn</h2>
            <p className="lessons-desc-paragraph">
              ✔&nbsp;&nbsp;How to create and style web pages
            </p>
            <p className="lessons-desc-paragraph">
              ✔&nbsp;&nbsp;The connections between HTML and CSS
            </p>
            <p className="lessons-desc-paragraph">
              ✔&nbsp;&nbsp;UI/UX Design Principles
            </p>
            <div className="lessons-desc-divider"></div>
            <h2 className="lessons-desc-header lessons-progress">Progress</h2>
            <p className="lessons-desc-paragraph lessons-progress-stats">
              {webdev[1]} / 48200 MP&nbsp;&nbsp;•&nbsp;&nbsp;{webdev[3]} / 65
              Modules
            </p>
            <div className="next-lesson-button">
              <h2 className="lessons-desc-header">Next Lesson</h2>
            </div>
          </div>
          <div className="course-pathway">
            <div className="course-nodes">
              <Node color={1} complete={getComplete()} />
              <Connector color={1} type={0} complete={getComplete(0)} />
              <Connector color={1} type={1} complete={getComplete(1)} />
              <Connector color={1} type={1} complete={getComplete(3)} />
              <Connector color={1} type={1} complete={getComplete(4)} />
              <Connector color={1} type={1} complete={getComplete(6)} />
              <Connector color={1} type={1} complete={getComplete(8)} />
              <Connector color={1} type={1} complete={getComplete(10)} />
              <Connector color={1} type={1} complete={getComplete(12)} />
              <Connector color={1} type={1} complete={getComplete(14)} />
              <Connector color={1} type={1} complete={getComplete(16)} />
              <Connector color={1} type={1} complete={getComplete(17)} />
              <Connector color={1} type={1} complete={getComplete(18)} />
              <Node color={2} complete={getComplete(19)} />
              <Connector color={2} type={0} complete={getComplete(19)} />
              <Connector color={2} type={1} complete={getComplete(20)} />
              <Connector color={2} type={1} complete={getComplete(22)} />
              <Connector color={2} type={1} complete={getComplete(24)} />
              <Connector color={2} type={1} complete={getComplete(25)} />
              <Connector color={2} type={1} complete={getComplete(27)} />
              <Connector color={2} type={1} complete={getComplete(29)} />
              <Connector color={2} type={1} complete={getComplete(31)} />
              <Connector color={2} type={1} complete={getComplete(32)} />
              <Connector color={2} type={1} complete={getComplete(34)} />
              <Node color={3} complete={getComplete(34)} />
              <Connector color={3} type={0} complete={getComplete(35)} />
              <Connector color={3} type={1} complete={getComplete(36)} />
              <Connector color={3} type={1} complete={getComplete(38)} />
              <Connector color={3} type={1} complete={getComplete(40)} />
              <Connector color={3} type={1} complete={getComplete(42)} />
              <Connector color={3} type={1} complete={getComplete(44)} />
              <Connector color={3} type={1} complete={getComplete(45)} />
              <Connector color={3} type={1} complete={getComplete(47)} />
              <Connector color={3} type={1} complete={getComplete(49)} />
              <Connector color={3} type={1} complete={getComplete(51)} />
              <Connector color={3} type={1} complete={getComplete(52)} />
              <Node color={4} complete={getComplete(52)} />
              <Connector color={4} type={0} complete={getComplete(53)} />
              <Connector color={4} type={1} complete={getComplete(54)} />
              <Connector color={4} type={1} complete={getComplete(56)} />
              <Connector color={4} type={1} complete={getComplete(58)} />
              <Connector color={4} type={1} complete={getComplete(59)} />
              <Connector color={4} type={1} complete={getComplete(61)} />
              <Node color={3} complete={getComplete(62)} />
              <Connector color={3} type={0} complete={getComplete(62)} />
              <Connector color={3} type={1} complete={getComplete(63)} />
              <Connector color={3} type={1} complete={getComplete(64)} />
              <Node color={3} complete={getComplete(65)} />
            </div>
            <div className="lesson-blocks">
              <Unit color={1} text={"Hello, HTML and HTML5!"} />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={1}
                  complete={getComplete(0)}
                  title={"1.1: Lesson"}
                  name={"Static Sites"}
                  points={"300 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={1}
                  complete={getComplete(1)}
                  title={"1.2: Lesson"}
                  name={"Tackling Text"}
                  points={"500 MP"}
                  link={""}
                />
                <SecondBlock
                  layer={2}
                  color={1}
                  complete={getComplete(2)}
                  title={"1.1: Activity"}
                  name={"Header Heist"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={1}
                  complete={getComplete(3)}
                  title={"1.3: Lesson"}
                  name={"Comment Out"}
                  points={"300 MP"}
                  link={""}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={1}
                  complete={getComplete(4)}
                  title={"1.4: Lesson"}
                  name={"Picture This"}
                  points={"500 MP"}
                  link={""}
                />
                <SecondBlock
                  layer={2}
                  color={1}
                  complete={getComplete(5)}
                  title={"1.4: Activity"}
                  name={"Image Insanity"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={1}
                  complete={getComplete(6)}
                  title={"1.5: Lesson"}
                  name={"Let's Link!"}
                  points={"500 MP"}
                  link={""}
                />
                <SecondBlock
                  layer={2}
                  color={1}
                  complete={getComplete(7)}
                  title={"1.5: Activity"}
                  name={"Anchor Around"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={1}
                  complete={getComplete(8)}
                  title={"1.6: Lesson"}
                  name={"List it out!"}
                  points={"500 MP"}
                  link={""}
                />
                <SecondBlock
                  layer={2}
                  color={1}
                  complete={getComplete(9)}
                  title={"1.6: Activity"}
                  name={"Shopping Spree"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={1}
                  complete={getComplete(10)}
                  title={"1.7: Lesson"}
                  name={"Fields & Forms"}
                  points={"500 MP"}
                  link={""}
                />
                <SecondBlock
                  layer={2}
                  color={1}
                  complete={getComplete(11)}
                  title={"1.7: Activity"}
                  name={"Any Input?"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={1}
                  complete={getComplete(12)}
                  title={"1.8: Lesson"}
                  name={"Buttons & Boxes"}
                  points={"500 MP"}
                  link={""}
                />
                <SecondBlock
                  layer={2}
                  color={1}
                  complete={getComplete(13)}
                  title={"1.8: Activity"}
                  name={"Vivid Values"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={1}
                  complete={getComplete(14)}
                  title={"1.9: Lesson"}
                  name={"Dandy Divs"}
                  points={"500 MP"}
                  link={""}
                />
                <SecondBlock
                  layer={2}
                  color={1}
                  complete={getComplete(15)}
                  title={"1.9: Activity"}
                  name={"Nest 'em Up"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={1}
                  complete={getComplete(16)}
                  title={"1.10: Lesson"}
                  name={"Daring Docs"}
                  points={"500 MP"}
                  link={""}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={1}
                  complete={getComplete(17)}
                  title={"1.11: Project"}
                  name={"Dog Survey"}
                  points={"2000 MP"}
                  link={""}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={3}
                  color={1}
                  complete={getComplete(18)}
                  title={"Unit 1 Test"}
                  name={"15 Questions"}
                  points={"1500 MP"}
                  link={""}
                />
              </div>
              <Unit color={2} text={"Super CSS"} complete={getComplete(19)} />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={2}
                  complete={getComplete(19)}
                  title={"2.1: Lesson"}
                  name={"In Style"}
                  points={"300 MP"}
                />
                {/* <SecondBlock layer={1} /> */}
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(20)}
                  title={"2.2: Lesson"}
                  name={"Get Classy"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={2}
                  complete={getComplete(21)}
                  title={"2.2: Activity"}
                  name={"Select Them!"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(22)}
                  title={"2.3: Lesson"}
                  name={"Fun with Fonts"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={2}
                  complete={getComplete(23)}
                  title={"2.3: Activity"}
                  name={"Type Attack"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(24)}
                  title={"2.4: Lesson"}
                  name={"Image Sizing"}
                  points={"300 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(25)}
                  title={"2.5: Lesson"}
                  name={"Border Up"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={2}
                  complete={getComplete(26)}
                  title={"2.5: Activity"}
                  name={"Sidewinders"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(27)}
                  title={"2.6: Lesson"}
                  name={"Show Some ID"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={2}
                  complete={getComplete(28)}
                  title={"2.6: Activity"}
                  name={"Tag, You're It!"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(29)}
                  title={"2.6: Lesson"}
                  name={"Margin Mayhem"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={2}
                  complete={getComplete(30)}
                  title={"2.6: Activity"}
                  name={"Element Escape"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(31)}
                  title={"2.7: Lesson"}
                  name={"Overide!"}
                  points={"300 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={2}
                  complete={getComplete(32)}
                  title={"2.8: Lesson"}
                  name={"Colors!"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={2}
                  complete={getComplete(33)}
                  title={"2.6: Activity"}
                  name={"RGB to Hex"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={3}
                  color={2}
                  complete={getComplete(34)}
                  title={"2.9: Project"}
                  name={"Food Truck"}
                  points={"2000 MP"}
                />
              </div>
              <Unit
                color={3}
                text={"Vivid Visuals"}
                complete={getComplete(35)}
              />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={3}
                  complete={getComplete(35)}
                  title={"3.1: Lesson"}
                  name={"All Aligned"}
                  points={"300 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(36)}
                  title={"3.2: Lesson"}
                  name={"New Dimensions"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={3}
                  complete={getComplete(37)}
                  title={"3.2: Activity"}
                  name={"Size Them Up!"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(38)}
                  title={"3.3: Lesson"}
                  name={"Tacky Text"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={3}
                  complete={getComplete(39)}
                  title={"3.3: Activity"}
                  name={"Emphasize It!"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(40)}
                  title={"3.4: Lesson"}
                  name={"The Backdrop"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={3}
                  complete={getComplete(41)}
                  title={"3.4: Activity"}
                  name={"In and Out!"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(42)}
                  title={"3.5: Lesson"}
                  name={"Elemental Style"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={3}
                  complete={getComplete(43)}
                  title={"3.5: Activity"}
                  name={"Apply All!"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(44)}
                  title={"3.6: Lesson"}
                  name={"Hover Hacks"}
                  points={"300 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(45)}
                  title={"3.7: Lesson"}
                  name={"Positioning"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={3}
                  complete={getComplete(46)}
                  title={"3.7: Activity"}
                  name={"Move It Move It"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(47)}
                  title={"3.8: Lesson"}
                  name={"More Colors!"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={3}
                  complete={getComplete(48)}
                  title={"3.8: Activity"}
                  name={"Saturate it!"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(49)}
                  title={"3.9: Lesson"}
                  name={"Animation"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={3}
                  complete={getComplete(50)}
                  title={"3.9: Activity"}
                  name={"Keep Shifting"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(51)}
                  title={"3.10: Project"}
                  name={"Heartbeat"}
                  points={"2000 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={3}
                  color={3}
                  complete={getComplete(52)}
                  title={"Unit 3 Quiz"}
                  name={"5 Questions"}
                  points={"500 MP"}
                />
              </div>
              <Unit color={4} text={"Box 'em Up"} complete={getComplete(53)} />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={4}
                  complete={getComplete(53)}
                  title={"4.1: Lesson"}
                  name={"Flexing"}
                  points={"300 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(54)}
                  title={"4.2: Lesson"}
                  name={"Flex Rows"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={4}
                  complete={getComplete(55)}
                  title={"4.2: Activity"}
                  name={"Line Up!"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(56)}
                  title={"4.3: Lesson"}
                  name={"Flex Columns"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={4}
                  complete={getComplete(57)}
                  title={"4.3: Activity"}
                  name={"Stand Up!"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(58)}
                  title={"4.4: Lesson"}
                  name={"Grids"}
                  points={"300 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={4}
                  complete={getComplete(59)}
                  title={"4.5: Lesson"}
                  name={"Shape the Grid"}
                  points={"500 MP"}
                />
                <SecondBlock
                  layer={2}
                  color={4}
                  complete={getComplete(60)}
                  title={"4.5: Activity"}
                  name={"Off the Grid"}
                  points={"500 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={3}
                  color={4}
                  complete={getComplete(61)}
                  title={"4.6: Project"}
                  name={"Tic Tac Toe"}
                  points={"2000 MP"}
                />
              </div>
              <Unit color={3} text={"Wrapping Up"} complete={getComplete(62)} />
              <div className="lesson-flexbox">
                <Block
                  layer={1}
                  color={3}
                  complete={getComplete(62)}
                  title={"F.1: Project"}
                  name={"Dog Park"}
                  points={"3000 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={2}
                  color={3}
                  complete={getComplete(63)}
                  title={"F.2: Project"}
                  name={"Grocery Store"}
                  points={"4000 MP"}
                />
              </div>
              <div className="lesson-flexbox">
                <Block
                  layer={3}
                  color={3}
                  complete={getComplete(64)}
                  title={"F.3: Project"}
                  name={"Portfolios"}
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
          <Content color={color} complete={complete} title={title} name={name} points={points} />
        </div>
      </Link>
    );
  } else if (layer == 2) {
    return (
      <div className="lesson-block reduce-top  reduce-bottom">
        <Content color={color} complete={complete} title={title} name={name} points={points} />
      </div>
    );
  } else if (layer == 3) {
    return (
      <Link to={link}>
        <div className="lesson-block reduce-top">
          <Content color={color} complete={complete} title={title} name={name} points={points} />
        </div>
      </Link>
    );
  }
  return (
    <Link to={link}>
      <div className="lesson-block">
        <Content color={color} complete={complete} title={title} name={name} points={points} />
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
  if (complete == 2){
    img = "complete-" + color.toString() + ".png"
  } else if (complete == 1){
    img = "current-" + color.toString() + ".png"
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
          <Content color={color} title={title} complete={complete} name={name} points={points} />
        </div>
      </>
    );
  } else if (layer == 2) {
    return (
      <>
        <div className="connector higher"></div>
        <div className="lesson-block reduce-top reduce-bottom">
          <Content color={color} title={title} complete={complete} name={name} points={points} />
        </div>
      </>
    );
  } else if (layer == 3) {
    return (
      <>
        <div className="connector higher"></div>
        <div className="lesson-block reduce-top">
          <Content color={color} title={title} complete={complete} name={name} points={points} />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="connector"></div>
      <div className="lesson-block">
        <Content color={color} title={title} complete={complete} name={name} points={points} />
      </div>
    </>
  );
};

const Node = ({ color, complete }) => {
  if (complete == 0){
    return <img src="node-0.png"></img>
  }
  return <img src={"node-" + color.toString() + ".png"} />;
};

const Connector = ({ color, type, complete }) => {
  let ending = ".png"
  if (type == 1){
    ending = "-s" + ending;
  }
  if (complete == 0) {
    return <img src={"connector-0" + ending} />;
  }
  return <img src={"connector-" + color.toString() + ending} />;
};

const Unit = ({ color, text,complete }) => {
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
  if (complete == 0){
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
