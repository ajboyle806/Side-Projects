import './App.css';
import "swiper/css";
import "swiper/css/pagination";
import React, {useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

function App() {


  return (
    <div className="background">
      <div className="app">
        <div className="banner">
          <img src="smallpaws6.png" alt="" />
        </div>
        <div className="linkDivContainer">
          <LinkDiv
            text="Adopt"
            color="#d6edff"
            img="/paw.png"
            foregroundColor="#85b8e1"
            destination="/pets"
          ></LinkDiv>
          <LinkDiv
            text="Relinquish"
            color="#d6edff"
            img="/bone.png"
            foregroundColor="#85b8e1"
            destination="/relinquish"
          ></LinkDiv>
          <LinkDiv
            text="Donate"
            color="#d6f6ff"
            img="/donate.png"
            foregroundColor="#83c4e0"
            destination="/help#donatefunds"
          ></LinkDiv>
          <LinkDiv
            text="Supply"
            color="#d6f6ff"
            img="/give.png"
            foregroundColor="#83c4e0"
            destination="/help#donatesupplies"
          ></LinkDiv>
          <LinkDiv
            text="Volunteer"
            color="#eeecff"
            img="/volunteer.png"
            foregroundColor="#adb2e4"
            destination="/help"
          ></LinkDiv>
          <LinkDiv
            text="Account"
            color="#eeecff"
            img="/accounttab.png"
            foregroundColor="#adb2e4"
            destination="/account"
          ></LinkDiv>
        </div>
        <div className="homePageContent">
          <h2 id="blogHeader">Blog</h2>
          <div className="newsDivContainer">
            <NewsDiv
              text="Ten pets have found homes!"
              desc="We're glad to announce that we've had ten of our pets adopted into caring homes! More fuzzy friends need a family, so"
              url="adoption.png"
              height="20rem"
            ></NewsDiv>
            <NewsDiv
              text="Volunteers needed!"
              desc="We would greatly appreciate more volunteers to support our upcoming events! We will be unloading supplies and per"
              url="volunteers.png"
              height="20rem"
            ></NewsDiv>
            <NewsDiv
              text="Grand Opening on 3/1/23"
              desc="Small Paws Sanctuary is officially opening on March 1st, 2023! Our address is 4 Bark Street, Toms River, NJ 08753, so be sure to stop by there at 9:00 to witness our opening adoption event! We are presently taking in pets and donations, so if you feel you need to relinquish your dog or cat, fill out the form attached to this page, and if you have money or resources to spare, consider contributing to our cause. It would be greatly appreciated! A big thank you to all of the donors who made this possible!"
              url="opening.png"
              height="19.5rem"
            ></NewsDiv>
            <NewsDiv
              text="Introducing Small Paws Sanctuary"
              desc="Small Paws Santuary is a new shelter for dogs and cats alike in need of help. Its intention is to streamline adoption and"
              url="smallpawspaws.png"
              height="20rem"
            ></NewsDiv>
          </div>
          <h2>Recently adopted</h2>
          <Swiper
            // pagination={true}
            modules={[Pagination]}
            // slidesPerView={2}
            className="mySwiper"
          >
            <SwiperSlide>
              <DogDiv
                url="dog2.png"
                name="Sandy"
                age="7"
                breed="Mini Schnauzer"
                personality="Temperate"
                testimonial='"Sandy was rescued from a puppy mill so we adopted her to try to grant her a comfortable life. She has settled into our home with her sister Roxy as a fierce yet loyal dog whom we all love."'
              ></DogDiv>
            </SwiperSlide>
            <SwiperSlide>
              <DogDiv
                url="dog3.png"
                name="Roxy"
                age="7"
                breed="Mini Schnauzer"
                personality="Temperate"
                testimonial='"We adopted Roxy along with Sandy because we could not bear to separate the two. Thank you Small Paws for making this possible, she is serving as a peaceful dog who is great to be around!"'
              ></DogDiv>
            </SwiperSlide>
            <SwiperSlide>
              <DogDiv
                url="dog1.png"
                name="Groot"
                age="5"
                breed="Goldendoodle"
                personality="Temperate"
                testimonial='"Thank you for letting Groot into our lives, Small Paws! He is so energetic and playful while simultaneously docile, and we could not have asked for a better pet!"'
              ></DogDiv>
            </SwiperSlide>
            <SwiperSlide>
              <DogDiv
                url="dog5.png"
                name="River"
                age="4"
                breed="Leopard Dog"
                personality="Temperate"
                testimonial='"We adopted River in hopes of giving her a better life, and she has returned the favor many times over. She is temperate yet also playful and good with kids; thank you Small Paws!"'
              ></DogDiv>
            </SwiperSlide>
            <SwiperSlide>
              <DogDiv
                url="dog4.png"
                name="Darla"
                age="2"
                breed="Potcake dog"
                personality="Temperate"
                testimonial='"Darla was a bit destructive when we first got her as a puppy, but Small Paws has offered so much support as we have trained her! She now is a controlled loving dog we could not live without."'
              ></DogDiv>
            </SwiperSlide>
            <SwiperSlide>
              <DogDiv
                url="dog6.png"
                name="Lainie"
                age="3"
                breed="Shih Tzu"
                personality="Temperate"
                testimonial='"Lainie has been a bundle of sunshine, pushing us to explore and engage more with the world around us. She loves the wilderness and beach but also has been great to merely chill with!"'
              ></DogDiv>
            </SwiperSlide>
            <SwiperSlide>
              <DogDiv
                url="dog7.png"
                name="Pippa"
                age="2"
                breed="Tabby Cat"
                personality="Temperate"
                testimonial='"We were initially aprehensive when adopting a cat, but Small Paws assured that Pippa would be a peaceful addition to our lives. They were so right, and we are so greateful!"'
              ></DogDiv>
            </SwiperSlide>
            <SwiperSlide>
              <DogDiv
                url="dog8.png"
                name="Harley"
                age="6"
                breed="Muggin"
                personality="Temperate"
                testimonial='"We really wanted a loyal dog for our family, and Harley has fit the role perfectly. Thank you for matching her to us Small Paws, she is now a great friend to all of us!"'
              ></DogDiv>
            </SwiperSlide>
            <SwiperSlide>
              <DogDiv
                url="dog9.png"
                name="Hershey"
                age="3"
                breed="Australian Sheppard Mix"
                personality="Temperate"
                testimonial='"Oreo has been a wonderful addition to our lives, not only being cute, but also being loyal and active. Thank you Small Paws for making our connection with him possible!"'
              ></DogDiv>
            </SwiperSlide>
            <SwiperSlide>
              <DogDiv
                url="dog10.png"
                name="Summer"
                age="8"
                breed="Havanese"
                personality="Temperate"
                testimonial='"With our kids leaving for college, we wanted a more relaxed dog who would not need constant activity. Small Paws matched us perfectly with Summer, who is now a great couchmate."'
              ></DogDiv>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="nav">
          <div className="navImages">
            <Link to="/home">
              <img src="home.png" alt="" />
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

const LinkDiv = ({text, color, img, foregroundColor, destination}) => {
  return (
    <HashLink to={destination}>
      <div className="linkDiv" style={{ backgroundColor: color }}>
        <div>
          <h2 style={{ color: foregroundColor }}>{text}</h2>
        </div>
        <img src={img} alt="" />
      </div>
    </HashLink>
  );
}

const NewsDiv = ({text, desc, url, height}) => {

  
  let [newsDivHeight, setNewsDivHeight] = useState({ height: "8rem"});
  const [newsSubStyles, setNewsSubStyles] = useState({ height: "85%", overflow: "hidden" });

  const newsDivClick = () => {
    if (newsDivHeight["height"] == "8rem") {
      setNewsDivHeight({ height: height});
      setNewsSubStyles({ height: "100%", overflow: "hidden" });
    } else {
      setNewsDivHeight({ height: "8rem" });
      setNewsSubStyles({ height: "85%", overflow: "hidden" });
    }
  };

  return (
    <div
      className="newsDiv"
      style={newsDivHeight}
      onClick={() => {
        newsDivClick();
      }}
    >
      <img src={url} alt="" />
      <div style={newsSubStyles}>
        <h2>{text}</h2>
        <p>{desc}</p>
      </div>
    </div>
  );
}

const DogDiv = ({url, name, age, breed, personality, testimonial}) => {
  return (
    <div className="dogDivContainer" id="test">
      <div className="dogDiv">
        <img src={url} alt="" />
        <div className="dogText">
          <p className="dogTextFirst"><b>Name:</b> {name}</p>
          <p><b>Age:</b> {age}</p>
          <p><b>Breed:</b> {breed}</p>
          <p><b>Testimonial:</b> {testimonial}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
