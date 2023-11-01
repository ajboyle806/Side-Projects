import "./App.css";
import "swiper/css";
import "swiper/css/pagination";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import Select from "react-select";

let dogs = [
  {
    name: "Bobo",
    breed: "Bordoodle",
    gender: "Male",
    age: "Adolescent",
    size: "Medium",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: true,
    hypoallergenic: false,
    characteristics:
      "Friendly, Playful, Curious, Loves kisses, Funny, Brave, Affectionate, Smart",
    description:
      "This big handsome boy is Bobo. He is 60lb Bordoodle mix who has the best personality. He is about 14 months old and all he wants is to go on walks, pick up sticks and give love. Bobo was rescued from a local very over-crowded shelter. His size can be slightly intimidating at first but once you spend time with him, you realize he's just a big teddy bear. Bobo is dog friendly and could do well by himself or with another super friendly and playful female dog. He is extremely strong so he will only be adopted into a family with large breed experience. He is good with children but due to his size he needs to be adopted into a home with kids over the age of 12. Bobo could definitely benefit from some basic training classes for manners because sometimes he doesn't realize his size. If you are looking for a furry weighted blanket, then Bobo could be the dog for you!",
    url: "bb1.png",
  },
  {
    name: "Gidget",
    breed: "Cat",
    gender: "Female",
    age: "Adult",
    size: "Medium",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: true,
    hypoallergenic: false,
    characteristics:
      "Friendly, Playful, Curious, Loves kisses, Funny, Brave, Affectionate, Smart",
    description:
      "This big handsome boy is Magoo. He is 130lb Bully mix who has the best personality. He is about 14 months old and all he wants is to go on walks, pick up sticks and give love. Magoo was rescued from a local very over-crowded shelter. His size can be slightly intimidating at first but once you spend time with him, you realize he's just a big teddy bear. Magoo is dog friendly and could do well by himself or with another super friendly and playful female dog. He is extremely strong so he will only be adopted into a family with large breed experience. He is good with children but due to his size he needs to be adopted into a home with kids over the age of 12. Magoo could definitely benefit from some basic training classes for manners because sometimes he doesn't realize his size. If you are looking for a furry weighted blanket, then Magoo could be the dog for you!",
    url: "c1.png",
  },
  {
    name: "Pickles",
    breed: "Cat",
    gender: "Female",
    age: "Adult",
    size: "Medium",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: false,
    hypoallergenic: false,
    characteristics:
      "Friendly, Playful, Curious, Loves kisses, Funny, Brave, Affectionate, Smart",
    description:
      "This big handsome boy is Magoo. He is 130lb Bully mix who has the best personality. He is about 14 months old and all he wants is to go on walks, pick up sticks and give love. Magoo was rescued from a local very over-crowded shelter. His size can be slightly intimidating at first but once you spend time with him, you realize he's just a big teddy bear. Magoo is dog friendly and could do well by himself or with another super friendly and playful female dog. He is extremely strong so he will only be adopted into a family with large breed experience. He is good with children but due to his size he needs to be adopted into a home with kids over the age of 12. Magoo could definitely benefit from some basic training classes for manners because sometimes he doesn't realize his size. If you are looking for a furry weighted blanket, then Magoo could be the dog for you!",
    url: "c2.png",
  },
  {
    name: "Bean",
    breed: "Cat",
    gender: "Female",
    age: "Adolescent",
    size: "Medium",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: true,
    hypoallergenic: false,
    characteristics:
      "Friendly, Playful, Curious, Loves kisses, Funny, Brave, Affectionate, Smart",
    description:
      "This big handsome boy is Magoo. He is 130lb Bully mix who has the best personality. He is about 14 months old and all he wants is to go on walks, pick up sticks and give love. Magoo was rescued from a local very over-crowded shelter. His size can be slightly intimidating at first but once you spend time with him, you realize he's just a big teddy bear. Magoo is dog friendly and could do well by himself or with another super friendly and playful female dog. He is extremely strong so he will only be adopted into a family with large breed experience. He is good with children but due to his size he needs to be adopted into a home with kids over the age of 12. Magoo could definitely benefit from some basic training classes for manners because sometimes he doesn't realize his size. If you are looking for a furry weighted blanket, then Magoo could be the dog for you!",
    url: "c3.png",
  },
  {
    name: "Max",
    breed: "French Bulldog",
    gender: "Male",
    size: "Small",
    age: "Adult",
    goodWithKids: false,
    goodWithDogs: false,
    goodWithCats: false,
    hypoallergenic: false,
    characteristics: "Shy, sweet, submissive",
    description:
      "Rescue:\nMax was an owner surrender originally adopted from a Shelter the owner did not have the time or right housing accomadations for Max.\n\nHealth:\nMax is neutered, up to date on vaccinations, flea, tick, heartworm prevention he is microchipped.\n\nBehavior:\n\nMax is a super sweet boy, he would do very well as an only child, he plays very rough with other dogs it is difficult to find the right playmate for him. He has a lot of play energy, crate trained, good in the car, just wants to please. Loves to Cuddle on the Sofa, great Tv Partner.No Cats, Older Mature Children preferred.",
    url: "fb1.png",
  },
  {
    name: "Walter",
    breed: "Goldendoodle",
    gender: "Male",
    size: "Large",
    age: "Adolescent",
    goodWithKids: false,
    goodWithDogs: false,
    goodWithCats: false,
    hypoallergenic: "Yes",
    characteristics: "Shy, sweet, submissive",
    description:
      "Rescue:\nMax was an owner surrender originally adopted from a Shelter the owner did not have the time or right housing accomadations for Max.\n\nHealth:\nMax is neutered, up to date on vaccinations, flea, tick, heartworm prevention he is microchipped.\n\nBehavior:\n\nMax is a super sweet boy, he would do very well as an only child, he plays very rough with other dogs it is difficult to find the right playmate for him. He has a lot of play energy, crate trained, good in the car, just wants to please. Loves to Cuddle on the Sofa, great Tv Partner.No Cats, Older Mature Children preferred.",
    url: "gd1.png",
  },
  {
    name: "Lily",
    breed: "Goldendoodle",
    gender: "Female",
    size: "Large",
    age: "Adult",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: false,
    hypoallergenic: "Yes",
    characteristics: "Shy, sweet, submissive",
    description:
      "Lily is a 6 year old Goldendoodle who came from an overcrowded puppy mill. She is now decompressing from the horrible living conditions she endured. Lily will need a very patient & loving family to help her continue her decompression to recover from her horrible past. She is now free and ready to live the life she always deserved to live. She gets along with other dogs and probably would do better in a home with another dog. She is house trained and does amazing on a leash. If you're interested in meeting this sweet girl, please indicate interest!.",
    url: "gd2.png",
  },
  {
    name: "Thad",
    breed: "Leopard Dog",
    gender: "Male",
    size: "Large",
    age: "Adolescent",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: true,
    hypoallergenic: false,
    characteristics: "Shy, sweet, submissive",
    description:
      "Thad is just a baby! This 7 month old Leopard Dog was saved from a livestock auction and was a breeder surrender in OK. He wants to experience a real home so bad!! He is a little shy but very sweet and submissive. He also loves his canine buddies! Apply for this cutie today!.",
    url: "ld1.png",
  },
  {
    name: "Chelsea",
    breed: "Miniature Schnauzer",
    gender: "Female",
    size: "Small",
    age: "Adult",
    goodWithKids: false,
    goodWithDogs: false,
    goodWithCats: false,
    hypoallergenic: "Yes",
    characteristics: "",
    description: "",
    url: "ms1.png",
  },
  {
    name: "Nacho",
    breed: "Miniature Schnauzer",
    gender: "Male",
    size: "Small",
    age: "Adolescent",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: false,
    hypoallergenic: "Yes",
    characteristics: "",
    description: "",
    url: "ms2.png",
  },
  {
    name: "Nathaniel",
    breed: "Miniature Schnauzer",
    gender: "Male",
    size: "Small",
    age: "Senior",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: false,
    hypoallergenic: "Yes",
    characteristics: "",
    description:
      "This 8-10 year old senior schnauzer was an anxious matted mess brought to a local pound. He’s a friendly guy who craves attention and came right over for a hug and cuddle when we met him, desperate to get out of his kennel. After a shave down and dental cleaning he looks, feels, and smells like a new man and is ready to find a home that appreciates this smart loyal talkative breed. Nathaniel seems a bit overwhelmed by other dogs from what we can tell so far, and would probably prefer to be your only dog, or possibly with a calmer female. He doesn’t seem very used to walking on a leash at least for using the bathroom and “holds it” til let out into a fenced yard. His bloodwork was perfect and he didn’t need any teeth pulled during his dental, but does have some pretty bad and painful arthritis in his back so will be on some joint supplements and pain medication longterm, and will need to stay trim to avoid putting extra strain on his back. He might get cranky when painful and doesn’t like other dogs jumping on him (or probably young kids either) and is looking for a calmer adult home that understands the breed. He bonds very quickly and then follows you staring at you with his schnauzerly eyes of love and smirky little whisker face.",
    url: "ms3.png",
  },
  {
    name: "Jackson",
    breed: "Whippet",
    gender: "Male",
    size: "Medium",
    age: "Adolescent",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: false,
    hypoallergenic: "Yes",
    characteristics: "",
    description:
      "This 8-10 year old senior schnauzer was an anxious matted mess brought to a local pound. He’s a friendly guy who craves attention and came right over for a hug and cuddle when we met him, desperate to get out of his kennel. After a shave down and dental cleaning he looks, feels, and smells like a new man and is ready to find a home that appreciates this smart loyal talkative breed. Nathaniel seems a bit overwhelmed by other dogs from what we can tell so far, and would probably prefer to be your only dog, or possibly with a calmer female. He doesn’t seem very used to walking on a leash at least for using the bathroom and “holds it” til let out into a fenced yard. His bloodwork was perfect and he didn’t need any teeth pulled during his dental, but does have some pretty bad and painful arthritis in his back so will be on some joint supplements and pain medication longterm, and will need to stay trim to avoid putting extra strain on his back. He might get cranky when painful and doesn’t like other dogs jumping on him (or probably young kids either) and is looking for a calmer adult home that understands the breed. He bonds very quickly and then follows you staring at you with his schnauzerly eyes of love and smirky little whisker face.",
    url: "w1.png",
  },
  {
    name: "Rupert",
    breed: "Whippet",
    gender: "Male",
    size: "Large",
    age: "Senior",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: false,
    hypoallergenic: "Yes",
    characteristics: "",
    description:
      "This 8-10 year old senior schnauzer was an anxious matted mess brought to a local pound. He’s a friendly guy who craves attention and came right over for a hug and cuddle when we met him, desperate to get out of his kennel. After a shave down and dental cleaning he looks, feels, and smells like a new man and is ready to find a home that appreciates this smart loyal talkative breed. Nathaniel seems a bit overwhelmed by other dogs from what we can tell so far, and would probably prefer to be your only dog, or possibly with a calmer female. He doesn’t seem very used to walking on a leash at least for using the bathroom and “holds it” til let out into a fenced yard. His bloodwork was perfect and he didn’t need any teeth pulled during his dental, but does have some pretty bad and painful arthritis in his back so will be on some joint supplements and pain medication longterm, and will need to stay trim to avoid putting extra strain on his back. He might get cranky when painful and doesn’t like other dogs jumping on him (or probably young kids either) and is looking for a calmer adult home that understands the breed. He bonds very quickly and then follows you staring at you with his schnauzerly eyes of love and smirky little whisker face.",
    url: "w2.png",
  },
  {
    name: "Coco",
    breed: "Yorkie",
    gender: "Female",
    size: "Small",
    age: "Senior",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: false,
    hypoallergenic: "Yes",
    characteristics: "",
    description:
      "This 8-10 year old senior schnauzer was an anxious matted mess brought to a local pound. He’s a friendly guy who craves attention and came right over for a hug and cuddle when we met him, desperate to get out of his kennel. After a shave down and dental cleaning he looks, feels, and smells like a new man and is ready to find a home that appreciates this smart loyal talkative breed. Nathaniel seems a bit overwhelmed by other dogs from what we can tell so far, and would probably prefer to be your only dog, or possibly with a calmer female. He doesn’t seem very used to walking on a leash at least for using the bathroom and “holds it” til let out into a fenced yard. His bloodwork was perfect and he didn’t need any teeth pulled during his dental, but does have some pretty bad and painful arthritis in his back so will be on some joint supplements and pain medication longterm, and will need to stay trim to avoid putting extra strain on his back. He might get cranky when painful and doesn’t like other dogs jumping on him (or probably young kids either) and is looking for a calmer adult home that understands the breed. He bonds very quickly and then follows you staring at you with his schnauzerly eyes of love and smirky little whisker face.",
    url: "y1.png",
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Pets() {
  const [signedIn, setSignedIn] = useLocalStorage("loggedIn", -1);

  const [userInfo, setUserInfo] = useLocalStorage("userInfo", []);

  let [filteredDogs, setFilteredDogs] = useLocalStorage("filteredDogs", [
    ...dogs,
  ]);

  const [adoptObj, setAdoptObj] = useLocalStorage("adoptObj", {});
  const [bodyOpacity, setBodyOpacity] = useLocalStorage("bodyOpacity", {
    opacity: 1,
  });
  const [adoptOpacity, setAdoptOpacity] = useLocalStorage("adoptOpacity", {
    opacity: 0,
    display: "none",
  });

  const [alertText, setAlertText] = useState("");
  const [alertStyle, setAlertStyle] = useState({
    display: "hidden",
    color: "red",
  });

  const addUserAdopt = async (event) => {
    if (signedIn >= 0) {
      let localUserInfo = { ...userInfo[signedIn] };
      console.log(userInfo[signedIn]);
      if (localUserInfo.adopts.length >= 2) {
        setAlertText("You can show interest in at most two pets at a time.");
        setAlertStyle({ display: "relative", color: "red" });
      } else {
        if (localUserInfo.adopts.length == 1 && localUserInfo.adopts[0].name == adoptObj.name){
          setAlertText("Interest already indicated.");
          setAlertStyle({ display: "relative", color: "red" });
        }
        else if (localUserInfo.adopts.length == 2 && (
            localUserInfo.adopts[0].name == adoptObj.name ||
            localUserInfo.adopts[1].name == adoptObj.name
          )){
            setAlertText("Interest already indicated.");
            setAlertStyle({ display: "relative", color: "red" });
        } else {
          localUserInfo.adopts.push({
            name: adoptObj.name,
            breed: adoptObj.breed,
            size: adoptObj.size,
            age: adoptObj.age,
            gender: adoptObj.gender,
            url: adoptObj.url,
          });
          let localUsersInfo = [...userInfo];
          localUsersInfo.splice(signedIn, 1, localUserInfo);
          setUserInfo(localUsersInfo);
          setAlertText(
            "Interest indicated, we'll reach out to you via email soon!"
          );
          setAlertStyle({ display: "relative", color: "red" });
        }
      }
    } else {
      setAlertText(
        "Please log in first!"
      );
      setAlertStyle({ display: "relative", color: "red" });
      // await delay(1000);
      // window.location.href = "/account";
    }
  };

  const AdoptPet = () => {
    return (
      <div style={adoptOpacity}>
        <div className="adoptionDiv2">
          <img src={adoptObj.url} className="adoptionImage" salt="" />
          <h2> Meet {adoptObj.name}</h2>
          <p>
            {adoptObj.gender} {adoptObj.breed}
          </p>
          <p>
            {adoptObj.size} {adoptObj.age}
          </p>
          <p className="petDesc">{adoptObj.description}</p>
          <p className="petDesc" style={alertStyle}>
            {alertText}
          </p>
          <br></br>
          <button
            onClick={() => {
              addUserAdopt();
            }}
            className="button interest"
            style={{ marginTop: "0rem" }}
          >
            Indicate interest
          </button>
          <a href="#top">
            <button
              className="button interest interest2"
              onClick={() => {
                handleSwitch(0, 0, 0, 0, 0, 0, 0, 0, 0);
              }}
            >
              Back
            </button>
          </a>
          <p></p>
          {/* <div className="back"><h2>X</h2></div> */}
        </div>
      </div>
    );
  };

  // const handleChange = async (event) => {
  //     setOpacity({ opacity: 0 });
  //     await delay(400);

  const opacitySwitch = async (event) => {
    if (bodyOpacity["opacity"] == 1) {
      setBodyOpacity({ opacity: 0 });
      await delay(300);
      setBodyOpacity({ opacity: 0, display: "none" });
      setAdoptOpacity({ opacity: 1 });
    } else {
      setAdoptOpacity({ opacity: 0 });
      await delay(300);
      setAdoptOpacity({ opacity: 0, display: "none" });
      setBodyOpacity({ opacity: 1 });
    }
  };

  const handleSwitch = (
    name,
    breed,
    gender,
    url,
    size,
    age,
    personality,
    description,
    which
  ) => {
    if (which == 1) {
      setAdoptObj({
        name,
        breed,
        gender,
        url,
        size,
        age,
        personality,
        description,
      });
    }
    setAlertText("");
    setAlertStyle({ display: "hidden", color: "red" });
    opacitySwitch();
  };

  const [breed, setBreed] = useLocalStorage("breed", []);
  let [breeds, setBreeds] = useLocalStorage("breeds", []);
  const breedOptions = [
    // { value: "American Bulldog", label: "American Bulldog" },
    // { value: "Beagle", label: "Beagle" },
    { value: "Bordoodle", label: "Bordoodle" },
    // { value: "Border Collie", label: "Border Collie" },
    { value: "Cat", label: "Cat" },
    // { value: "Cocker Spaniel", label: "Cocker Spaniel" },
    { value: "French Bulldog", label: "French Bulldog" },
    // { value: "German Shepard", label: "German Shepard" },
    { value: "Goldendoodle", label: "Goldendoodle" },
    { value: "Leopard Dog", label: "Leopard Dog" },
    { value: "Miniature Schnauzer", label: "Miniature Schnauzer" },
    // { value: "Samoyed", label: "Samoyed" },
    { value: "Whippet", label: "Whippet" },
    { value: "Yorkie", label: "Yorkie" },
  ];

  const [age, setAge] = useLocalStorage("age", []);
  let [ages, setAges] = useLocalStorage("ages", []);
  const ageOptions = [
    { value: "Adolescent", label: "Adolescent" },
    { value: "Adult", label: "Adult" },
    { value: "Senior", label: "Senior" },
  ];

  const [size, setSize] = useLocalStorage("size", []);
  let [sizes, setSizes] = useLocalStorage("sizes", []);
  const sizeOptions = [
    { value: "Small", label: "Small (0-25 lbs)" },
    { value: "Medium", label: "Medium (26-60 lbs)" },
    { value: "Large", label: "Large (61-100 lbs)" },
    { value: "Extra Large", label: "Extra Large (101 lbs or more)" },
  ];

  const [gender, setGender] = useLocalStorage("gender", []);
  let [genders, setGenders] = useLocalStorage("genders", []);
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const [goodWith, setGoodWith] = useLocalStorage("goodWith", []);
  let [goodWiths, setGoodWiths] = useLocalStorage("goodWiths", []);
  const goodWithOptions = [
    { value: "Children", label: "Children" },
    { value: "Other Dogs", label: "Other Dogs" },
    { value: "Cats", label: "Cats" },
  ];

  const [hypoallergenic, setHypoallergenic] = useLocalStorage(
    "hypoallergenic",
    []
  );
  let [hypoallergenics, setHypoallergenics] = useLocalStorage(
    "hypoallergenics",
    []
  );
  const hypoallergenicOptions = [{ value: "Yes", label: "Yes" }];

  const [petsFiltered, setPetsFiltered] = useLocalStorage("petsFiltered", [
    ...dogs,
  ]);

  const [opacity, setOpacity] = useLocalStorage("opacityValue", { opacity: 1 });

  const handleBreedChange = (selectedOption) => {
    let terms = [];
    selectedOption.forEach((element) => {
      terms.unshift(element["value"]);
    });
    setBreed(selectedOption);
    breeds = terms;
    setBreeds(...terms);
    handleChange(selectedOption);
  };
  const handleAgeChange = (selectedOption) => {
    let terms = [];
    selectedOption.forEach((element) => {
      terms.unshift(element["value"]);
    });
    setAge(selectedOption);
    ages = terms;
    setAges(...terms);
    handleChange(selectedOption);
  };
  const handleSizeChange = (selectedOption) => {
    let terms = [];
    selectedOption.forEach((element) => {
      terms.unshift(element["value"]);
    });
    sizes = terms;
    setSize(selectedOption);
    setSizes(...terms);
    handleChange(selectedOption);
  };
  const handleGenderChange = (selectedOption) => {
    let terms = [];
    selectedOption.forEach((element) => {
      terms.unshift(element["value"]);
    });
    genders = terms;
    setGender(selectedOption);
    setGenders(...terms);
    handleChange(selectedOption);
  };
  const handleGoodWithChange = (selectedOption) => {
    let terms = [];
    selectedOption.forEach((element) => {
      terms.unshift(element["value"]);
    });
    goodWiths = terms;
    setGoodWith(selectedOption);
    setGoodWiths(...terms);
    handleChange(selectedOption);
  };
  const handleHypoallergenicChange = (selectedOption) => {
    let terms = [];
    selectedOption.forEach((element) => {
      terms.unshift(element["value"]);
    });
    hypoallergenics = terms;
    setHypoallergenic(selectedOption);
    setHypoallergenics(...terms);
    handleChange(selectedOption);
  };

  const handleChange = async (event) => {
    setOpacity({ opacity: 0 });
    await delay(400);
    let filteredList = [];
    let include = true;
    dogs.forEach((element) => {
      include = true;
      if (goodWiths === undefined) {
        goodWiths = [];
        setGoodWiths([]);
      }
      if (breeds === undefined) {
        breeds = [];
        setBreeds([]);
      }
      if (ages === undefined) {
        ages = [];
        setAges([]);
      }
      if (sizes === undefined) {
        sizes = [];
        setSizes([]);
      }
      if (genders === undefined) {
        genders = [];
        setGenders([]);
      }
      if (hypoallergenics === undefined) {
        hypoallergenics = [];
        setHypoallergenics([]);
      }
      if (breeds.length == 0 || breeds.includes(element["breed"])) {
        if (ages.length == 0 || ages.includes(element["age"])) {
          if (sizes.length == 0 || sizes.includes(element["size"])) {
            if (genders.length == 0 || genders.includes(element["gender"])) {
              if (
                hypoallergenics.length == 0 ||
                hypoallergenics.includes(element["hypoallergenic"])
              ) {
                if (
                  goodWiths.includes("Children") &&
                  !element["goodWithKids"]
                ) {
                  include = false;
                }
                if (
                  goodWiths.includes("Other Dogs") &&
                  !element["goodWithDogs"]
                ) {
                  include = false;
                }
                if (goodWiths.includes("Cats") && !element["goodWithCats"]) {
                  include = false;
                }
                if (include) {
                  filteredList.unshift(element);
                }
              }
            }
          }
        }
      }
    });
    setFilteredDogs(filteredList);
    setOpacity({ opacity: 1 });
  };

  const none = () => {
    if (filteredDogs.length == 0) {
      return (
        <p style={opacity} className="noneText">
          None of our dogs meet your criteria. Try switching them up!
        </p>
      );
    }
  };

  const Dog = (
    name,
    breed,
    gender,
    url,
    size,
    age,
    personality,
    description
  ) => {
    return (
      <div className="adoptionDiv">
        <img src={url} className="adoptionImage" salt="" />
        <h2>{name}</h2>
        <p>
          {breed} {gender}
        </p>
        <p>
          {size} {age}
        </p>{" "}
        <a href="#top">
          <button
            onClick={() => {
              handleSwitch(
                name,
                breed,
                gender,
                url,
                size,
                age,
                personality,
                description,
                1
              );
            }}
            className="button moreinfo"
            style={{ marginLeft: "1rem" }}
          >
            More info
          </button>
        </a>
      </div>
    );
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
          <img src="petHeader.png" alt="" />
        </div>
        <p style={{display: "hidden", marginTop: "-1rem"}}
          id="top"
        >a</p>
        <div className="homePageContent2" style={bodyOpacity}>
          <h2 className="adoptHeader" id="adopt">
            Pet Preferences
          </h2>
          <div className="adoptDiv">
            <form>
              <p style={{ marginTop: "12px", marginLeft: "20px" }}>Type:</p>
              <Select
                className="selectDropdown"
                options={breedOptions}
                onChange={handleBreedChange}
                isMulti
                defaultValue={breed}
              ></Select>
              <div className="linebreak"></div>
              <p style={{ marginTop: "12px", marginLeft: "20px" }}>Age:</p>
              <Select
                className="selectDropdown"
                options={ageOptions}
                onChange={handleAgeChange}
                isMulti
                defaultValue={age}
              ></Select>
              <div className="linebreak"></div>
              <p style={{ marginTop: "12px", marginLeft: "20px" }}>Size:</p>
              <Select
                className="selectDropdown"
                options={sizeOptions}
                onChange={handleSizeChange}
                isMulti
                defaultValue={size}
              ></Select>
              <div className="linebreak"></div>
              <p style={{ marginTop: "12px", marginLeft: "20px" }}>Gender:</p>
              <Select
                className="selectDropdown"
                options={genderOptions}
                onChange={handleGenderChange}
                isMulti
                defaultValue={gender}
              ></Select>
              <div className="linebreak"></div>
              <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                Good with:
              </p>
              <Select
                className="selectDropdown"
                options={goodWithOptions}
                onChange={handleGoodWithChange}
                isMulti
                defaultValue={goodWith}
              ></Select>
              <div className="linebreak"></div>
              <p style={{ marginTop: "12px", marginLeft: "20px" }}>
                Hypoallergenic:
              </p>
              <Select
                className="selectDropdown"
                options={hypoallergenicOptions}
                onChange={handleHypoallergenicChange}
                isMulti
                defaultValue={hypoallergenic}
              ></Select>
            </form>
          </div>
          <h2 className="rescuesHeader">Matches ({filteredDogs.length})</h2>
          {none()}
          <div className="dogsDiv" style={opacity}>
            {[...filteredDogs].map(
              ({
                name,
                breed,
                gender,
                url,
                size,
                age,
                personality,
                description,
              }) => {
                return (
                  <>
                    {Dog(
                      name,
                      gender,
                      breed,
                      url,
                      size,
                      age,
                      personality,
                      description
                    )}
                  </>
                );
              }
            )}
          </div>
        </div>
        {AdoptPet()}
        <div className="nav">
          <div className="navImages">
            <Link to="/home">
              <img src="homegrey.png" alt="" />
            </Link>
            <Link to="/pets">
              <img src="pets.png" alt="" />
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

export default Pets;

// const Dog = ({
//   name,
//   breed,
//   size,
//   age,
//   gender,
//   hypoallergenic,
//   url,
//   personality,
//   description,
// }) => {
//   return (
//     <>
//       <div className="adoptionDiv">
//         <img src={url} className="adoptionImage" salt="" />
//         <h2>{name}</h2>
//         <p>
//           {gender} {breed}
//         </p>
//         <p>
//           {size} {age}
//         </p>
//         <button className="button">More info</button>
//       </div>
//     </>
//   );
// };

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
