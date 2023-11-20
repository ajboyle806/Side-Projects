import React from "react";
import { useState, useEffect, useRef, useLayoutEffect, useCallback} from "react";
import { CSSTransition } from "react-transition-group";
import { animated, useTransition, useSpring } from "react-spring";
import Carousel from "@itseasy21/react-elastic-carousel";
import "./App.css";
import axios from "axios";

const activities = [
  {
    img: "https://i.ibb.co/3RJhNz6/Screenshot-2022-08-20-192220.jpg",
    title: "Leadership Conference",
    desc: "Every November, the Technology Student Association holds a leadership conference where club officers go to improve their leadership abilities and compete against officers from other chapters in a design challenge",
  },
  {
    img: "https://i.ibb.co/dtqDSrD/IMG-3666.jpg",
    title: "H2 Car Challenge",
    desc: "The Hydrogen Car Challenge (H2 Challenge) requires students to design, build and race alternative energy model cars. In the process of designing their car, students learn about fuel cell technology. They are also required to submit a video journal, which presents the team’s concepts, designs and comments.",
  },
  {
    img: "https://i.ibb.co/mN3jGJz/IMG-9119.jpg",
    title: "STEM Fair Visit",
    desc: "Annually, our STEM Club / TSA Chapter tries to attend the elementary school STEM Fairs as to introduce younger students to the high school's STEM program at a younger age.",
  },
  {
    img: "https://i.ibb.co/k4WvcYx/engineering-design.jpg",
    title: "Engineering Design",
    desc: 'Participants develop a solution to an annual theme that is based on a specific challenge noted by the National Academy of Engineering (NAE) in its compilation of the grand challenges for engineering in the 21st century. The solution will include a documentation portfolio, a display, and a model/prototype. Semifinalists deliver a presentation and participate in an interview. The 2023 competition theme is "Preventing Nuclear Terror".',
  },
  {
    img: "https://i.ibb.co/ZNBJ12L/debate.jpg",
    title: "Debating Technological Issues",
    desc: "Participants research the annual topic and subtopics and prepare for a debate against a team from another chapter. Teams are instructed to take either the pro or con side of a selected subtopic, submit a summary of references, and use their research to support their assigned position. The quality of a team’s debate determines semifinalists and finalists.",
  },
  {
    img: "https://i.ibb.co/8r5k8jv/periscope.jpg",
    title: "Optical Engineering",
    desc: "Participants work as part of a team to design and fabricate an optical device that meets a specific need. The focus will be on the design process; participants should incorporate innovation into their entry/solution.",
  },
  {
    img: "https://i.ibb.co/9ZJkx38/A16-C7-FB1-3-E40-4626-9-DA9-EB23-C3-EC3-B21.jpg",
    title: "Coding",
    desc: "Participants work as part of a team to design and fabricate an optical device that meets a specific need. The focus will be on the design process; participants should incorporate innovation into their entry/solution.",
  },
  {
    img: "https://i.ibb.co/tsffxD8/boardgamedesign.jpg",
    title: "Board Game Design",
    desc: "Participants develop, build, and package a board game that focuses on a subject of their choice. Creative packaging, and the instructions, pieces, and cards associated with the pilot game will be evaluated. Semifinalists set up the game, demonstrate how the game is played, explain the game’s features, and discuss the design process.",
  },
];

const officerCardInfo = [
  {
    name: "Rachael Fintz",
    position: "Advisor",
    img: "",
  },
  {
    name: "AJ Boyle",
    position: "President",
    img: "",
  },
  {
    name: "Brandon Maneely",
    position: "Vice President",
    img: "",
  },
  {
    name: "Sebastian Mercado",
    position: "Secretary",
    img: "",
  },
  {
    name: "Brandon",
    position: "Treasurer",
    img: "",
  },
  {
    name: "Ram",
    position: "Reporter",
    img: "",
  },
  {
    name: "Cleo",
    position: "Sergeant",
    img: "",
  },
];

const csvToJson = (str, delimiter = ",") => {
  const titles = str.slice(0, str.indexOf("\n")).split(delimiter);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  return rows.map((row) => {
    const values = row.split(delimiter);
    return titles.reduce(
      (object, curr, i) => ((object[curr] = values[i]), object),
      {}
    );
  });
};

const App = () => {
  const [scrolledDown, setScrolledDown] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [APIdata, setAPIdata] = useState([]);
  useEffect(() => {
    const url = "https://docs.google.com/spreadsheets/d/1b8kFG8hkBBTpFcoGSD8SpjijptW_fQZrlj7Y6o8YhLM/export?format=csv";
    fetch(url).then(result=>result.text()).then((csvtext)=>{
      setAPIdata(csvToJson(csvtext));
    });
  }, []);
  const [margin, setMargin] = useState({
    paddingTop: "2.1875rem",
    paddingBottom: "2.1875rem",
  });
  let vars = 500;
  const fadeIn = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(-3.5rem)",
      transform: "scale(0.75)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
      transform: "scale(1)",
    },
    config: {
      duration: 700,
    },
  });
  const fadeIn2 = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      duration: 700,
    },
  });
  const [height, setHeight] = useState(10000);
  const [height2, setHeight2] = useState(0);
  const [height3, setHeight3] = useState(0);
  const [height4, setHeight4] = useState(0);
  const [height5, setHeight5] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);
  const homeRef = useRef(null);
  const homeRef2 = useRef(null);
  const homeRef3 = useRef(null);
  const homeRef4 = useRef(null);
  const homeRef5 = useRef(null);
  const mainRef = useRef(null);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    if (position > 0) {
      setScrolledDown(true);
      setMargin({ paddingTop: "1.4875rem", paddingBottom: "1.4875rem" });
    } else {
      setScrolledDown(false);
      setMargin({ paddingTop: "2.1875rem", paddingBottom: "2.1875rem" });
    }
  };
  const setHeights = () => {
    setHeight(homeRef.current.getBoundingClientRect().height);
    setHeight2(homeRef2.current.getBoundingClientRect().height);
    setHeight3(homeRef3.current.getBoundingClientRect().height);
    setHeight4(homeRef4.current.getBoundingClientRect().height);
    setHeight5(homeRef5.current.getBoundingClientRect().height);
    setTotalHeight(mainRef.current.getBoundingClientRect().height);
  };
  const styleNavLinks = (linkNum) => {
    if (
      totalHeight - window.innerHeight < scrollPosition + 1 && totalHeight != 0
    ) {
      if (linkNum == 5) {
        return { color: "white" };
      }
      return {};
    }
    if (scrollPosition < height - 70) {
      if (linkNum == 1) {
        return { color: "white" };
      }
    } else if (scrollPosition < height + height2 - 70) {
      if (linkNum == 2) {
        return { color: "white" };
      }
    } else if (scrollPosition < height + height2 + height3 - 70) {
      if (linkNum == 3) {
        return { color: "white" };
      }
    } else if (scrollPosition < height + height2 + height3 + height4 - 70 ) {
      if (linkNum == 4 && totalHeight - window.innerHeight >= scrollPosition) {
        return { color: "white" };
      }
    } else if (scrollPosition < height + height2 + height3 + height4 + height5 - 70) {
      if (linkNum == 5) {
        return { color: "white" };
      }
    }
    return {};
  };
  const [contactDivHover, setContactDivHover] = useState(false);
  const contactDivBackgroundStyling = () => {
    if (contactDivHover){
      return {backgroundColor: "white", color: "#6930c3"};
    }
    return {backgroundColor: "rgba(255, 255, 255, 0)", color: "white"}
  };
  const [width, setWidth] = useState(window.innerWidth);
  const [hamburgerMenuActive, setHamburgerMenuActive] = useState(false);
  const renderNavLinks = () => {
    if (width > 1200){
      return (
        <div>
          <div className="navLinks">
            <div className="navButtonContainer" style={margin}>
              <a href="mailto:rfintz@npsdnj.org,boylea@npsdnj.org">
                <button
                  className="navButton"
                  style={contactDivBackgroundStyling()}
                  onMouseEnter={() => {
                    setContactDivHover(true);
                  }}
                  onMouseLeave={() => {
                    setContactDivHover(false);
                  }}
                >
                  CONTACT
                </button>
              </a>
            </div>
            <div className="navLink" style={margin}>
              <a className="navLinkSrc" href="#home" style={styleNavLinks(1)}>
                Home
              </a>
            </div>
            <div className="navLink" style={margin}>
              <a className="navLinkSrc" href="#about" style={styleNavLinks(2)}>
                About
              </a>
            </div>
            <div className="navLink" style={margin}>
              <a className="navLinkSrc" href="#events" style={styleNavLinks(3)}>
                Schedule
              </a>
            </div>
            <div className="navLink" style={margin}>
              <a
                className="navLinkSrc"
                href="#activities"
                style={styleNavLinks(4)}
              >
                Activities
              </a>
            </div>
            <div className="navLink" style={margin}>
              <a
                className="navLinkSrc"
                href="#officers"
                style={styleNavLinks(5)}
              >
                Officers
              </a>
            </div>
            {/* <div className="navLink" style={margin}>
              CTE
            </div> */}
          </div>
        </div>
      );
    }
    return (
      <div className="hamburgerMenuContainer" style={margin} onClick={()=>{setHamburgerMenuActive(!hamburgerMenuActive)}}>
        <div className="hamburgerMenuButton" style={hamburgerMenuTransformation1()}></div>
        <div className="hamburgerMenuButton" style={hamburgerMenuTransformation2()}></div>
        <div className="hamburgerMenuButton" style={hamburgerMenuTransformation3()}></div>
      </div>
    );
  }
  const hamburgerMenuTransformation1 = () => {
    if (hamburgerMenuActive){
      return {transform: "rotate(45deg)"}
    }
  }
  const hamburgerMenuTransformation2 = () => {
    if (hamburgerMenuActive){
      return {opacity: 0};
    }
  }
  const hamburgerMenuTransformation3 = () => {
    if (hamburgerMenuActive){
      return {transform: "rotate(-45deg)"}
    }
  }
  const hamburgerOpacity = () => {
    if (hamburgerMenuActive){
      return {transform: "scaleY(1)"}
    }
  }
  const handleResize = () => {
    setWidth(window.innerWidth);
    if (window.innerWidth > 1200) {
      setHamburgerMenuActive(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", setHeights);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", setHeights);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const getCarouselWidth = () => {
    if (width > 1460) {
      return { width: "82.5rem", margin: "auto" };
    } else if (width > 1000){
      return { width: "45rem", margin: "auto" };
    } else if (width > 850){
      return {width: "42rem", margin: "auto"}
    } else if (width > 600){
      return {width: "35rem", margin: "auto"}
    } else {
      return {width: "29rem", margin: "auto"}
    }
  };
  const getOfficerCardCarouselWidth = () => {
    if (width > 1460) {
      return { width: "80rem", margin: "auto" };
    } else if (width > 1070) {
      return { width: "55.875rem", margin: "auto" };
    } else if (width > 550) {
      return { width: "29.75rem", margin: "auto" };
    } else if (width > 450) {
      return { width: "25.75rem", margin: "auto" };
    } else if (width > 389) {
      return { width: "22.25rem", margin: "auto" };
    }
  }
  const getCarouselShowScroll = () => {
    if (width > 1460) {
      return 2;
    }
    return 1;
  };
  const getOfficerCardCarouselItems = () => {
    if (width > 1460) {
      return 3;
    }
    else if (width > 1070){
      return 2;
    }
    return 1;
  }
  const getHomeDisplayContent = () => {
    if (width > 700){
      return (
        <Carousel
          style={getCarouselWidth()}
          className="homePageContentContainer"
          itemsToShow={getCarouselShowScroll()}
          itemsToScroll={getCarouselShowScroll()}
          transitionMs="800"
          enableMouseSwipe={false}
        >
          <img
            className="homePagePhotoContainer"
            src="https://i.ibb.co/fp9kvhd/tsa1.png"
          ></img>
          <img
            className="homePagePhotoContainer"
            src="https://i.ibb.co/tJpn97K/tsa2.png"
          ></img>
          <img
            className="homePagePhotoContainer"
            src="https://i.ibb.co/RbRb2Sf/290492530-780282503130231-6469739707082549988-n.jpg"
          ></img>
          <img
            className="homePagePhotoContainer"
            src="https://i.ibb.co/hYS6ys8/IMG-9119.jpg"
          ></img>

          <img
            className="homePagePhotoContainer"
            src="https://i.ibb.co/DrqKCpc/Screenshot-2022-08-20-192220.jpg"
          ></img>
          <img
            className="homePagePhotoContainer"
            src="https://i.ibb.co/Y2FHjvm/Screenshot-2022-08-20-194552.jpg"
          ></img>
        </Carousel>
      );
    }
    return (
      <div className="coverDiv">
        <img className="coverImage" src="https://i.ibb.co/HnqyyLW/qrcode.png" />
      </div>
    );
  }
  const mainHeaderText = () => {
    if (width > 700){
      return "Learn to lead in a technical world"
    }
    return "Join New Prov TSA!"
  };
  const gridColumns = () => {
    if(width > 1100){
      return (
        <>
          {getCol1()}
          {getCol2()}
          {getCol3()}
        </>
      );
    }
    else if (width > 750){
      return (
        <>
          {getHalfCol1()}
          {getHalfCol2()}
        </>
      );
    }
    return (
      <>
        {getFullCol()}
      </>
    );
  }
  return (
    <div className="App" ref={mainRef}>
      <animated.div style={fadeIn2}>
        <animated.div className="navContainer">
          <CSSTransition
            in={scrolledDown}
            timeout={500}
            classNames="scrollNav"
            unmountOnExit
          >
            <nav className="scrollNavbar"></nav>
          </CSSTransition>
        </animated.div>
        <animated.div className="mainNavDiv">
          <img
            className="logo"
            style={margin}
            src="https://i.ibb.co/Sy5rCW6/nptsa.png"
          />
          {renderNavLinks()}
        </animated.div>
      </animated.div>
      <div className="hamburgerMenu" style={hamburgerOpacity()}>
        <div className="hamLinks">
          <div className="hamLink">
            <a href="#home" className="hamLinkSrc" style={styleNavLinks(1)}>
              Home
            </a>
          </div>
          <div className="hamLink">
            <a href="#about" className="hamLinkSrc" style={styleNavLinks(2)}>
              About
            </a>
          </div>
          <div className="hamLink">
            <a href="#events" className="hamLinkSrc" style={styleNavLinks(3)}>
              Schedule
            </a>
          </div>
          <div className="hamLink">
            <a
              href="#activities"
              className="hamLinkSrc"
              style={styleNavLinks(4)}
            >
              Activities
            </a>
          </div>
          <div className="hamLink">
            <a href="#officers" className="hamLinkSrc" style={styleNavLinks(5)}>
              Officers
            </a>
          </div>
          {/* <div className="hamLink">CTE</div> */}
          <div className="hamLink">
            <a href="mailto:rfintz@npsdnj.org,boylea@npsdnj.org">
              <button
                className="navButton"
                style={contactDivBackgroundStyling()}
                onMouseEnter={() => {
                  setContactDivHover(true);
                }}
                onMouseLeave={() => {
                  setContactDivHover(false);
                }}
              >
                CONTACT
              </button>
            </a>
          </div>
        </div>
      </div>
      <section ref={homeRef} id="home" className="homePageTop">
        <animated.div style={fadeIn}>
          <div className="homePageTopTextContainer">
            <h1 className="homePageTopText1">{mainHeaderText()}</h1>
            <h2 className="homePageTopText2">
              Join TSA to enter a network of over 300,000 motivated high
              schoolers in STEM. Choose between 40 competitive events and have
              the opportunity to qualify for and compete at an annual national
              conference!
            </h2>
          </div>
          {getHomeDisplayContent()}
        </animated.div>
      </section>
      <section ref={homeRef2} id="about">
        <div id="aboutTextDiv">
          <h1 className="aboutTextHeader">What is TSA?</h1>
          <p className="aboutTextParagraph">
            TSA, also known as the Technology Student Association, is a
            national, non-profit organization of high school and middle school
            student members who are engaged in science, technology, engineering,
            and mathematics (STEM). Since TSA was chartered in 1978, over
            5,000,000 members have participated through competitions,
            intracurricular activities, leadership opportunities, and community
            service. Currently, TSA offers 40 competitive events to high
            schoolers and has over 250,000+ members and 2,500+ active teachers
            between over 2,000 schools, 48 states, and 4 countries.<br></br>
            <br></br>Each year, more than 5,000 of the organizations bright
            members come together at its national conference, where members who
            performed exemplary at the state level have the opportunity to face
            each other at the national level. At this conference, there are
            plenty of opportunities to meet TSA members from all over the
            nation, trade pins, attend sessions, and more!
          </p>
          <div
            className="nationalConferenceDivContainer"
            style={{ marginTop: "2rem" }}
          >
            <div className="nationalConferenceDiv">
              <img
                className="nationalConferenceImg"
                src="https://i.ibb.co/gFCCv0J/nationals2023.jpg"
                alt=""
              />
              <p className="nationalConferenceText">
                TSA Nationals will be held in Louisville, KY in 2023
              </p>
            </div>
            <div className="nationalConferenceDiv">
              <img
                className="nationalConferenceImg"
                src="https://i.ibb.co/pyCCmQC/nationals2024.jpg"
                alt=""
              />
              <p className="nationalConferenceText">
                TSA Nationals will be held in Orlando, FL in 2024
              </p>
            </div>
          </div>
          <h1 className="aboutTextHeader" style={{ marginTop: "2rem" }}>
            Our Chapter
          </h1>
          <p className="aboutTextParagraph">
            New Providence High School has ran a successful TSA chapter for
            multiple years that is frequently competitive in TEAMS in addition
            to the organization's many competitive events. As a Blue CAP
            Chapter, we provide free membership to members and welcome all New
            Providence high schoolers who wish to join, regardless of background
            and experience. Our TSA chapter has been integrated into NPHS's STEM
            Club and Science Competition Club so that we can provide the most
            opportunities to those who are involved.
          </p>
        </div>
      </section>
      <section ref={homeRef3} id="events" className="eventsSection">
        <div id="aboutTextDiv">
          <h1 className="eventsTextHeader">Upcoming Events</h1>
          {APIdata.map((data) => {
            const { day, month, name, desc, time, location } = data;
            return (
              <Events
                day={day}
                month={month}
                name={name}
                desc={desc}
                time={time}
                location={location}
              />
            );
          })}
        </div>
      </section>
      <section ref={homeRef4} id="activities">
        <h1 className="activitiesTextHeader">Popular Activities</h1>
        <div className="gridHolder">{gridColumns()}</div>
      </section>
      <section id="officers" className="officersSection" ref={homeRef5}>
        <h1 className="officersTextHeader">Club Officer Team</h1>
        <Carousel
          className="officersCardCarousel"
          style={getOfficerCardCarouselWidth()}
          itemsToShow={getOfficerCardCarouselItems()}
          itemsToScroll={1}
          transitionMs="800"
          enableMouseSwipe={false}
        >
          {officerCardInfo.map(({ name, position, img }) => {
            return <OfficerCard name={name} position={position} img={img} />;
          })}
        </Carousel>
      </section>
    </div>
  );
}

const getCol1 = () => {
  let colList = []
  for (let i = 0; i < activities.length; i += 3){
    colList.push(activities[i])
  }
  return (
    <div className="gridCol">
      {colList.map((props) => {
        const { img, title, desc } = props;
        return <Activity img={img} title={title} desc={desc} />;
      })}
    </div>
  );
}

const getCol2 = () => {
  let colList = []
  for (let i = 1; i < activities.length; i += 3){
    colList.push(activities[i])
  }
  return (
    <div className="gridCol">
      {colList.map((props) => {
        const { img, title, desc } = props;
        return <Activity img={img} title={title} desc={desc} />;
      })}
    </div>
  );
}

const getCol3 = () => {
  let colList = []
  for (let i = 2; i < activities.length; i += 3){
    colList.push(activities[i])
  }
  return (
    <div className="gridCol">
      {colList.map((props) => {
        const { img, title, desc } = props;
        return <Activity img={img} title={title} desc={desc} />;
      })}
    </div>
  );
}

const getHalfCol1 = () => {
  let colList = [];
  for (let i = 0; i < activities.length; i += 2) {
    colList.push(activities[i]);
  }
  return (
    <div className="gridCol">
      {colList.map((props) => {
        const { img, title, desc } = props;
        return <Activity img={img} title={title} desc={desc} />;
      })}
    </div>
  );
};

const getHalfCol2 = () => {
  let colList = [];
  for (let i = 1; i < activities.length; i += 2) {
    colList.push(activities[i]);
  }
  return (
    <div className="gridCol">
      {colList.map((props) => {
        const { img, title, desc } = props;
        return <Activity img={img} title={title} desc={desc} />;
      })}
    </div>
  );
};

const getFullCol = () => {
  let colList = [];
  for (let i = 0; i < activities.length; i++) {
    colList.push(activities[i]);
  }
  return (
    <div className="gridCol">
      {colList.map((props) => {
        const { img, title, desc } = props;
        return <Activity img={img} title={title} desc={desc} />;
      })}
    </div>
  );
};

const Activity = (props) => {
  const {img, title, desc} = props
  return (
    <div className="activityCard">
      <img
        className="activityImg"
        src={img}
      ></img>
      <h1 className="activityHeader">{title}</h1>
      <p className="activityParagraph">{desc}</p>
    </div>
  );
}

const Events = (props) => {
  const { day, month, name, desc, time, location } = props;
  if (window.innerWidth < 500){
    return (
      <div className="eventComponent">
        <div className="eventDateHolder">
          <div className="eventDayNum">{day}</div>
          <div className="eventMonth">{month}</div>
        </div>
        <div className="eventDescHolder">
          <div>
            <h2>{name.replace(/;/gi, ",").replace(/\\/gi, '"')}</h2>
          </div>
          <div>
            <p>{desc.replace(/;/gi, "\"").replace(/\\/gi, '"')}</p>
          </div>
          <div>
            <p>{time.replace(/;/gi, ",").replace(/\\/gi, '"')}</p>
          </div>
          <div>
            <p>{location.replace(/;/gi, ",").replace(/\\/gi, '"')}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="eventComponent">
      <div className="eventDescHolder">
        <div>
          <h2>{name.replace(/;/gi, ",")}</h2>
        </div>
        <div>
          <p>{desc.replace(/;/gi, ",")}</p>
        </div>
        <div>
          <p>{time.replace(/;/gi, ",")}</p>
        </div>
        <div>
          <p>{location.replace(/;/gi, ",")}</p>
        </div>
      </div>
    </div>
  );
};

const OfficerCard = ({name, position, img}) => {
  return (
    <>
      <div className="cardSlide">
        <img className="cardImage" src={img}/>
        <div className="cardText">
          <h1 className="cardName">{name}</h1>
          <h2 className="cardPosition">{position}</h2>
        </div>
      </div>
    </>
  );
}

export default App;
