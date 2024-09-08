import "./App.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { animated, useTransition, useSpring } from "react-spring";
import CountUp from "react-countup";

const getScreenHeight = (width) => {
  if (width > 1360) {
    return {height: "64rem"};
  } else if (width > 1200) {
    return {height: "66rem"};
  } else if (width > 1040) {
    return {height: "64rem"};
  } else if (width > 880) {
    return {height: "72rem"};
  } else if (width > 720) {
    return {height: "134rem"};
  } else if (width > 640) {
    return {height: "138rem"};
  } else if (width > 480) {
    return {height: "140.5rem"};
  } else if (width > 400) {
    return {height: "143rem"};
  } else {
    return {height: "145rem"};
  }
}

function App() {
  let [width, setWidth] = useState(window.innerWidth);
  const [inputs, setInputs] = useState({"squareFeet": 0, "emissionRate": 0, "sequestrationPercentage": 100});
  const [oldInputs, setOldInputs] = useState({"squareFeet": 0, "emissionRate": 0, "sequestrationPercentage": 100});
  const [formHeight, setFormHeight] = useState(getScreenHeight(width));
  const [dropdown, setDropdown] = useState("High School");
  const [squareFeet, setSquareFeet] = useState(0);
  const [emissionRate, setEmissionRate] = useState(0);
  const [sequestrationPercentage, setSequestrationPercentage] = useState(100);
  const [oldSquareFeet, setOldSquareFeet] = useState(0);
  const [oldEmissionRate, setOldEmissionRate] = useState(0);
  const [oldSequestrationPercentage, setOldSequestrationPercentage] = useState(100);
  const [college, setCollege] = useState(false)
  // misc functions
  const handleResize = () => {
    console.log(dropdown);
    width = window.innerWidth;
    setWidth(window.innerWidth);
    if (dropdown == "High School") {
      if (width > 1360) {
        setFormHeight({ height: "64rem" });
      } else if (width > 1200) {
        setFormHeight({ height: "66rem" });
      } else if (width > 1040) {
        setFormHeight({ height: "64rem" });
      } else if (width > 880) {
        setFormHeight({ height: "72rem" });
      } else if (width > 720) {
        setFormHeight({ height: "134rem" });
      } else if (width > 640) {
        setFormHeight({ height: "138rem" });
      } else if (width > 480) {
        setFormHeight({ height: "140.5rem" });
      } else if (width > 400) {
        setFormHeight({ height: "143rem" });
      } else {
        setFormHeight({ height: "145rem" });
      }
    } else if (dropdown == "College") {
      if (width >  1200) {
        setFormHeight({ height: "32rem" });
      } else if (width > 1040) {
        setFormHeight({ height: "37rem" });
      } else if (width > 880) {
        setFormHeight({ height: "43rem" });
      } else if (width > 720) {
        setFormHeight({ height: "49rem" });
      } else if (width > 640) {
        setFormHeight({ height: "56rem" });
      } else if (width > 480) {
        setFormHeight({ height: "64rem" });
      } else if (width > 400) {
        setFormHeight({ height: "64rem" });
      } else {
        setFormHeight({ height: "64rem" });
      }
    }
  };

  const returnBreak = () => {
    if (width <= 1040) {
      return <br></br>;
    }
  };

  //use effects
  useEffect(() => {
    const timeOutId = setTimeout(() => setSquareFeet(inputs["squareFeet"]), 1);
    return () => clearTimeout(timeOutId);
  }, [inputs]);

  useEffect(() => {
    const timeOutId = setTimeout(() => setEmissionRate(inputs["emissionRate"]), 1);
    return () => clearTimeout(timeOutId);
  }, [inputs]);

  useEffect(() => {
    const timeOutId = setTimeout(() => setSequestrationPercentage(inputs["sequestrationPercentage"]), 1);
    return () => clearTimeout(timeOutId);
  }, [inputs]);
  useEffect(() => {
    const timeOutId = setTimeout(() => setOldInputs({...inputs}), 1);
    return () => clearTimeout(timeOutId);
  }, [inputs]);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // form stuff
  const handleChange = (event) => {
    setOldInputs({...inputs})
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    setSquareFeet(inputs["squareFeet"]);
    setEmissionRate(inputs["emissionRate"]);
    setSequestrationPercentage(inputs["sequestrationPercentage"]);
    setOldSquareFeet(oldInputs["squareFeet"]);
    setOldEmissionRate(oldInputs["emissionRate"]);
    setOldSequestrationPercentage(oldInputs["sequestrationPercentage"]);
  };
  const handleDropdownChange = (event) => {
    setDropdown(event.target.value);
    setCollege(!college)
    if (event.target.value == "High School") {
      if (width > 1360) {
        setFormHeight({ height: "64rem" });
      } else if (width > 1200) {
        setFormHeight({ height: "66rem" });
      } else if (width > 1040) {
        setFormHeight({ height: "64rem" });
      } else if (width > 880) {
        setFormHeight({ height: "72rem" });
      } else if (width > 720) {
        setFormHeight({ height: "134rem" });
      } else if (width > 640) {
        setFormHeight({ height: "138rem" });
      } else if (width > 480) {
        setFormHeight({ height: "140.5rem" });
      } else if (width > 400) {
        setFormHeight({ height: "143rem" });
      } else {
        setFormHeight({ height: "145rem" });
      }
    } else {
      if (width > 1200) {
        setFormHeight({ height: "32rem" });
      } else if (width > 1040) {
        setFormHeight({ height: "37rem" });
      } else if (width > 880) {
        setFormHeight({ height: "43rem" });
      } else if (width > 720) {
        setFormHeight({ height: "49rem" });
      } else if (width > 640) {
        setFormHeight({ height: "56rem" });
      } else if (width > 480) {
        setFormHeight({ height: "64rem" });
      } else if (width > 400) {
        setFormHeight({ height: "64rem" });
      } else {
        setFormHeight({ height: "64rem" });
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setSquareFeet(inputs["squareFeet"]);
    setEmissionRate(inputs["emissionRate"]);
    setSequestrationPercentage(inputs["sequestrationPercentage"]);
  };

  const makeInt = (x) => {
    let returnVal = "";
    let decimal = false
    if (typeof x === "string") {
      for (let i = 0; i < x.length; i++) {
        if (!isNaN(x[i])) {
          returnVal += x[i];
        }
        else if (x[i] === "." && !decimal){
          decimal = true
          returnVal += x[i]
        }
      }
      return parseInt(returnVal, 10);
    }
    return x;
  }

  // conditional returns
  const calculatorResults = () => {
    let squareFeetInt = makeInt(squareFeet);
    let oldSquareFeetInt = makeInt(oldSquareFeet);
    let emissionRateInt = makeInt(emissionRate);
    let oldEmissionRateInt = makeInt(oldEmissionRate);
    let sequestrationPercentageInt = makeInt(sequestrationPercentage);
    let oldSequestrationPercentageInt = makeInt(oldSequestrationPercentage);
  
    let electricityval = ((10 * squareFeetInt) / 1000) * emissionRateInt;
    let gasval = ((50 * squareFeetInt) / 96.43) * 11.7;
    let electricityTrees = Math.round(electricityval / 240000 * sequestrationPercentage);
    let gasTrees = Math.round(gasval / 240000 * sequestrationPercentage);
    let totalTrees = electricityTrees + gasTrees
    let oldElectricityval = ((10 * oldSquareFeetInt) / 1000) * oldEmissionRateInt;
    let oldGasval = ((50 * oldSquareFeetInt) / 96.43) * 11.7;
    let oldElectricityTrees = Math.round(oldElectricityval / 240000 * oldSequestrationPercentage);
    let oldGasTrees = Math.round(oldGasval / 240000 * oldSequestrationPercentage);
    let oldTotalTrees = oldElectricityTrees + oldGasTrees
    if (totalTrees > 99999){
      if (oldTotalTrees >= 99999){
        oldTotalTrees = 99999;
      }
      totalTrees = 99999;
    }
    if (electricityTrees > 99999){
      if (oldElectricityTrees >= 99999) {
        oldElectricityTrees = 99999;
      }
      electricityTrees = 99999;
    }
    if (gasTrees > 99999){
      if (oldGasTrees >= 99999) {
        oldGasTrees = 99999;
      }
      gasTrees = 99999;
    }
    return (
      <>
        <h1 className="label resultHeader">Base Sapling Goal On:</h1>

        <div className="resultGrid">
          <div id="electricity">
            <div className="results">
              <h1 className="treeDescription">Electricity:</h1>
              <div className="countHolder">
                <span>
                  <CountUp
                    className="treeAmount"
                    start={oldElectricityTrees}
                    end={electricityTrees}
                    duration={1}
                  ></CountUp>
                </span>
              </div>
              <h1 className="treeWord">Saplings</h1>
            </div>
          </div>
          <div id="total">
            <div className="results">
              <h1 className="treeDescription">Total:</h1>
              <div className="countHolder">
                <CountUp
                  className="treeAmount"
                  start={oldTotalTrees}
                  end={totalTrees}
                  duration={1}
                ></CountUp>
              </div>
              <h1 className="treeWord">Saplings</h1>
            </div>
          </div>
          <div id="gas">
            <div className="results">
              <h1 className="treeDescription">Gas:</h1>
              <div className="countHolder">
                <CountUp
                  className="treeAmount"
                  start={oldGasTrees}
                  pm
                  end={gasTrees}
                  duration={1}
                ></CountUp>
              </div>
              <h1 className="treeWord">Saplings</h1>
            </div>
          </div>
        </div>
      </>
    );
  };

  // return
  return (
    <div className="App">
      <div className="formDiv" style={formHeight}>
        <h1 className="titleHeader">Tree-Plenish Carbon Calculator</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="label">
            <label>Are you hosting a K-12 school or college event?</label>
            {returnBreak()}
            <select value={dropdown} onChange={handleDropdownChange}>
              <option value="High School">K-12 School</option>
              <option value="College">College</option>
            </select>
          </div>
          <CSSTransition
            in={dropdown == "College"}
            timeout={1000}
            classNames="college"
            unmountOnExit
          >
            <div className="collegeTreeInfo">
              <p>
                Colleges, as you know, use considerably more energy than high
                schools. It is also significantly more difficult to accurately
                estimate a college's annual energy consumption.<br></br>
                <br></br>
                As a result, finding a sapling goal that correlates with a
                college's energy usage is a futile task. Instead, we ask that
                you choose a sapling goal that reflects the ideal number of
                saplings you think is reasonable to plant given the set of
                constraints you face (space, people, etc...).<br></br>
                <br></br>
                We recommend that colleges in urban settings set a goal in the
                range of 150 - 250 saplings and schools in more suburban or
                rural settings set a goal in the range of 200 - 400 saplings.
                However, these are purely suggestions and you are welcome to set
                your goal outside of this range as long as it is above 50.
                <br></br>
                <br></br>
                After you have your event date, sapling goal, and sapling
                species, please fill out the following form.
              </p>
              <br></br>
              <a
                href="https://treeplenish.typeform.com/to/cPvgB9m3"
                target="_blank"
              >
                Logistics Form
              </a>{" "}
            </div>
          </CSSTransition>
          <CSSTransition
            in={dropdown == "High School"}
            timeout={1000}
            classNames="highSchool"
            unmountOnExit
          >
            <div>
              <div className="label">
                <label>How many square feet is your school?</label>
                {returnBreak()}
                <input
                  type="number"
                  name="squareFeet"
                  value={inputs.squareFeet}
                  onChange={handleChange}
                />
              </div>
              <div className="label">
                <label>
                  What is your community's{" "}
                  <a
                    href="https://www.epa.gov/egrid/power-profiler#/NEWE"
                    target="_blank"
                  >
                    CO2 Emission Rate
                  </a>
                  ?
                </label>
                {returnBreak()}
                <input
                  type="number"
                  name="emissionRate"
                  value={inputs.emissionRate}
                  onChange={handleChange}
                />
              </div>
              <div className="label">
                <label>
                  What % of your carbon would you like to sequester?{" "}
                </label>
                {returnBreak()}
                <input
                  className="percentage"
                  type="number"
                  name="sequestrationPercentage"
                  value={inputs.sequestrationPercentage}
                  onChange={handleChange}
                />
              </div>
              {calculatorResults()}
              <div className="infoP">
                <p>
                  To learn more about how we made these calculations, please{" "}
                  <a
                    href="https://drive.google.com/file/d/1GlKMBxt_czZki4WqV448fri4W_80jC5C/view"
                    target="_blank"
                  >
                    click here
                  </a>
                  .
                </p>
                <br></br>
                <p>
                  These numbers may be higher or lower than you think is
                  reasonable to plant. Feel free to offset 50% of your energy
                  consumption or even 200%, it's up to you. Once you have your
                  event date, sapling goal, and sapling species, please fill out{" "}
                  <a
                    href="https://treeplenish.typeform.com/to/cPvgB9m3"
                    target="_blank"
                  >
                    this form
                  </a>
                  .
                </p>
                <br></br>
                <p>
                  Last year, the average sapling goal was 200. However, there was
                  a lot of variability and some schools even had a goal of over
                  1,000 saplings (and met their goal!). The minimum goal you can
                  set is 50 saplings. You are not required to meet your goal and
                  you are also welcome to plant more saplings than your initial
                  goal.
                </p>
              </div>
            </div>
          </CSSTransition>
        </form>
      </div>
    </div>
  );
}

export default App;
