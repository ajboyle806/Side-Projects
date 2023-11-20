import './App.css';
import React from 'react'
import {useState} from 'react'
import Head from "./Head"
import articles from "./articles"
import {Nav1} from "./Nav"

const destination = (object) => {
  if (data.indexOf(object) != 0) {
    return "Destination #" + (data.indexOf(object) + 1).toString();
  } else {
    return "Top Destination";
  }
};

function App() {
  return (
    <section id="app">
      <div id="container">
        <Head />
        <List />
        <Nav1 />
      </div>
    </section>
  );
}

function List() {
  const showPopup = () => {
    if (popup){
      return (
        <div className="boxDiv white">
          <h3 className="positionedHeader">Welcome!</h3>
          <p className="boxedParagraph">
            The process of finding colleges that fit your tastes and getting
            into them can be very arduous and daunting! Almost 40% of students
            may transfer to a different school during their post secondary
            education, so we hope to help you find the school of your dreams on
            the first try!<br></br>
            <br />
            On this page, we have provided a variety of different articles that
            we think will help you through the college admissions process, and
            keep you informed.
            <br />
            <br />
            On the forum page, you have the opportunity to ask questions,
            provide advice, and simply converse about all that is related to
            college.
            <br />
            <br />
            On the explore page, you can scroll through colleges that are
            recommended to you based upon what you enter into the profile page.
            <br />
            <br />
            On the college list page you can store colleges from the explore page that
            you are interested in, and as on the explore page, you can get
            directions to them, and basic information about them.
            <br />
            <br />
            On the profile page, you can log in and create an account for the
            app. Once you do this, you can enter profile information, interact
            with others on the forum, get college recommendations, and create a
            personal college list on the other pages.
          </p>
          <div className="listButtonDiv">
            <button className="listButton redRemove" onClick={()=>{
              popup = false;
              setPopup(false);
            }}>
              <h3>Close message</h3>
            </button>
          </div>
        </div>
      );
    }
  }
  let [popup, setPopup] = useLocalStorage("popup", true);
  return (
    <>
      {showPopup()}
      <h3 className="positionedHeader">Navigation</h3>
      <div className="listItem">
        <div className="listButtonDiv">
          <button className="listButton">
            <a href="/discuss">
              <h3>Forum Page</h3>
            </a>
          </button>
        </div>
        <div className="listButtonDiv">
          <button className="listButton">
            <a href="/find">
              <h3>Explore Page</h3>
            </a>
          </button>
        </div>
        <div className="listButtonDiv">
          <button className="listButton">
            <a href="/saved">
              <h3>College List Page</h3>
            </a>
          </button>
        </div>
        <div className="listButtonDiv">
          <button className="listButton">
            <a href="/account">
              <h3>Profile Page</h3>
            </a>
          </button>
        </div>
      </div>
      <h3 className="positionedHeader">College Admission News and Resources</h3>
      {articles.map((object) => {
        const { title, photo, link, description, author } = object;
        return (
          <div key={Math.random()}>
            <div className="listItem">
              <a href={link}>
                <img src={photo} width="460px" />
              </a>
              <h3 className="listPlace" style={{ fontSize: "1.1rem" }}>
                <q>{title}</q> by {author}
              </h3>
              <p className="listDescription" style={{ fontSize: "1rem" }}>
                {description}
              </p>
              <div className="listButtonDiv">
                <button className="listButton">
                  <a href={link} target="_blank">
                    <h3>Learn More!</h3>
                  </a>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default App;

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