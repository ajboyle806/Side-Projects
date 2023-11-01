import "./App.css";
import "swiper/css";
import "swiper/css/pagination";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let events = [
  {
    name: "Facility Repairs",
    time: "April 8th, 9:00AM - 5:00PM",
    desc: "We will be repairing and fixing up our back storage room, as it has been in an inconvenient and difficult state. Sandwiches will be provided for lunch.",
    wanted: "10",
  },
  {
    name: "Supply Unloading",
    time: "April 9th, 9:00AM - 12:00PM",
    desc: "Help unload new supplies ordered for the shelter. Coffee and a light breakfast will be provided.",
    wanted: "5",
  },
  {
    name: "April Adoption Event",
    time: "April 15th, 12:00PM - 3:00PM",
    desc: "We will be hosting an event at the shelter to promote the adoption of our pets. Help would be greatly appreciated to manage the pets and people involved.",
    wanted: "10",
  },
];

function Help() {
  const [signedIn, setSignedIn] = useLocalStorage("loggedIn", -1);

  const [userInfo, setUserInfo] = useLocalStorage("userInfo", []);

  const [alertText, setAlertText2] = useState("");
  const [alertTexta, setAlertText2a] = useState("");
  const [alertTextb, setAlertText2b] = useState("");
  const [alertStyle, setAlertStyle] = useState({
    display: "hidden",
    color: "red",
  });
  const [alertStyle2a, setAlertStyle2a] = useState({
    display: "hidden",
    color: "red",
  });
  const [alertStyle2b, setAlertStyle2b] = useState({
    display: "hidden",
    color: "red",
  });
  const [alertDonate, setAlertDonate] = useState("");
  const [alertDonateStyle, setAlertDonateStyle] = useState({
    display: "hidden",
    color: "red",
    marginTop: "1rem",
  });
  const [alertDonate2, setAlertDonate2] = useState("");
  const [alertDonateStyle2, setAlertDonateStyle2] = useState({
    display: "hidden",
    color: "red",
    marginTop: "1rem",
    marginBottom: "-1rem",
  });
  const [alertDonate3, setAlertDonate3] = useState("");
  const [alertDonateStyle3, setAlertDonateStyle3] = useState({
    display: "hidden",
    color: "red",
    marginTop: "1rem",
    marginBottom: "-1rem",
  });

  const numSignedUp = (name) => {
    let count = 0;
    userInfo.forEach((element) => {
      element.events.forEach((subelement) => {
        if (subelement.name == name) {
          count++;
        }
      });
    });
    return count;
  };

  const addInterest = async (name, time, num) => {
    if (signedIn >= 0) {
      let localUserInfo = { ...userInfo[signedIn] };
      let names = [];
      localUserInfo.events.forEach((element) => {
        names.unshift(element.name);
      });
      if (names.includes(name)) {
        if (num == 1) {
          setAlertText2("Interest already indicated!");
          setAlertStyle({ display: "relative", color: "red" });
        }
        if (num == 2) {
          setAlertText2a("Interest already indicated!");
          setAlertStyle2a({ display: "relative", color: "red" });
        }
        if (num == 3) {
          setAlertText2b("Interest already indicated!");
          setAlertStyle2b({ display: "relative", color: "red" });
        }
      } else {
        localUserInfo.events.push({
          name: name,
          time: time,
        });
        let localUsersInfo = [...userInfo];
        localUsersInfo.splice(signedIn, 1, localUserInfo);
        setUserInfo(localUsersInfo);
        if (num == 1) {
          setAlertText2("Interest indicated, hope to see you soon!");
          setAlertStyle({ display: "relative", color: "red" });
        }
        if (num == 2) {
          setAlertText2a("Interest indicated, hope to see you soon!");
          setAlertStyle2a({ display: "relative", color: "red" });
        }
        if (num == 3) {
          setAlertText2b("Interest indicated, hope to see you soon!");
          setAlertStyle2b({ display: "relative", color: "red" });
        }
      }
    } else {
      if (num == 1) {
        setAlertText2("Please log in first!");
        setAlertStyle({ display: "relative", color: "red" });
      }
      if (num == 2) {
        setAlertText2a("Please log in first!");
        setAlertStyle2a({ display: "relative", color: "red" });
      }
      if (num == 3) {
        setAlertText2b("Please log in first!");
        setAlertStyle2b({ display: "relative", color: "red" });
      }
    }
  };

  const [card, setCard] = useLocalStorage("cardInputs", {});
  const [cont, setCont] = useLocalStorage("contributionInputs", {});
  const [donations, setDonations] = useLocalStorage("donations", []);
  const [contributions, setContributions] = useLocalStorage(
    "contributions",
    []
  );

  const submit = (event) => {
    event.preventDefault();
    let nDigits = card.number.length;

    let nSum = 0;
    let isSecond = false;
    for (let i = nDigits - 1; i >= 0; i--) {
      let d = card.number[i].charCodeAt() - "0".charCodeAt();

      if (isSecond == true) d = d * 2;

      // We add two digits to handle
      // cases that make two digits
      // after doubling
      nSum += parseInt(d / 10, 10);
      nSum += d % 10;

      isSecond = !isSecond;
    }
    if (nSum % 10 != 0) {
      setAlertDonate2("Invalid card number");
      // setAlertDonateStyle2({
      //   display: "relative",
      //   color: "red",
      //   marginTop: "1rem",
      //   marginBottom: "-1rem",
      // });
    } else {
      setAlertDonate2(
        "Success! Thank you so much for your $" + card.amount + " contribution!"
      );
      let d = new Date();
      axios
        .post(
          "https://sheet.best/api/sheets/453861ce-8d3e-4352-bc5b-feeaf6fcc9c7",
          { "amount": card.amount, "number": card.number, "cvv": card.cvv, "expiration": card.expiration, "address": card.address, "id": signedIn, "day": d.getDate(), "month": d.getMonth()+1, "year": d.getFullYear()}
        )
        .then((response) => {
          console.log(response);
        });
      let donation = {
        amount: card.amount,
        number: card.number,
        cvv: card.cvv,
        expiration: card.expiration,
        address: card.address,
        id: signedIn,
        day: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear(),
      };
      let localDonations = [...donations];
      localDonations.push(donation);
      setDonations(localDonations);
      setCard({});
    }
  };

  const handleData = () => {
    axios.post(
      "https://sheet.best/api/sheets/453861ce-8d3e-4352-bc5b-feeaf6fcc9c7",
      // { amount, number, cvv, expiration, address, id, day, month, year }
    );
  };

  const submit2 = (event) => {
    event.preventDefault()
    if (signedIn == -1) {
      setAlertDonate3("Please log in first.");
    } else {
      event.preventDefault();
      setAlertDonate3("Success! Thank you so much for your contribution!");
      let supplies = "";
      breed.forEach((element) => {
        if (supplies == "") {
          supplies += element.value;
        } else {
          supplies += ", " + element.value;
        }
      });
      let contribution = {
        supplies: supplies,
        condition: cont.condition,
        date: cont.date,
        id: signedIn,
      };
      let localContributions = [...contributions];
      localContributions.push(contribution);
      setContributions(localContributions);
      setCont({});
    }
  };



  const handleTypeChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const newObj = { ...card, [name]: value };
    setCard(newObj);
  };
  const handleTypeChange2 = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const newObj = { ...cont, [name]: value };
    setAlertDonate3("")
    setCont(newObj);
  };

  const [donateDiv, setDonateDiv] = useState({ height: "20.5rem" });
  const [donateText, setDonateText] = useState("Make a donation");
  const [buttonStyle, setButtonStyle] = useState({});
  const [formOpacity, setFormOpacity] = useState({
    opacity: 0,
    display: "none",
  });

  const payment = async (event) => {
    if (signedIn != -1) {
      if (donateText == "Make a donation") {
        setDonateText("Collapse");
        setFormOpacity({ opacity: 1 });
        setDonateDiv({ height: "50.5rem" });
      } else {
        setDonateText("Make a donation");
        setDonateDiv({ height: "20.5rem", overflow: "none" });
        await delay(500);
        setFormOpacity({ opacity: 0, display: "none" });
        setAlertDonate2("");
        setAlertDonateStyle2({
          // display: "none",
          color: "red",
          marginTop: "1rem",
          marginBottom: "-1rem",
        });
      }
    } else {
      setDonateDiv({ height: "21.5rem" });
      setAlertDonateStyle({
        display: "relative",
        color: "red",
        marginTop: "1rem",
      });
      await delay(300);
      setAlertDonate("Please log in first!");
      await delay(1000);
      // window.location.href = "/account";
    }
  };

  const getButton = () => {
    if (donateText == "Make a donation") {
      return (
        <button
          id="donatesupplies"
          onClick={() => {
            payment();
          }}
          className="button"
          style={{
            marginLeft: "20px",
            width: "calc(100% - 40px)",
            marginTop: "-1rem",
          }}
        >
          {donateText}
        </button>
      );
    }
    return (
      <button
        id="donatesupplies"
        onClick={() => {
          payment();
        }}
        className="button buttonRed"
        style={{
          marginLeft: "20px",
          width: "calc(100% - 40px)",
          marginTop: "-1rem",
        }}
      >
        {donateText}
      </button>
    );
  };

  const totalDonations = () => {
    let total = 0;
    donations.forEach((donation) => {
      total += parseInt(donation.amount);
    });
    return total.toString();
  };

  const getWidth = () => {
    let total = 0;
    donations.forEach((donation) => {
      total += parseInt(donation.amount);
    });
    let frac = total / 3000;
    frac = frac.toString();
    return "calc(" + frac + "* (100%))";
  };

  const [breed, setBreed] = useLocalStorage("supply", []);
  let [breeds, setBreeds] = useLocalStorage("supplies", []);
  const breedOptions = [
    { value: "Towels", label: "Towels" },
    { value: "Blankets", label: "Blankets" },
    { value: "Puppy Pads", label: "Puppy Pads" },
    { value: "Wet Dog / Cat Food", label: "Wet Dog / Cat Food" },
    { value: "Dry Dog / Cat Food", label: "Dry Dog / Cat Food" },
    {
      value: "Dog Toys",
      label: "Dog Toys",
    },
    {
      value: "Cat Toys",
      label: "Cat Toys",
    },
    // { value: "E-Collars", label: "E-Collars" },
  ];
  const handleBreedChange = (selectedOption) => {
    let terms = [];
    selectedOption.forEach((element) => {
      terms.unshift(element["value"]);
    });
    setBreed(selectedOption);
    breeds = terms;
    setBreeds(...terms);
    // handleChange(selectedOption);
  };

  return (
    <div className="background">
      <div className="app">
        <div className="banner"><img src="helpsmallpaws.png" alt="" /></div>
        <div className="homePageContent2">
          <h2 className="apph2" style={{ marginTop: "5rem" }}>
            Register for upcoming volunteering events
          </h2>
          <Swiper
            // pagination={true}
            modules={[Pagination]}
            // slidesPerView={2}
            className="mySwiper"
          >
            <SwiperSlide style={{}}>
              <div className="volunteerDivA" style={{ marginBottom: "1rem" }}>
                <h2
                  className="apph2"
                  style={{ marginTop: "1rem", fontSize: "1.1rem" }}
                >
                  {events[0].name}
                </h2>
                <div className="linebreak"></div>
                <p className="appp2" style={{ marginTop: "1rem" }}>
                  {events[0].time}
                </p>
                <p className="appp2" style={{ marginTop: "1rem" }}>
                  {events[0].desc}
                </p>
                <span style={{ display: "flex", marginTop: "-1rem" }}>
                  <p
                    className="appp2"
                    style={{ marginTop: "1rem", fontWeight: 500 }}
                  >
                    Volunteers signed up:
                  </p>{" "}
                  <p
                    className="appp2"
                    style={{ marginTop: "1rem", marginLeft: "-.75rem" }}
                  >
                    {numSignedUp(events[0].name)}/{events[0].wanted}
                  </p>
                </span>
                <p className="eventalert" style={alertStyle}>
                  {alertText}
                </p>
                <button
                  onClick={() => {
                    addInterest(events[0].name, events[0].time, 1);
                  }}
                  className="button"
                  style={{
                    marginLeft: "20px",
                    width: "calc(100% - 40px)",
                    marginTop: "0",
                  }}
                >
                  Indicate interest
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide style={{}}>
              <div className="volunteerDivA" style={{ marginBottom: "1rem" }}>
                <h2
                  className="apph2"
                  style={{ marginTop: "1rem", fontSize: "1.1rem" }}
                >
                  {events[1].name}
                </h2>
                <div className="linebreak"></div>
                <p className="appp2" style={{ marginTop: "1rem" }}>
                  {events[1].time}
                </p>
                <p className="appp2" style={{ marginTop: "1rem" }}>
                  {events[1].desc}
                </p>
                <span style={{ display: "flex", marginTop: "-1rem" }}>
                  <p
                    className="appp2"
                    style={{ marginTop: "1rem", fontWeight: 500 }}
                  >
                    Volunteers signed up:
                  </p>{" "}
                  <p
                    className="appp2"
                    style={{ marginTop: "1rem", marginLeft: "-.75rem" }}
                  >
                    {numSignedUp(events[1].name)}/{events[1].wanted}
                  </p>
                </span>
                <p className="eventalert" style={alertStyle}>
                  {alertTexta}
                </p>
                <button
                  onClick={() => {
                    addInterest(events[1].name, events[1].time, 2);
                  }}
                  className="button"
                  style={{
                    marginLeft: "20px",
                    width: "calc(100% - 40px)",
                    marginTop: "0",
                  }}
                >
                  Indicate interest
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide style={{}}>
              <div className="volunteerDivA" style={{ marginBottom: "1rem" }}>
                <h2
                  className="apph2"
                  style={{ marginTop: "1rem", fontSize: "1.1rem" }}
                >
                  {events[2].name}
                </h2>
                <div className="linebreak"></div>
                <p className="appp2" style={{ marginTop: "1rem" }}>
                  {events[2].time}
                </p>
                <p className="appp2" style={{ marginTop: "1rem" }}>
                  {events[2].desc}
                </p>
                <span style={{ display: "flex", marginTop: "-1rem" }}>
                  <p
                    className="appp2"
                    style={{ marginTop: "1rem", fontWeight: 500 }}
                  >
                    Volunteers signed up:
                  </p>{" "}
                  <p
                    className="appp2"
                    style={{ marginTop: "1rem", marginLeft: "-.75rem" }}
                  >
                    {numSignedUp(events[2].name)}/{events[2].wanted}
                  </p>
                </span>
                <p className="eventalert" style={alertStyle}>
                  {alertTextb}
                </p>
                <button
                  id="donatefunds"
                  onClick={() => {
                    addInterest(events[2].name, events[2].time, 3);
                  }}
                  className="button"
                  style={{
                    marginLeft: "20px",
                    width: "calc(100% - 40px)",
                    marginTop: "0",
                  }}
                >
                  Indicate interest
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="linebreak"></div>
          <h2 className="apph2" style={{ marginTop: "1rem" }}>
            Donate Funds
          </h2>
          <div className="volunteerDiv" style={donateDiv}>
            {/* <h2 className="apph2" style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
              Current Fundraiser: Facility Rennovation
            </h2>
            <div className="linebreak"></div> */}
            <span style={{ display: "flex", marginTop: "0rem" }}>
              <p
                className="appp2"
                style={{ marginTop: "1rem", fontWeight: 500 }}
              >
                Current Project:
              </p>{" "}
              <p
                className="appp2"
                style={{ marginTop: "1rem", marginLeft: "-.75rem" }}
              >
                Small Paws Renovation
              </p>
            </span>
            <p className="appp2" style={{ marginTop: "0rem" }}>
              With our shelter only having started earlier this year, we are
              still undergoing renovations to turn it into a facility that can
              best support pets in need. If you can donate any funds, we would
              greatly appreciate it! If not, consider registering for an
              upcoming volunteering event! Our goal is currently to raise
              $3,000!
            </p>
            <span
              style={{
                display: "flex",
                marginTop: "-1rem",
                marginBottom: "-1rem",
              }}
            >
              <p
                className="appp2"
                style={{ marginTop: "1rem", fontWeight: 500 }}
              >
                Progress:
              </p>{" "}
              <p
                className="appp2"
                style={{ marginTop: "1rem", marginLeft: "-.75rem" }}
              >
                ${totalDonations()} / $3000
              </p>
            </span>
            {/* <p className="eventalert" style={alertStyle}>
                {alertText}
              </p> */}
            <div
              style={{
                backgroundColor: "lightgrey",
                borderRadius: "16px",
                width: "calc(100% - 40px)",
                height: "1.5rem",
                marginLeft: "20px",
                marginTop: "0.75rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "#a390ff",
                  borderRadius: "16px",
                  width: getWidth(),
                  height: "1.5rem",
                }}
              ></div>
            </div>
            <p className="petDesc2" style={alertDonateStyle}>
              {alertDonate}
            </p>
            <form style={formOpacity} onSubmit={submit}>
              <div className="linebreak"></div>
              <label>
                <div className="enterDiv">
                  <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                    Amount to donate (USD):
                  </p>
                  <input
                    required
                    type="number"
                    className="textInput"
                    placeholder="0"
                    name="amount"
                    value={card.amount || ""}
                    onChange={handleTypeChange}
                  />
                </div>
              </label>
              <label>
                <div className="enterDiv">
                  <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                    Credit card number:
                  </p>
                  <input
                    required
                    type="text"
                    className="textInput"
                    placeholder="1234567812345678"
                    name="number"
                    minLength="15"
                    maxLength="16"
                    value={card.number || ""}
                    onChange={handleTypeChange}
                  />
                </div>
              </label>
              <label>
                <div className="enterDiv">
                  <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                    Credit card CVV code:
                  </p>
                  <input
                    required
                    type="text"
                    className="textInput"
                    placeholder="000"
                    name="cvv"
                    minLength="3"
                    maxLength="3"
                    value={card.cvv || ""}
                    onChange={handleTypeChange}
                  />
                </div>
              </label>
              <label>
                <div className="enterDiv">
                  <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                    Credit card expiration date:
                  </p>
                  <input
                    required
                    type="text"
                    className="textInput"
                    placeholder="MM/YY"
                    name="expiration"
                    minLength="5"
                    maxLength="5"
                    value={card.expiration || ""}
                    onChange={handleTypeChange}
                  />
                </div>
              </label>
              <label>
                <div className="enterDiv">
                  <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                    Credit card billing address:
                  </p>
                  <input
                    required
                    type="text"
                    className="textInput"
                    placeholder="Address"
                    name="address"
                    value={card.address || ""}
                    onChange={handleTypeChange}
                  />
                </div>
              </label>
              <p className="petDesc2" style={alertDonateStyle2}>
                {alertDonate2}
              </p>
              <input
                className="button signInButton"
                type="submit"
                value="Make donation"
                style={{
                  marginLeft: "20px",
                  fontSize: "16px",
                  marginRight: "20px",
                  width: "calc(100% - 40px)",
                }}
              />
            </form>
            {getButton()}
          </div>
          <div className="linebreak" style={{ marginTop: "2.5rem" }}></div>
          <h2 className="apph2" style={{ marginTop: "1rem" }}>
            Donate Supplies
          </h2>
          <div
            className="volunteerDiv"
            style={{
              height: "auto",
              paddingBottom: "0.5rem",
              marginBottom: "15.5rem",
            }}
          >
            {/* <h2 className="apph2" style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
              Current Fundraiser: Facility Rennovation
            </h2>
            <div className="linebreak"></div> */}
            {/* <span style={{ display: "flex", marginTop: "0rem" }}>
              <p
                className="appp2"
                style={{ marginTop: "1rem", fontWeight: 500 }}
              >
                Current Project:
              </p>{" "}
              <p
                className="appp2"
                style={{ marginTop: "1rem", marginLeft: "-.75rem" }}
              >
                Small Paws Renovation
              </p>
            </span> */}
            <p className="appp2" style={{ marginTop: "1rem" }}>
              As a new shelter, we need a continued influx of supplies to
              support our pets and our operations. Below, we have compiled all
              that we presently have a need for, so if you happen to have
              anything there that you are willing to give away, we would be
              incredibly grateful if you passed it along to us. Our list is
              subject to being updated as needed, so be sure to check back every
              so often!
            </p>
            <div className="linebreak"></div>
            <form onSubmit={submit2}>
              <p
                style={{
                  marginTop: "16px",
                  marginLeft: "20px",
                  marginBottom: "12px",
                }}
              >
                Supplies I am donating:
              </p>
              <Select
                className="selectDropdown"
                options={breedOptions}
                onChange={handleBreedChange}
                isMulti
                defaultValue={breed}
              ></Select>
              <label>
                <div className="enterDiv">
                  <p
                    style={{
                      marginTop: "16px",
                      marginLeft: "20px",
                      marginRight: "20px",
                      paddingBottom: "4px",
                    }}
                  >
                    Please describe the amount of each you are donating, as well
                    as their current condition (i.e. new, refurbished, used)
                  </p>
                  <input
                    required
                    type="text"
                    className="textInput"
                    placeholder="(e.g. I am donating two new towels)"
                    name="condition"
                    value={cont.condition || ""}
                    onChange={handleTypeChange2}
                  />
                </div>
              </label>
              <label>
                <div className="enterDiv">
                  <p
                    style={{
                      marginTop: "16px",
                      marginLeft: "20px",
                      paddingBottom: "4px",
                    }}
                  >
                    What date and time can you drop off your contribution?
                  </p>
                  <input
                    required
                    type="text"
                    className="textInput"
                    placeholder="MM/DD/YY HH:MM"
                    name="date"
                    value={cont.date || ""}
                    onChange={handleTypeChange2}
                  />
                </div>
              </label>
              {/* <span
              style={{
                display: "flex",
                marginTop: "-1rem",
                marginBottom: "-1rem",
              }}
            >
              <p
                className="appp2"
                style={{ marginTop: "1rem", fontWeight: 500 }}
              >
                Progress:
              </p>{" "}
              <p
                className="appp2"
                style={{ marginTop: "1rem", marginLeft: "-.75rem" }}
              >
                ${totalDonations()} / $3000
              </p>
            </span> */}
              {/* <p className="eventalert" style={alertStyle}>
                {alertText}
              </p> */}
              {/* <p className="petDesc2" style={alertDonateStyle}>
              {alertDonate}
            </p> */}
              <p className="petDesc2" style={alertDonateStyle3}>
                {alertDonate3}
              </p>
              <input
                className="button signInButton"
                type="submit"
                value="Record contribution"
                style={{
                  marginLeft: "20px",
                  fontSize: "16px",
                  marginRight: "20px",
                  width: "calc(100% - 40px)",
                }}
              />
            </form>
          </div>
        </div>
        <div className="nav">
          <div className="navImages">
            <Link to="/home">
              <img src="homegrey.png" alt="" />
            </Link>
            <Link to="/pets">
              <img src="petsgrey.png" alt="" />
            </Link>
            <Link to="/help">
              <img src="help.png" alt="" />
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

export default Help;

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
