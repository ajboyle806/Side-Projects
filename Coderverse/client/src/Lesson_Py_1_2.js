import logo from "./logo.svg";
import "./Python.css";
import "./Lessons.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Select from "react-select";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Learn() {
  let [python, setPython] = useLocalStorage("python", []);
  const [user, setUser] = useLocalStorage("user", []);
  const [weeklyData, setWeeklyData] = useLocalStorage("weekly_data", []);

  const [passphrase, setPassphrase] = useState("");
  const [passphraseText, setPassphraseText] = useState("");
  const [passphrase2, setPassphrase2] = useState("");
  const [passphraseText2, setPassphraseText2] = useState("");

  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const retrieve = async () => {
      await fetch("/get_user_post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user[1] }),
      });
      await fetch("/get_user").then((response) =>
        response.json().then((data) => {
          setUser([...data[0]]);
        })
      );
      await fetch("/get_python").then((response) =>
        response.json().then((data) => {
          setPython([...data[0]]);
        })
      );
    };
    retrieve();
  }, []);

  const getPage = (num) => {
    if (num <= python[4]["1.2l"]["pages_complete"]) {
      return true;
    }
    return false;
  };

  const [two, setTwo] = useState(getPage(1));
  const [three, setThree] = useState(getPage(2));
  const [four, setFour] = useState(getPage(3));
  const [five, setFive] = useState(getPage(4));
  const [complete, setComplete] = useState(false);

  const unlocked = { 2: two, 3: three, 4: four, 5: five };

  const [oneStyles, setOneStyles] = useState({});
  const [twoStyles, setTwoStyles] = useState({ display: "none" });
  const [threeStyles, setThreeStyles] = useState({ display: "none" });
  const [fourStyles, setFourStyles] = useState({ display: "none" });
  const [fiveStyles, setFiveStyles] = useState({ display: "none" });
  const [popupStyles, setPopupStyles] = useState({ display: "none" });

  const [progress, setProgress] = useState({ width: "calc(0% - 6px)" });

  const [trueOrFalseText, setTrueOrFalseText] = useState("");
  const [trueStyles, setTrueStyles] = useState({});
  const [falseStyles, setFalseStyles] = useState({});

  const clickTrue = async () => {
    if (!three) {
      setTrueStyles({
        backgroundColor: "#f2ebeb",
        boxShadow: "none",
        borderStyle: "solid",
        borderColor: "#f37b84",
        borderWidth: "1px",
        color: "#b66268",
      });
      await delay(100);
      setTrueOrFalseText("Hint: Can a program be unordered?");
    }
  };

  const clickFalse = async () => {
    setFalseStyles({
      backgroundColor: "rgb(227, 214, 248)",
      boxShadow: "none",
      borderStyle: "solid",
      borderColor: "#4c2fb4",
      color: "#4c2fb4",
      borderWidth: "1px",
    });
    setTrueStyles({});
    if (python[4]["1.2l"]["pages_complete"] == 1) {
      python[4]["1.2l"]["pages_complete"]++;
    }
    setPython([...python]);
    setThree(getPage(2));
    fetch("/updatePython", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([user[0], { ...python[4] }]),
    });
    await delay(100);
    setTrueOrFalseText("False is correct, programs must have ordered steps!");
  };

  const [amandaStyle, setAmandaStyle] = useState({});

  const getPageThreeImage = () => {
    if (!four) {
      return "amanda-1.2.2.png";
    }
    return "amanda-1.2.3.png";
  };

  const navStyling = (num) => {
    if (current == num) {
      return { backgroundColor: "#f37b8488" };
    }
    if (num == 1) {
      return { backgroundColor: "#f37b8400" };
    }
    if (num == 0) {
      if (current == 1) {
        return { opacity: 0.3 };
      }
      return {};
    }
    if (num == 6) {
      if (
        current == 5 ||
        (current == 1 && !two) ||
        (current == 2 && !three) ||
        (current == 3 && !four) ||
        (current == 4 && !five)
      ) {
        return { opacity: 0.3 };
      }
      return {};
    }
    if (!unlocked[num]) {
      return { backgroundColor: "#d1d0d9CC" };
    }
    return { backgroundColor: "#f37b8400" };
  };

  const onChange = (e) => {
    e.preventDefault();
    setPassphrase(e.target.value);
    if (e.target.value.toLowerCase() == "determined") {
      if (python[4]["1.2l"]["pages_complete"] == 0) {
        python[4]["1.2l"]["pages_complete"]++;
      }
      setPython([...python]);
      setPassphraseText("You got it, move on!");
      setTwo(getPage(1));
      fetch("/update_python", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user[0], modules: { ...python[4] } }),
      });
    } else {
      if (!two) {
        setPassphraseText("Keep trying!");
      }
    }
  };

  const onChange2 = async (e) => {
    e.preventDefault();
    if (
      e.target.value.toLowerCase()[e.target.value.length - 1] == "a" ||
      e.target.value.toLowerCase()[e.target.value.length - 1] == "b" ||
      e.target.value.toLowerCase()[e.target.value.length - 1] == "c" ||
      e.target.value.toLowerCase()[e.target.value.length - 1] == undefined
    ) {
      setPassphrase2(e.target.value);
      if (e.target.value.toLowerCase() == "cab") {
        if (python[4]["1.2l"]["pages_complete"] == 2) {
          python[4]["1.2l"]["pages_complete"]++;
        }
        setPython([...python]);
        setFour(getPage(3));
        fetch("/updatePython", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(python),
        });
        setPassphraseText2("You got it, move on!");
        await delay(300);
        setAmandaStyle({ marginLeft: "-20rem", opacity: 0 });
      } else {
        if (!four) {
          setPassphraseText2("Keep trying!");
        }
      }
    }
  };

  const leftArrow = async () => {
    if (current == 2) {
      unmount(setTwoStyles);
      mount(setOneStyles);
      setCurrent(current - 1);
    } else if (current == 3) {
      unmount(setThreeStyles);
      mount(setTwoStyles);
      setCurrent(current - 1);
    } else if (current == 4) {
      unmount(setFourStyles);
      mount(setThreeStyles);
      setCurrent(current - 1);
    } else if (current == 5) {
      unmount(setFiveStyles);
      mount(setFourStyles);
      setCurrent(current - 1);
      setPopupStyles({ display: "none" });
    }
  };

  const rightArrow = async () => {
    if (current == 1 && two) {
      unmount(setOneStyles);
      if (progress["width"] == "calc(0% - 6px)") {
        setProgress({ width: "calc(20% - 6px)" });
      }
      mount(setTwoStyles);
      setCurrent(current + 1);
    } else if (current == 2 && three) {
      unmount(setTwoStyles);
      if (progress["width"] == "calc(20% - 6px)") {
        setProgress({ width: "calc(40% - 6px)" });
      }
      mount(setThreeStyles);
      setCurrent(current + 1);
    } else if (current == 3 && four) {
      unmount(setThreeStyles);
      if (progress["width"] == "calc(40% - 6px)") {
        setProgress({ width: "calc(60% - 6px)" });
      }
      mount(setFourStyles);
      setCurrent(current + 1);
    } else if (current == 4 && five) {
      unmount(setFourStyles);
      if (progress["width"] == "calc(60% - 6px)") {
        setProgress({ width: "calc(80% - 6px)" });
      }
      mount(setFiveStyles);
      setCurrent(current + 1);
    }
  };

  const unmount = async (setStyles) => {
    setStyles({ opacity: 0 });
    await delay(300);
    setStyles({ display: "none" });
  };

  const mount = async (setStyles) => {
    await delay(300);
    setStyles({ opacity: 0 });
    await delay(50);
    setStyles({ opacity: 1 });
  };

  const dropdownOptions = [
    { value: 1, label: 'print("Hello, World!")' },
    { value: 2, label: "print(42)" },
    { value: 3, label: "print(Hello, World!)" },
  ];

  const [dropdownCurrent, setDropdownCurrent] = useState({
    value: 1,
    label: 'print("Hello, World!")',
  });

  const handleDropdownChange = (selectedOption) => {
    setDropdownCurrent(selectedOption);
  };

  const [compilerText, setCompilerText] = useState("");
  const [compilerStyle, setCompilerStyle] = useState({});
  const [compilerNotes, setCompilerNotes] = useState("");
  const [compiledOne, setCompiledOne] = useState(false);
  const [compiledTwo, setCompiledTwo] = useState(false);
  const [compiledThree, setCompiledThree] = useState(false);

  const compile = () => {
    if (dropdownCurrent["value"] == 1) {
      setCompilerText("Hello, World");
      setCompilerStyle({});
      setCompilerNotes(
        "Here, the text is properly inserted into the parenthesis in quotation marks so the code compiles correctly!"
      );
      setCompiledOne(true);
      if (compiledTwo && compiledThree) {
        if (python[4]["1.2l"]["pages_complete"] == 2) {
          python[4]["1.2l"]["pages_complete"]++;
        }
        setPython([...python]);
        setFive(getPage(4));
        fetch("/updatePython", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(python),
        });
      }
    } else if (dropdownCurrent["value"] == 2) {
      setCompilerText(42);
      setCompilerStyle({});
      setCompilerNotes(
        "Here, the number properly inserted into the parenthesis so the code compiles correctly!"
      );
      setCompiledTwo(true);
      if (compiledOne && compiledThree) {
        if (python[4]["1.2l"]["pages_complete"] == 3) {
          python[4]["1.2l"]["pages_complete"]++;
        }
        setPython([...python]);
        setFive(getPage(4));
        fetch("/updatePython", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(python),
        });
      }
    } else {
      setCompilerText(
        'File "main.py", line 1 print(Hello, World!)\nSyntaxError: invalid syntax'
      );
      setCompilerStyle({ color: "#cb5159" });
      setCompilerNotes(
        "Here, the text is not put in quotation marks, so the code does not compile!"
      );
      setCompiledThree(true);
      if (compiledOne && compiledTwo) {
        if (python[4]["1.2l"]["pages_complete"] == 3) {
          python[4]["1.2l"]["pages_complete"]++;
        }
        setPython([...python]);
        setFive(getPage(4));
        fetch("/updatePython", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(python),
        });
      }
    }
  };

  const [codeInput, setCodeInput] = useState("");
  const [compilerText2, setCompilerText2] = useState("");
  const [compilerText2a, setCompilerText2a] = useState("");
  const [compilerText2b, setCompilerText2b] = useState("");
  const [compilerStyle2, setCompilerStyle2] = useState({});

  const onChangeCodeInput = (e) => {
    e.preventDefault();
    setCodeInput(e.target.value);
  };

  const compileCode = async () => {
    if (codeInput == "") {
      setCompilerText2("");
      setCompilerText2a("");
      setCompilerText2b("");
      setCompilerStyle2({});
    } else if (
      codeInput.substring(0, 6) == "print(" &&
      codeInput.substring(codeInput.length - 1) == ")"
    ) {
      if (
        codeInput.substring(6, 7) == '"' &&
        codeInput.substring(codeInput.length - 2, codeInput.length - 1) == '"'
      ) {
        if (!/["]/.test(codeInput.substring(7, codeInput.length - 2))) {
          setCompilerText2(codeInput.substring(7, codeInput.length - 2));
          setCompilerText2a("");
          setCompilerText2b("");
          setCompilerStyle2({});
          if (codeInput.substring(7, codeInput.length - 2) == "Hello, World!") {
            setProgress({ width: "calc(100% - 6px)" });
            await delay(300);
            setFiveStyles({ opacity: 0.25 });
            setComplete(true);
            mount(setPopupStyles);
          }
        } else {
          setCompilerText2('File "main.py", line 1');
          setCompilerText2a(codeInput);
          setCompilerText2b("SyntaxError: invalid syntax");
          setCompilerStyle2({ color: "#cb5159" });
        }
      } else {
        if (/^\d+$/.test(codeInput.substring(7, codeInput.length - 2))) {
          setCompilerText2(codeInput.substring(7, codeInput.length - 2));
          setCompilerText2a("");
          setCompilerText2b("");
          setCompilerStyle2({});
        } else {
          setCompilerText2('File "main.py", line 1');
          setCompilerText2a(codeInput);
          setCompilerText2b("SyntaxError: invalid syntax");
          setCompilerStyle2({ color: "#cb5159" });
        }
      }
    } else {
      setCompilerText2('File "main.py", line 1');
      setCompilerText2a(codeInput);
      setCompilerText2b("SyntaxError: invalid syntax");
      setCompilerStyle2({ color: "#cb5159" });
    }
  };

  const add_digit = (str) => {
    if (str.length == 1) {
      return "0" + str;
    }
    return str;
  };

  const getWeeklyPoints = () => {
    let sum = 0;
    const today = new Date();
    if (user[8] != undefined) {
      Object.keys(user[8]).forEach((key) => {
        console.log(key);
        let date = new Date(key);
        if (
          (today.getTime() - date.getTime()) / (1000 * 3600 * 24) <=
          today.getDay()
        ) {
          sum += user[8][key];
        }
      });
    }
    return sum;
  };

  const complete_module = async () => {
    python[4]["1.2l"]["complete"] = false;
    if (python[4]["1.2l"]["complete"] == false) {
      python[3]++;
    }
    python[4]["1.2l"]["complete"] = true;
    python[1] += points;
    python[1] += streakBonus(points);
    user[13] += points;
    user[13] += streakBonus(points);
    let today = new Date();
    if (
      Object.keys(user[8]).includes(
        today.getFullYear() +
          "-" +
          add_digit((today.getMonth() + 1).toString()) +
          "-" +
          add_digit(today.getDate())
      )
    ) {
      user[8][
        today.getFullYear() +
          "-" +
          add_digit((today.getMonth() + 1).toString()) +
          "-" +
          add_digit(today.getDate())
      ] += points + streakBonus(points);
    } else {
      user[8][
        today.getFullYear() +
          "-" +
          add_digit((today.getMonth() + 1).toString()) +
          "-" +
          add_digit(today.getDate())
      ] = points + streakBonus(points);
      user[11] += 1;
      if (user[11] > user[12]) {
        user[12] = user[11];
      }
    }
    setPython([...python]);
    setUser([...user]);
    fetch("/update_python_final", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user[0],
        points: python[1],
        modules: { ...python[4] },
        current: python[3],
      }),
    });
    fetch("/update_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user[0],
        daysActive: user[8],
        streak: user[11],
        maxStreak: user[12],
        points: user[13],
      }),
    });
    await fetch("/update_rankings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user[0],
        total: user[13],
        weekly: getWeeklyPoints(),
      }),
    });
    await fetch("/get_weekly_ranks").then((response) =>
      response.json().then((data) => {
        setWeeklyData([...data]);
      })
    );
  };

  const getPoints = () => {
    if (python[4]["1.2l"]["complete"] == false) {
      return 500;
    } else {
      return 0;
    }
  };

  const [points, setPoints] = useState(getPoints);

  const streakBonus = (points) => {
    if (user[11] < 10) {
      return (points * user[11]) / 10;
    }
    return points;
  };

  return (
    <>
      <div className="background">
        <div className="app-page-lessons">
          <div style={popupStyles}>
            <div className="complete-lesson">
              <h2>1.2: Lesson Complete</h2>
              <div className="complete-bar"></div>
              <div className="flex-text">
                <p>Lesson Complete</p>
                <p className="align-right">{points} MP</p>
              </div>
              <div className="flex-text">
                <p>{user[11]} Day Streak Bonus</p>
                <p className="align-right">{streakBonus(points)} MP</p>
              </div>
              <div className="complete-bar"></div>
              <div className="flex-text">
                <p>Total</p>
                <p className="align-right">{points + streakBonus(points)} MP</p>
              </div>
              <Link to="/python">
                <div
                  className="complete-button"
                  onClick={() => {
                    complete_module();
                  }}
                >
                  <h2>Finish</h2>
                </div>
              </Link>
            </div>
          </div>
          <div className="lessons-page-head python">
            <div className="lessons-header-text-div">
              <h2 className="lessons-header-name">1.2: Lesson - Programs!</h2>
              <Link to="/python">
                <h2 className="lessons-header-exit">✕</h2>
              </Link>
            </div>
            <div className="lessons-header-progress-back">
              <div
                className="lessons-header-progress-front"
                style={progress}
              ></div>
            </div>
          </div>
          <div className="lesson-content">
            <div style={oneStyles}>
              <h2 className="lesson-header">What is a program?</h2>
              <p className="lesson-paragraph">
                Before we jump into Python programming, we need to talk about
                what a <b style={{ color: "#7b60bd" }}>program</b> actually is.
              </p>
              <p className="lesson-paragraph">
                Let's see what Amanda has to say!
              </p>
              <img
                src="amanda-1.2.1.png"
                alt=""
                style={{ width: "90%", marginLeft: "1re" }}
              />
              <p className="lesson-paragraph">
                Thanks Amanda, that's absolutely correct! To elaborate,{" "}
                <b>computer programs</b> must be:
              </p>
              <p className="larger-margin">
                &nbsp;&nbsp;&nbsp;1.&nbsp;&nbsp;&nbsp;<b>Dividable</b>
              </p>
              <p className="list-paragraph">
                &nbsp;&nbsp;&nbsp;2.&nbsp;&nbsp;&nbsp;<b>Ordered</b>
              </p>
              <p className="list-paragraph">
                &nbsp;&nbsp;&nbsp;3.&nbsp;&nbsp;&nbsp;<b>Determined</b>
              </p>
              <p className="list-paragraph">
                &nbsp;&nbsp;&nbsp;4.&nbsp;&nbsp;&nbsp;<b>Repeatable</b>
              </p>
              <p className="larger-margin">
                To continue, you need to enter the password! As a hint, its one
                of the four traits above!
              </p>
              <div className="input-container-outer">
                <div className="input-container">
                  <input
                    type="text"
                    value={passphrase}
                    onChange={(e) => onChange(e)}
                    placeholder="Password"
                  />
                </div>
                <p style={{ marginTop: "1.375rem" }}>{passphraseText}</p>
              </div>
            </div>
            <div style={twoStyles}>
              <h2 className="lesson-header">Traits of programs</h2>
              <p className="lesson-paragraph">
                Great to see you were <b>determined</b> enough to make it here!
                Now, let's look closer into what the four traits of a program
                really are!
              </p>
              <div className="def-divs">
                <div className="swiper-div">
                  <h2>Dividable</h2>
                  <p>The program can be divided into multiple steps</p>
                </div>
                <div className="swiper-div">
                  <h2>Ordered</h2>
                  <p>The program properly orders these steps</p>
                </div>
                <div className="swiper-div">
                  <h2>Determined</h2>
                  <p>The result of the steps' execution can be found</p>
                </div>
                <div className="swiper-div">
                  <h2>Repeatable</h2>
                  <p>When run again, the result should be the same</p>
                </div>
              </div>
              {/* Be sure to swipe left to see everything!
              <Swiper
                spaceBetween={24}
                slidesPerView={2}
                className="swiper-1-2"
              >
                <SwiperSlide>
                  <div className="swiper-div">
                    <h2>Dividable</h2>
                    <p>The program can be divided into multiple steps</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-div">
                    <h2>Ordered</h2>
                    <p>The program properly orders these steps</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-div">
                    <h2>Determined</h2>
                    <p>The result of the steps' execution can be found</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-div">
                    <h2>Repeatable</h2>
                    <p>When run again, the result should be the same</p>
                  </div>
                </SwiperSlide>
              </Swiper> */}
              <p className="lesson-paragraph">
                Did you realize that as you were trying to find the password,
                you were acting much like a computer program does? If you think
                about it, you executed <b>repeatable, ordered, steps</b> until
                achieving the result of getting to this page!
              </p>
              <p>
                <b style={{ color: "#382b65" }}>True or false: </b>A program is
                a set of unordered steps used to achieve a goal.{" "}
                <i style={{ opacity: 0.8 }}>{trueOrFalseText}</i>
              </p>
              <div style={{ display: "flex" }}>
                <div
                  className="t_or_f"
                  style={trueStyles}
                  onClick={() => {
                    clickTrue();
                  }}
                >
                  <h2>True</h2>
                </div>
                <div
                  className="t_or_f"
                  style={{ ...falseStyles, marginLeft: "1rem" }}
                  onClick={() => {
                    clickFalse();
                  }}
                >
                  <h2>False</h2>
                </div>
              </div>
            </div>
            <div style={threeStyles}>
              <h2 className="lesson-header margin-top">Your first program</h2>
              <p>
                Now, lets say you're writing a program to get Amanda to a new
                planet with the following functions:
              </p>
              <p className="">&nbsp;&nbsp;&nbsp;A. fly_to_destination()</p>
              <p className="list-paragraph">
                &nbsp;&nbsp;&nbsp;B. land_rocket()
              </p>
              <p className="list-paragraph">
                &nbsp;&nbsp;&nbsp;C. launch_rocket()
              </p>
              <p className="lesson-paragraph"></p>
              <p className="list-paragraph">
                Order the functions properly to make a program! The new passcode
                is the ordered letters with no spaces.
              </p>
              <div className="input-container-outer">
                <div className="input-container">
                  <input
                    type="text"
                    value={passphrase2}
                    onChange={(e) => onChange2(e)}
                    placeholder="Password"
                  />
                </div>
                <p style={{ marginTop: "1.375rem" }}>{passphraseText2}</p>
              </div>
              <img
                src={getPageThreeImage()}
                alt=""
                className="pageThreeImage"
                style={amandaStyle}
              />
            </div>
            <div style={fourStyles}>
              <h2 className="lesson-header margin-top">
                Your first Python program
              </h2>
              <p>
                That was fun and all, but why are you here? To learn Python!
              </p>
              <p>
                In order to make your first Python program, you're going to use
                Python's <b>print function</b>! Python's print function displays
                the variables, text, or numbers passed into it in the{" "}
                <b>console</b>.
              </p>
              <p>
                For now, you just need to know you can call the print function
                by writing <b>print()</b> and putting text in quotes or a number
                in the parenthesis. Try running the three examples below!
              </p>
              <div className="dropdown-holder">
                <Select
                  className="dropdown"
                  options={dropdownOptions}
                  onChange={handleDropdownChange}
                  defaultValue={dropdownCurrent}
                ></Select>
                <div
                  className="compile-button"
                  onClick={() => {
                    compile();
                  }}
                >
                  <h2>Compile</h2>
                </div>
              </div>
              <div className="compiler">
                <p style={{ ...compilerStyle, width: "20rem" }}>
                  {compilerText}
                </p>
              </div>
              <p>{compilerNotes}</p>
              <p></p>
            </div>
            <div style={fiveStyles}>
              <h2 className="lesson-header margin-top">
                print("Let's Review!")
              </h2>
              <p>
                Great job making it this far into the lesson! Let's do a little
                bit of review!
              </p>
              <p>
                First, Amanda taught us that a <b>computer program</b> is a set
                of ordered steps used to achieve a specific goal.
              </p>
              <p>
                Then, we learned that computer programs must be <b>dividable</b>
                , <b>ordered</b>, <b>determined</b>, and <b>repeatable</b>.
              </p>
              <p>
                Finally, we dived a little bit into Python, talking about the{" "}
                <b>print function</b>, which allows us to:
                <p>
                  &nbsp;&nbsp;&nbsp;1.&nbsp;&nbsp;&nbsp;Print text enclosed in
                  quotation marks
                </p>
                <p className="list-paragraph">
                  &nbsp;&nbsp;&nbsp;2.&nbsp;&nbsp;&nbsp;Print numbers
                </p>
                <p className="list-paragraph">
                  &nbsp;&nbsp;&nbsp;3.&nbsp;&nbsp;&nbsp;Print variables (More on
                  that later!)
                </p>
                <p>
                  Your final challenge is to write a code snippet that prints{" "}
                  <b>Hello, World!</b> Refer back to page 4 if needed.
                </p>
              </p>
              <div className="code-input-holder">
                <div className="code-input-container">
                  <input
                    type="text"
                    value={codeInput}
                    onChange={(e) => onChangeCodeInput(e)}
                    placeholder=""
                  />
                </div>
                <div
                  className="compile-button"
                  onClick={() => {
                    compileCode();
                  }}
                >
                  <h2>Compile</h2>
                </div>
              </div>
              <div className="compiler">
                <p style={compilerStyle2}>
                  {compilerText2}
                  <br></br>
                  {compilerText2a}
                  <br></br>
                  {compilerText2b}
                </p>
              </div>
            </div>
          </div>
          <div className="navbar">
            <div className="lesson-nav">
              <div
                className="nav-box arrow-box"
                style={navStyling(0)}
                onClick={() => {
                  if (current != 1) {
                    leftArrow();
                  }
                }}
              >
                <h2>◀</h2>
              </div>
              <div className="nav-box" style={navStyling(1)}>
                <h2>1</h2>
              </div>
              <div className="nav-box" style={navStyling(2)}>
                <h2>2</h2>
              </div>
              <div className="nav-box" style={navStyling(3)}>
                <h2>3</h2>
              </div>
              <div className="nav-box" style={navStyling(4)}>
                <h2>4</h2>
              </div>
              <div className="nav-box" style={navStyling(5)}>
                <h2>5</h2>
              </div>
              <div
                className="nav-box arrow-box"
                style={navStyling(6)}
                onClick={() => {
                  rightArrow();
                }}
              >
                <h2>▶</h2>
              </div>
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
