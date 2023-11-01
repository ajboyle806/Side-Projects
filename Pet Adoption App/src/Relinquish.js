import "./App.css";
import "swiper/css";
import "swiper/css/pagination";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Pagination } from "swiper";

function Relinquish() {
  const [formInputs, setFormInputs] = useLocalStorage("formInputs", {});

  const handleTypeChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const newObj = { ...formInputs, [name]: value };
    setFormInputs(newObj);
  };

  const [buttonText, setButtonText] = useState("Expand");
  const [formStyling, setFormStyling] = useState({
    height: "11.5rem",
    overflow: "hidden",
    transition: "200ms height",
  });

  const switchText = () => {
    if (buttonText == "Expand") {
      setButtonText("Collapse");
      setFormStyling({
        height: "82rem",
        overflow: "hidden",
        transition: "400ms height",
      });
    } else {
      setButtonText("Expand");
      setFormStyling({
        height: "11.5rem",
        overflow: "hidden",
        transition: "400ms height",
      });
    }
  };

  const switchButton = () => {
    if (buttonText == "Expand") {
      return (
        <button
          className="button"
          style={{
            marginLeft: "20px",
            marginRight: "20px",
            width: "calc(100% - 40px)",
            marginTop: 0,
            marginBottom: 0,
          }}
          onClick={() => {
            switchText();
          }}
        >
          Expand
        </button>
      );
    }
    return (
      <button
        className="buttonActive"
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          width: "calc(100% - 40px)",
          marginTop: 0,
          marginBottom: 0,
        }}
        onClick={() => {
          switchText();
        }}
      >
        Collapse
      </button>
    );
  };

  return (
    <div className="background">
      <div className="app">
        <div className="banner">
          <img src="petrelinquishment.png" alt="" />
        </div>
        <h2 className="apph2" style={{ marginTop: "4.75rem" }} id="relinquish">
          Relinquish a pet
        </h2>
        <div className="appDiv">
          <p className="appp">
            Giving up a dog, in many cases, can be an extremely hard thing to
            do. If you realize you are unable to support your pet, please fill
            out the following form to coordinate a drop off to us. Assuredly, we
            will support you through this tough process.
          </p>
          {/* {switchButton()} */}
          <div className="linebreak"></div>
          <form>
            <label>
              <div className="enterDiv">
                <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                  What is your name?
                </p>
                <input
                  type="text"
                  className="textInput"
                  placeholder="Your Name"
                  name="name"
                  value={formInputs.name || ""}
                  onChange={handleTypeChange}
                />
              </div>
            </label>
            <div className="linebreak"></div>
            <label>
              <div className="enterDiv">
                <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                  What is your email?
                </p>
                <input
                  type="text"
                  className="textInput"
                  placeholder="example@email.com"
                  name="email"
                  value={formInputs.email || ""}
                  onChange={handleTypeChange}
                />
              </div>
            </label>
            <div className="linebreak"></div>
            <label>
              <div className="enterDiv">
                <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                  What is your dog's name?
                </p>
                <input
                  type="text"
                  className="textInput"
                  placeholder="Dog Name"
                  name="dogName"
                  value={formInputs.dogName || ""}
                  onChange={handleTypeChange}
                />
              </div>
            </label>
            <div className="linebreak"></div>
            <label>
              <div className="enterDiv">
                <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                  What is your dog's breed?
                </p>
                <input
                  type="text"
                  className="textInput"
                  placeholder="Dog Breed"
                  name="breed"
                  value={formInputs.breed || ""}
                  onChange={handleTypeChange}
                />
              </div>
            </label>
            <div className="linebreak"></div>
            <label>
              <div className="enterDiv">
                <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                  What is your dog's age?
                </p>
                <input
                  type="number"
                  className="textInput"
                  placeholder="Dog Age"
                  name="age"
                  value={formInputs.age || ""}
                  onChange={handleTypeChange}
                />
              </div>
            </label>
            <div className="linebreak"></div>
            <label>
              <div className="enterDiv">
                <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                  What is your dog's weight (In lbs)?
                </p>
                <input
                  type="number"
                  className="textInput"
                  placeholder="Dog Weight"
                  name="weight"
                  value={formInputs.weight || ""}
                  onChange={handleTypeChange}
                />
              </div>
            </label>
            <div className="linebreak"></div>
            <label>
              <div className="enterDiv">
                <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                  What is your dog's gender?
                </p>
                <input
                  type="text"
                  className="textInput"
                  placeholder="Dog Gender"
                  name="gender"
                  value={formInputs.gender || ""}
                  onChange={handleTypeChange}
                />
              </div>
            </label>
            <div className="linebreak"></div>
            <label>
              <div className="enterDiv">
                <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                  Describe your dog's temperament.
                </p>
                <input
                  type="textarea"
                  className="textInput textarea"
                  placeholder="Response here"
                  name="temperament"
                  value={formInputs.temperament || ""}
                  onChange={handleTypeChange}
                />
              </div>
            </label>
            <div className="linebreak"></div>
            <label>
              <div className="enterDiv">
                <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                  Describe your reason for relinquishing your dog.
                </p>
                <input
                  type="textarea"
                  className="textInput textarea"
                  placeholder="Response here"
                  name="reason"
                  value={formInputs.reason || ""}
                  onChange={handleTypeChange}
                />
              </div>
            </label>
            <div className="linebreak"></div>
            <label>
              <div className="enterDiv">
                <p
                  style={{
                    marginTop: "12px",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                >
                  Which dates works best for you to meet with us in person at
                  Small Paws? We will follow up to arrange a time for a
                  consultation.
                </p>
                <input
                  type="textarea"
                  className="textInput textarea"
                  placeholder="Dates here"
                  name="reason"
                  value={formInputs.reason || ""}
                  onChange={handleTypeChange}
                />
              </div>
            </label>
            <div className="linebreak"></div>
            <input
              className="button"
              type="submit"
              value="Submit"
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                width: "calc(100% - 40px)",
              }}
            />
          </form>
        </div>
        <p style={{ height: "4rem" }}></p>
        <div className="nav">
          <div className="navImages">
            <Link to="/home">
              <img src="homegrey.png" alt="" />
            </Link>
            <Link to="/pets">
              <img src="petsgrey.png" alt="" />
            </Link>
            <Link to="/help">
              <img src="helpgrey.png" alt="" />
            </Link>
            <Link to="/account">
              <img src="accountgrey.png" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Relinquish;

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
