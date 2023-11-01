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

const randomCompliment = () => {
  return [
    "Great job!",
    "Nice work!",
    "You got it!",
    "Eureka!",
    "Wow!",
    "Well Played!",
    "Knowledge is power",
    "You rock!",
    "Legendary!",
    "Perfect!",
  ][Math.floor(Math.random() * 10)];
};
const randomEncouragement = () => {
  return [
    "Dust yourself off!",
    "Greatness awaits",
    "Keep at it!",
    "Don't give up!",
  ][Math.floor(Math.random() * 4)];
};

function Learn() {
  let [python, setPython] = useLocalStorage("python", []);
  const [user, setUser] = useLocalStorage("user", []);
  const [weeklyData, setWeeklyData] = useLocalStorage("weekly_data", []);

  const [passphrase, setPassphrase] = useState("");
  const [passphraseText, setPassphraseText] = useState("");
  const [passphrase2, setPassphrase2] = useState("");
  const [passphraseText2, setPassphraseText2] = useState("");

  const [current, setCurrent] = useState(1);

  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);
  const [complete, setComplete] = useState(false);

  const unlocked = { 2: two, 3: three, 4: four, 5: five };

  const [oneStyles, setOneStyles] = useState({});
  const [twoStyles, setTwoStyles] = useState({ display: "none" });
  const [threeStyles, setThreeStyles] = useState({ display: "none" });
  const [fourStyles, setFourStyles] = useState({ display: "none" });
  const [fiveStyles, setFiveStyles] = useState({ display: "none" });
  const [popupStyles, setPopupStyles] = useState({ display: "none" });

  const [progress, setProgress] = useState({ width: "calc(0% - 6px)" });

  const getPoints = () => {
    if (python[4]["1.2a"]["complete"] == false) {
      return 500;
    } else {
      return 0;
    }
  };

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

  const [points, setPoints] = useState(getPoints);

  const streakBonus = (points) => {
    if (user[11] < 10) {
      return (points * user[11]) / 10;
    }
    return points;
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
        setFive(true);
      }
    } else if (dropdownCurrent["value"] == 2) {
      setCompilerText(42);
      setCompilerStyle({});
      setCompilerNotes(
        "Here, the number properly inserted into the parenthesis so the code compiles correctly!"
      );
      setCompiledTwo(true);
      if (compiledOne && compiledThree) {
        setFive(true);
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
        setFive(true);
      }
    }
  };

  const [activityNum, setActivityNum] = useState(1);

  const [oneAnswers, setOneAnswers] = useState([""]);
  const [oneAnswerStyles, setOneAnswerStyles] = useState([{ opacity: 0 }]);
  const [oneAnswerStylesOut, setOneAnswerStylesOut] = useState([
    { width: "3rem" },
  ]);

  let [oneOptions, setOneOptions] = useState(["print", "write"]);
  let [oneOptionStyles, setOneOptionStyles] = useState([
    { opacity: 1 },
    { opacity: 1 },
  ]);
  let [oneOptionStylesOut, setOneOptionStylesOut] = useState([
    { width: "5rem" },
    { width: "5rem" },
  ]);

  const [twoAnswers, setTwoAnswers] = useState(["", ""]);
  const [twoAnswerStyles, setTwoAnswerStyles] = useState([
    { opacity: 0 },
    { opacity: 0 },
  ]);
  const [twoAnswerStylesOut, setTwoAnswerStylesOut] = useState([
    { width: "1rem" },
    { width: "1rem" },
  ]);

  let [twoOptions, setTwoOptions] = useState(['"', "'", ")", "(", '"']);
  let [twoOptionStyles, setTwoOptionStyles] = useState([
    { opacity: 1 },
    { opacity: 1 },
  ]);
  let [twoOptionStylesOut, setTwoOptionStylesOut] = useState([
    { width: "2rem" },
    { width: "2rem" },
    { width: "2rem" },
    { width: "2rem" },
    { width: "2rem" },
  ]);

  const [threeAnswers, setThreeAnswers] = useState(["", "", "", "", ""]);
  const [threeAnswerStyles, setThreeAnswerStyles] = useState([
    { opacity: 0 },
    { opacity: 0 },
    { opacity: 0 },
    { opacity: 0 },
    { opacity: 0 },
  ]);
  const [threeAnswerStylesOut, setThreeAnswerStylesOut] = useState([
    { width: "1rem" },
    { width: "3rem" },
    { width: "1rem" },
    { width: "3rem" },
    { width: "1rem" },
  ]);

  let [threeOptions, setThreeOptions] = useState([
    "42",
    '"""',
    "42",
    "(",
    "'",
    ")",
    '"""',
  ]);
  let [threeOptionStyles, setThreeOptionStyles] = useState([
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
  ]);
  let [threeOptionStylesOut, setThreeOptionStylesOut] = useState([
    { width: "3rem" },
    { width: "3rem" },
    { width: "3rem" },
    { width: "2rem" },
    { width: "2rem" },
    { width: "2rem" },
    { width: "3rem" },
  ]);

  const [fourAnswers, setFourAnswers] = useState(["", "", "", "", "", ""]);
  const [fourAnswerStyles, setFourAnswerStyles] = useState([
    { opacity: 0 },
    { opacity: 0 },
    { opacity: 0 },
    { opacity: 0 },
    { opacity: 0 },
    { opacity: 0 },
  ]);
  const [fourAnswerStylesOut, setFourAnswerStylesOut] = useState([
    { width: "3rem" },
    { width: "3rem" },
    { width: "3rem" },
    { width: "3rem" },
    { width: "3rem" },
    { width: "3rem" },
  ]);

  let [fourOptions, setFourOptions] = useState([
    ")",
    "print",
    "[",
    "Hello",
    "'",
    '"',
    "(",
    "'",
  ]);
  let [fourOptionStyles, setFourOptionStyles] = useState([
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
  ]);
  let [fourOptionStylesOut, setFourOptionStylesOut] = useState([
    { width: "2rem" },
    { width: "5rem" },
    { width: "2rem" },
    { width: "5rem" },
    { width: "2rem" },
    { width: "2rem" },
    { width: "2rem" },
    { width: "2rem" },
  ]);

  const [fiveAnswers, setFiveAnswers] = useState(["", "", "", ""]);
  const [fiveAnswerStyles, setFiveAnswerStyles] = useState([
    { opacity: 0 },
    { opacity: 0 },
    { opacity: 0 },
    { opacity: 0 },
    { opacity: 0 },
  ]);
  const [fiveAnswerStylesOut, setFiveAnswerStylesOut] = useState([
    { width: "3rem" },
    { width: "1rem" },
    { width: "3rem" },
    { width: "1rem" },
  ]);

  let [fiveOptions, setFiveOptions] = useState([
    '"',
    ")",
    "ten",
    '"',
    "print",
    "(",
  ]);
  let [fiveOptionStyles, setFiveOptionStyles] = useState([
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
  ]);
  let [fiveOptionStylesOut, setFiveOptionStylesOut] = useState([
    { width: "2rem" },
    { width: "2rem" },
    { width: "3rem" },
    { width: "2rem" },
    { width: "4rem" },
    { width: "2rem" },
  ]);

  const unshift = async (
    j,
    answers,
    setAnswers,
    answerStyles,
    setAnswerStyles,
    answerStylesOut,
    setAnswerStylesOut,
    options,
    setOptions,
    optionStyles,
    setOptionStyles,
    optionStylesOut,
    setOptionStylesOut
  ) => {
    let i = 0;
    let counter = 0;
    let found = false;
    options.forEach((option) => {
      if (option == "" && !found) {
        i = counter;
        found = true;
      }
      counter++;
    });
    setFeedbackStyle({ opacity: 0 });
    if (answers.includes("")) {
      setCheckStyles({
        backgroundColor: "#d5d4e9",
        color: "#9a98b8",
      });
    }
    setCheckStyles({
      backgroundColor: "#d5d4e9",
      color: "#9a98b8",
    });
    setCheckText("CHECK");
    setNavStyle({});
    options[i] = answers[j];
    setOptions([...options]);
    answerStyles[j] = { opacity: 0 };
    optionStyles[i] = { opacity: 1 };
    let width = optionStylesOut[i];
    optionStylesOut[i] = answerStylesOut[j];
    answerStylesOut[j] = { ...width };
    setAnswerStyles([...answerStyles]);
    setAnswerStylesOut([...answerStylesOut]);
    setOptionStyles([...optionStyles]);
    setOptionStylesOut([...optionStylesOut]);
    await delay(300);
    answers[j] = "";
    setAnswers([...answers]);
  };

  const shift = async (
    i,
    answers,
    setAnswers,
    answerStyles,
    setAnswerStyles,
    answerStylesOut,
    setAnswerStylesOut,
    options,
    setOptions,
    optionStyles,
    setOptionStyles,
    optionStylesOut,
    setOptionStylesOut
  ) => {
    let found = false;
    let counter = 0;
    let j = 0;
    answers.forEach((answer) => {
      if (answer == "" && !found) {
        found = true;
        j = counter;
      }
      counter++;
    });
    if (found) {
      answers[j] = options[i];
      setAnswers([...answers]);
      optionStyles[i] = { opacity: 0 };
      answerStyles[j] = { opacity: 1 };
      let width = answerStylesOut[j];
      answerStylesOut[j] = optionStylesOut[i];
      optionStylesOut[i] = { ...width };
      setOptionStyles([...optionStyles]);
      setOptionStylesOut([...optionStylesOut]);
      setAnswerStyles([...answerStyles]);
      setAnswerStylesOut([...answerStylesOut]);
      await delay(300);
      options[i] = "";
      setOptions([...options]);
      if (!answers.includes("")) {
        setCheckStyles({
          backgroundColor: "#b1689b",
          color: "white",
        });
      }
    }
  };

  const [checkStyles, setCheckStyles] = useState({
    backgroundColor: "#d5d4e9",
    color: "#9a98b8",
  });
  const [checkText, setCheckText] = useState("CHECK");

  const [navStyle, setNavStyle] = useState({ height: "5rem" });

  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackStyle, setFeedbackStyle] = useState({ opacity: 0 });

  const checkAnswers = async (
    answers,
    setAnswers,
    answerStyles,
    setAnswerStyles,
    answerStylesOut,
    setAnswerStylesOut,
    options,
    setOptions,
    optionStyles,
    setOptionStyles,
    optionStylesOut,
    setOptionStylesOut,
    key,
    unmountStyles,
    mountStyles,
    progress
  ) => {
    if (checkText == "TRY AGAIN") {
      let i = 0;
      answers.forEach((answer) => {
        if (answer != "") {
          unshift(
            i,
            answers,
            setAnswers,
            answerStyles,
            setAnswerStyles,
            answerStylesOut,
            setAnswerStylesOut,
            options,
            setOptions,
            optionStyles,
            setOptionStyles,
            optionStylesOut,
            setOptionStylesOut
          );
          i++;
        }
        setCheckText("CHECK");
        setCheckStyles({
          backgroundColor: "#d5d4e9",
          color: "#9a98b8",
        });
      });
    } else if (checkText == "CONTINUE") {
      unmount(unmountStyles);
      mount(mountStyles);
      setFeedbackStyle({ opacity: 0 });
      if (answers.includes("")) {
        setCheckStyles({
          backgroundColor: "#d5d4e9",
          color: "#9a98b8",
        });
      }
      setCheckText("CHECK");
      setNavStyle({});
      setCheckStyles({
        backgroundColor: "#d5d4e9",
        color: "#9a98b8",
      });
      setActivityNum(activityNum + 1);
    } else if (!answers.includes("")) {
      console.log(answers);
      console.log(key);
      let wrong = 0;
      answers.forEach((answer, i) => {
        console.log(answer == key[i]);
        if (answer == key[i]) {
          answerStyles[i] = {
            backgroundColor: "rgb(227, 214, 248)",
            color: "#4c2fb4",
          };
          setAnswerStyles([...answerStyles]);
        } else {
          answerStyles[i] = { backgroundColor: "#f8d6dc", color: "#c9434d" };
          setAnswerStyles([...answerStyles]);
          wrong++;
        }
      });
      setNavStyle({ height: "7rem" });
      if (wrong == 0) {
        setProgress({ ...progress });
        setCheckStyles({ backgroundColor: "#8651b4", color: "white" });
        setFeedbackStyle({ opacity: 1, color: "#8651b4" });
        setFeedbackText(randomCompliment());
        if (activityNum != 5) {
          setCheckText("CONTINUE");
        } else {
          setCheckText("FINISH");
          setFiveStyles({ opacity: 0.25 });
          setNavStyle({ opacity: "0" });
          setFeedbackStyle({ opacity: "0" });
          await delay(300);
          mount(setPopupStyles);
        }
      } else {
        setCheckStyles({ backgroundColor: "#f37b84", color: "white" });
        setCheckText("TRY AGAIN");
        setFeedbackStyle({ opacity: 1, color: "#f37b84" });
        setFeedbackText(randomEncouragement());
      }
    }
  };

  const getCheckFunction = () => {
    if (activityNum == 1) {
      checkAnswers(
        oneAnswers,
        setOneAnswers,
        oneAnswerStyles,
        setOneAnswerStyles,
        oneAnswerStylesOut,
        setOneAnswerStylesOut,
        oneOptions,
        setOneOptions,
        oneOptionStyles,
        setOneOptionStyles,
        oneOptionStylesOut,
        setOneOptionStylesOut,
        ["print"],
        setOneStyles,
        setTwoStyles,
        { width: "calc(20% - 6px)" }
      );
    } else if (activityNum == 2) {
      checkAnswers(
        twoAnswers,
        setTwoAnswers,
        twoAnswerStyles,
        setTwoAnswerStyles,
        twoAnswerStylesOut,
        setTwoAnswerStylesOut,
        twoOptions,
        setTwoOptions,
        twoOptionStyles,
        setTwoOptionStyles,
        twoOptionStylesOut,
        setTwoOptionStylesOut,
        ['"', '"'],
        setTwoStyles,
        setThreeStyles,
        { width: "calc(40% - 6px)" }
      );
    } else if (activityNum == 3) {
      checkAnswers(
        threeAnswers,
        setThreeAnswers,
        threeAnswerStyles,
        setThreeAnswerStyles,
        threeAnswerStylesOut,
        setThreeAnswerStylesOut,
        threeOptions,
        setThreeOptions,
        threeOptionStyles,
        setThreeOptionStyles,
        threeOptionStylesOut,
        setThreeOptionStylesOut,
        ['"""', "42", '"""', "42", ")"],
        setThreeStyles,
        setFourStyles,
        { width: "calc(60% - 6px)" }
      );
    } else if (activityNum == 4) {
      checkAnswers(
        fourAnswers,
        setFourAnswers,
        fourAnswerStyles,
        setFourAnswerStyles,
        fourAnswerStylesOut,
        setFourAnswerStylesOut,
        fourOptions,
        setFourOptions,
        fourOptionStyles,
        setFourOptionStyles,
        fourOptionStylesOut,
        setFourOptionStylesOut,
        ["print", "(", "'", "Hello", "'", ")"],
        setFourStyles,
        setFiveStyles,
        { width: "calc(80% - 6px)" }
      );
    } else if (activityNum == 5) {
      checkAnswers(
        fiveAnswers,
        setFiveAnswers,
        fiveAnswerStyles,
        setFiveAnswerStyles,
        fiveAnswerStylesOut,
        setFiveAnswerStylesOut,
        fiveOptions,
        setFiveOptions,
        fiveOptionStyles,
        setFiveOptionStyles,
        fiveOptionStylesOut,
        setFiveOptionStylesOut,
        ["print", "(", "ten", ")"],
        setFourStyles,
        setFiveStyles,
        { width: "calc(100% - 6px)" }
      );
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
    if (python[4]["1.2a"]["complete"] == false) {
      python[3]++;
    }
    python[4]["1.2a"]["complete"] = true;
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
        modules: { ...python[4] },
        points: python[1],
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

  return (
    <>
      <div className="background">
        <div className="app-page-lessons">
          <div style={popupStyles}>
            <div className="complete-lesson">
              <h2>1.2: Activity Complete</h2>
              <div className="complete-bar"></div>
              <div className="flex-text">
                <p>Activity Complete</p>
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
              <h2 className="lessons-header-name">
                1.2: Activity - print('Hello')
              </h2>
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
              <h2 className="lesson-header"></h2>
              <p className="lesson-paragraph">
                Amanda needs help printing some things to the Python console!
                Move through the activities and fill in the spaces she left
                blank.
              </p>
              <p>Complete the greeting below:</p>
              <div className="spacer"></div>
              <div className="activity_fill_in">
                <div
                  className="blank"
                  style={oneAnswerStylesOut[0]}
                  onClick={() => {
                    unshift(
                      0,
                      oneAnswers,
                      setOneAnswers,
                      oneAnswerStyles,
                      setOneAnswerStyles,
                      oneAnswerStylesOut,
                      setOneAnswerStylesOut,
                      oneOptions,
                      setOneOptions,
                      oneOptionStyles,
                      setOneOptionStyles,
                      oneOptionStylesOut,
                      setOneOptionStylesOut
                    );
                  }}
                >
                  <div style={oneAnswerStyles[0]}>
                    <p>{oneAnswers[0]}</p>
                  </div>
                </div>
                <span>("Hello, Coderverse!")</span>
              </div>
              <div className="activity-line"></div>
              <div className="options_bank">
                {oneOptions.map((option) => {
                  let i = oneOptions.indexOf(option);
                  return (
                    <div className="option" style={oneOptionStylesOut[i]}>
                      <div
                        style={oneOptionStyles[i]}
                        onClick={() => {
                          shift(
                            i,
                            oneAnswers,
                            setOneAnswers,
                            oneAnswerStyles,
                            setOneAnswerStyles,
                            oneAnswerStylesOut,
                            setOneAnswerStylesOut,
                            oneOptions,
                            setOneOptions,
                            oneOptionStyles,
                            setOneOptionStyles,
                            oneOptionStylesOut,
                            setOneOptionStylesOut
                          );
                        }}
                      >
                        <p>{option}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <h2 style={feedbackStyle} className="feedback-text">
                {feedbackText}
              </h2>
            </div>
            <div style={twoStyles}>
              <h2 className="lesson-header"></h2>
              <p className="lesson-paragraph">
                Remember, when printing strings, you have to wrap them up! You
                can use either single quotes, double quotes, or triple quotes,
                so long as you match them up!
              </p>
              <p>Complete the greeting below:</p>
              <div className="spacer"></div>
              <div className="activity_fill_in">
                <span style={{ marginRight: "0.25rem" }}>print(</span>
                <div
                  className="blank"
                  style={twoAnswerStylesOut[0]}
                  onClick={() => {
                    unshift(
                      0,
                      twoAnswers,
                      setTwoAnswers,
                      twoAnswerStyles,
                      setTwoAnswerStyles,
                      twoAnswerStylesOut,
                      setTwoAnswerStylesOut,
                      twoOptions,
                      setTwoOptions,
                      twoOptionStyles,
                      setTwoOptionStyles,
                      twoOptionStylesOut,
                      setTwoOptionStylesOut
                    );
                  }}
                >
                  <div style={twoAnswerStyles[0]}>
                    <p>{twoAnswers[0]}</p>
                  </div>
                </div>
                <span style={{ marginRight: "0.25rem" }}>Hola!</span>
                <div
                  className="blank"
                  style={twoAnswerStylesOut[1]}
                  onClick={() => {
                    unshift(
                      1,
                      twoAnswers,
                      setTwoAnswers,
                      twoAnswerStyles,
                      setTwoAnswerStyles,
                      twoAnswerStylesOut,
                      setTwoAnswerStylesOut,
                      twoOptions,
                      setTwoOptions,
                      twoOptionStyles,
                      setTwoOptionStyles,
                      twoOptionStylesOut,
                      setTwoOptionStylesOut
                    );
                  }}
                >
                  <div style={twoAnswerStyles[1]}>
                    <p>{twoAnswers[1]}</p>
                  </div>
                </div>
                <span>)</span>
              </div>
              <div className="activity-line"></div>
              <div className="options_bank">
                {twoOptions.map((option, i) => {
                  return (
                    <div className="option" style={twoOptionStylesOut[i]}>
                      <div
                        style={twoOptionStyles[i]}
                        onClick={() => {
                          shift(
                            i,
                            twoAnswers,
                            setTwoAnswers,
                            twoAnswerStyles,
                            setTwoAnswerStyles,
                            twoAnswerStylesOut,
                            setTwoAnswerStylesOut,
                            twoOptions,
                            setTwoOptions,
                            twoOptionStyles,
                            setTwoOptionStyles,
                            twoOptionStylesOut,
                            setTwoOptionStylesOut
                          );
                        }}
                      >
                        <p>{option}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <h2 style={feedbackStyle} className="feedback-text">
                {feedbackText}
              </h2>
            </div>
            <div style={threeStyles}>
              <h2 className="lesson-header"></h2>
              <p className="lesson-paragraph">
                While keeping in mind what we discussed last slide, also
                remember that strings aren't the only things you can print! You
                can print a bunch of other data types, for example numbers!
              </p>
              <p>Print 42 twice, once as a string, and once as a number:</p>
              <div className="spacer"></div>
              <div className="activity_fill_in">
                <span style={{ marginRight: "0.25rem" }}>print(</span>
                <div
                  className="blank"
                  style={threeAnswerStylesOut[0]}
                  onClick={() => {
                    unshift(
                      0,
                      threeAnswers,
                      setThreeAnswers,
                      threeAnswerStyles,
                      setThreeAnswerStyles,
                      threeAnswerStylesOut,
                      setThreeAnswerStylesOut,
                      threeOptions,
                      setThreeOptions,
                      threeOptionStyles,
                      setThreeOptionStyles,
                      threeOptionStylesOut,
                      setThreeOptionStylesOut
                    );
                  }}
                >
                  <div style={threeAnswerStyles[0]}>
                    <p>{threeAnswers[0]}</p>
                  </div>
                </div>
                <div
                  className="blank"
                  style={threeAnswerStylesOut[1]}
                  onClick={() => {
                    unshift(
                      1,
                      threeAnswers,
                      setThreeAnswers,
                      threeAnswerStyles,
                      setThreeAnswerStyles,
                      threeAnswerStylesOut,
                      setThreeAnswerStylesOut,
                      threeOptions,
                      setThreeOptions,
                      threeOptionStyles,
                      setThreeOptionStyles,
                      threeOptionStylesOut,
                      setThreeOptionStylesOut
                    );
                  }}
                >
                  <div style={threeAnswerStyles[1]}>
                    <p>{threeAnswers[1]}</p>
                  </div>
                </div>
                <div
                  className="blank"
                  style={threeAnswerStylesOut[2]}
                  onClick={() => {
                    unshift(
                      2,
                      threeAnswers,
                      setThreeAnswers,
                      threeAnswerStyles,
                      setThreeAnswerStyles,
                      threeAnswerStylesOut,
                      setThreeAnswerStylesOut,
                      threeOptions,
                      setThreeOptions,
                      threeOptionStyles,
                      setThreeOptionStyles,
                      threeOptionStylesOut,
                      setThreeOptionStylesOut
                    );
                  }}
                >
                  <div style={threeAnswerStyles[2]}>
                    <p>{threeAnswers[2]}</p>
                  </div>
                </div>
                <span>)</span>
              </div>
              <div className="activity_fill_in" style={{ marginTop: "0.5rem" }}>
                <span style={{ marginRight: "0.25rem" }}>print(</span>
                <div
                  className="blank"
                  style={threeAnswerStylesOut[3]}
                  onClick={() => {
                    unshift(
                      3,
                      threeAnswers,
                      setThreeAnswers,
                      threeAnswerStyles,
                      setThreeAnswerStyles,
                      threeAnswerStylesOut,
                      setThreeAnswerStylesOut,
                      threeOptions,
                      setThreeOptions,
                      threeOptionStyles,
                      setThreeOptionStyles,
                      threeOptionStylesOut,
                      setThreeOptionStylesOut
                    );
                  }}
                >
                  <div style={threeAnswerStyles[3]}>
                    <p>{threeAnswers[3]}</p>
                  </div>
                </div>
                <div
                  className="blank"
                  style={threeAnswerStylesOut[4]}
                  onClick={() => {
                    unshift(
                      4,
                      threeAnswers,
                      setThreeAnswers,
                      threeAnswerStyles,
                      setThreeAnswerStyles,
                      threeAnswerStylesOut,
                      setThreeAnswerStylesOut,
                      threeOptions,
                      setThreeOptions,
                      threeOptionStyles,
                      setThreeOptionStyles,
                      threeOptionStylesOut,
                      setThreeOptionStylesOut
                    );
                  }}
                >
                  <div style={threeAnswerStyles[4]}>
                    <p>{threeAnswers[4]}</p>
                  </div>
                </div>
              </div>
              <div className="activity-line"></div>
              <div className="options_bank">
                {threeOptions.map((option, i) => {
                  return (
                    <div className="option" style={threeOptionStylesOut[i]}>
                      <div
                        style={threeOptionStyles[i]}
                        onClick={() => {
                          shift(
                            i,
                            threeAnswers,
                            setThreeAnswers,
                            threeAnswerStyles,
                            setThreeAnswerStyles,
                            threeAnswerStylesOut,
                            setThreeAnswerStylesOut,
                            threeOptions,
                            setThreeOptions,
                            threeOptionStyles,
                            setThreeOptionStyles,
                            threeOptionStylesOut,
                            setThreeOptionStylesOut
                          );
                        }}
                      >
                        <p>{option}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <h2 style={feedbackStyle} className="feedback-text">
                {feedbackText}
              </h2>
            </div>
            <div style={fourStyles}>
              <h2 className="lesson-header"></h2>
              <p className="lesson-paragraph">
                Let's make this a bit more open ended!
              </p>
              <p>Find a way to make a proper print statement:</p>
              <div className="spacer"></div>
              <div className="activity_fill_in">
                <div
                  className="blank"
                  style={fourAnswerStylesOut[0]}
                  onClick={() => {
                    unshift(
                      0,
                      fourAnswers,
                      setFourAnswers,
                      fourAnswerStyles,
                      setFourAnswerStyles,
                      fourAnswerStylesOut,
                      setFourAnswerStylesOut,
                      fourOptions,
                      setFourOptions,
                      fourOptionStyles,
                      setFourOptionStyles,
                      fourOptionStylesOut,
                      setFourOptionStylesOut
                    );
                  }}
                >
                  <div style={fourAnswerStyles[0]}>
                    <p>{fourAnswers[0]}</p>
                  </div>
                </div>
                <div
                  className="blank"
                  style={fourAnswerStylesOut[1]}
                  onClick={() => {
                    unshift(
                      1,
                      fourAnswers,
                      setFourAnswers,
                      fourAnswerStyles,
                      setFourAnswerStyles,
                      fourAnswerStylesOut,
                      setFourAnswerStylesOut,
                      fourOptions,
                      setFourOptions,
                      fourOptionStyles,
                      setFourOptionStyles,
                      fourOptionStylesOut,
                      setFourOptionStylesOut
                    );
                  }}
                >
                  <div style={fourAnswerStyles[1]}>
                    <p>{fourAnswers[1]}</p>
                  </div>
                </div>
                <div
                  className="blank"
                  style={fourAnswerStylesOut[2]}
                  onClick={() => {
                    unshift(
                      2,
                      fourAnswers,
                      setFourAnswers,
                      fourAnswerStyles,
                      setFourAnswerStyles,
                      fourAnswerStylesOut,
                      setFourAnswerStylesOut,
                      fourOptions,
                      setFourOptions,
                      fourOptionStyles,
                      setFourOptionStyles,
                      fourOptionStylesOut,
                      setFourOptionStylesOut
                    );
                  }}
                >
                  <div style={fourAnswerStyles[2]}>
                    <p>{fourAnswers[2]}</p>
                  </div>
                </div>
                <div
                  className="blank"
                  style={fourAnswerStylesOut[3]}
                  onClick={() => {
                    unshift(
                      3,
                      fourAnswers,
                      setFourAnswers,
                      fourAnswerStyles,
                      setFourAnswerStyles,
                      fourAnswerStylesOut,
                      setFourAnswerStylesOut,
                      fourOptions,
                      setFourOptions,
                      fourOptionStyles,
                      setFourOptionStyles,
                      fourOptionStylesOut,
                      setFourOptionStylesOut
                    );
                  }}
                >
                  <div style={fourAnswerStyles[3]}>
                    <p>{fourAnswers[3]}</p>
                  </div>
                </div>
                <div
                  className="blank"
                  style={fourAnswerStylesOut[4]}
                  onClick={() => {
                    unshift(
                      4,
                      fourAnswers,
                      setFourAnswers,
                      fourAnswerStyles,
                      setFourAnswerStyles,
                      fourAnswerStylesOut,
                      setFourAnswerStylesOut,
                      fourOptions,
                      setFourOptions,
                      fourOptionStyles,
                      setFourOptionStyles,
                      fourOptionStylesOut,
                      setFourOptionStylesOut
                    );
                  }}
                >
                  <div style={fourAnswerStyles[4]}>
                    <p>{fourAnswers[4]}</p>
                  </div>
                </div>
                <div
                  className="blank"
                  style={fourAnswerStylesOut[5]}
                  onClick={() => {
                    unshift(
                      5,
                      fourAnswers,
                      setFourAnswers,
                      fourAnswerStyles,
                      setFourAnswerStyles,
                      fourAnswerStylesOut,
                      setFourAnswerStylesOut,
                      fourOptions,
                      setFourOptions,
                      fourOptionStyles,
                      setFourOptionStyles,
                      fourOptionStylesOut,
                      setFourOptionStylesOut
                    );
                  }}
                >
                  <div style={fourAnswerStyles[5]}>
                    <p>{fourAnswers[5]}</p>
                  </div>
                </div>
              </div>
              <div className="activity-line"></div>
              <div className="options_bank">
                {fourOptions.map((option, i) => {
                  return (
                    <div className="option" style={fourOptionStylesOut[i]}>
                      <div
                        style={fourOptionStyles[i]}
                        onClick={() => {
                          shift(
                            i,
                            fourAnswers,
                            setFourAnswers,
                            fourAnswerStyles,
                            setFourAnswerStyles,
                            fourAnswerStylesOut,
                            setFourAnswerStylesOut,
                            fourOptions,
                            setFourOptions,
                            fourOptionStyles,
                            setFourOptionStyles,
                            fourOptionStylesOut,
                            setFourOptionStylesOut
                          );
                        }}
                      >
                        <p>{option}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <h2 style={feedbackStyle} className="feedback-text">
                {feedbackText}
              </h2>
            </div>
            <div style={fiveStyles}>
              <h2 className="lesson-header"></h2>
              <p className="lesson-paragraph">
                Great job making it this far! Let's preview our next topic,
                variables!
              </p>
              <p>Let's say we declare a variable like this:</p>
              <p>ten = 10</p>
              <p>
                If we want to print out the variable's value, which is 10, all
                we have to do is pass in the variables name into print()! No
                quotes necessary!
              </p>
              <p>Print the value of the variable ten:</p>
              <div className="spacer"></div>
              <div className="activity_fill_in">
                <div
                  className="blank"
                  style={fiveAnswerStylesOut[0]}
                  onClick={() => {
                    unshift(
                      0,
                      fiveAnswers,
                      setFiveAnswers,
                      fiveAnswerStyles,
                      setFiveAnswerStyles,
                      fiveAnswerStylesOut,
                      setFiveAnswerStylesOut,
                      fiveOptions,
                      setFiveOptions,
                      fiveOptionStyles,
                      setFiveOptionStyles,
                      fiveOptionStylesOut,
                      setFiveOptionStylesOut
                    );
                  }}
                >
                  <div style={fiveAnswerStyles[0]}>
                    <p>{fiveAnswers[0]}</p>
                  </div>
                </div>
                <div
                  className="blank"
                  style={fiveAnswerStylesOut[1]}
                  onClick={() => {
                    unshift(
                      1,
                      fiveAnswers,
                      setFiveAnswers,
                      fiveAnswerStyles,
                      setFiveAnswerStyles,
                      fiveAnswerStylesOut,
                      setFiveAnswerStylesOut,
                      fiveOptions,
                      setFiveOptions,
                      fiveOptionStyles,
                      setFiveOptionStyles,
                      fiveOptionStylesOut,
                      setFiveOptionStylesOut
                    );
                  }}
                >
                  <div style={fiveAnswerStyles[1]}>
                    <p>{fiveAnswers[1]}</p>
                  </div>
                </div>
                <div
                  className="blank"
                  style={fiveAnswerStylesOut[2]}
                  onClick={() => {
                    unshift(
                      2,
                      fiveAnswers,
                      setFiveAnswers,
                      fiveAnswerStyles,
                      setFiveAnswerStyles,
                      fiveAnswerStylesOut,
                      setFiveAnswerStylesOut,
                      fiveOptions,
                      setFiveOptions,
                      fiveOptionStyles,
                      setFiveOptionStyles,
                      fiveOptionStylesOut,
                      setFiveOptionStylesOut
                    );
                  }}
                >
                  <div style={fiveAnswerStyles[2]}>
                    <p>{fiveAnswers[2]}</p>
                  </div>
                </div>
                <div
                  className="blank"
                  style={fiveAnswerStylesOut[3]}
                  onClick={() => {
                    unshift(
                      3,
                      fiveAnswers,
                      setFiveAnswers,
                      fiveAnswerStyles,
                      setFiveAnswerStyles,
                      fiveAnswerStylesOut,
                      setFiveAnswerStylesOut,
                      fiveOptions,
                      setFiveOptions,
                      fiveOptionStyles,
                      setFiveOptionStyles,
                      fiveOptionStylesOut,
                      setFiveOptionStylesOut
                    );
                  }}
                >
                  <div style={fiveAnswerStyles[3]}>
                    <p>{fiveAnswers[3]}</p>
                  </div>
                </div>
              </div>
              <div className="activity-line"></div>
              <div className="options_bank">
                {fiveOptions.map((option, i) => {
                  return (
                    <div className="option" style={fiveOptionStylesOut[i]}>
                      <div
                        style={fiveOptionStyles[i]}
                        onClick={() => {
                          shift(
                            i,
                            fiveAnswers,
                            setFiveAnswers,
                            fiveAnswerStyles,
                            setFiveAnswerStyles,
                            fiveAnswerStylesOut,
                            setFiveAnswerStylesOut,
                            fiveOptions,
                            setFiveOptions,
                            fiveOptionStyles,
                            setFiveOptionStyles,
                            fiveOptionStylesOut,
                            setFiveOptionStylesOut
                          );
                        }}
                      >
                        <p>{option}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <h2 style={feedbackStyle} className="feedback-text">
                {feedbackText}
              </h2>
            </div>
          </div>
          <div className="navbar activity-navbar" style={navStyle}>
            <div className="lesson-nav activity-lesson-nav">
              <div
                className="mega-nav-box"
                style={checkStyles}
                onClick={() => {
                  getCheckFunction();
                }}
              >
                <h2>{checkText}</h2>
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
