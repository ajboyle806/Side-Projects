import logo from "./logo.svg";
import "./Python.css";
import "./Lessons.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Learn() {
  return (
    <>
      <div className="background">
        <div className="app-page-lessons">
          <div className="lessons-page-head python">
            <div className="lessons-header-text-div">
              <h2 className="lessons-header-name">
                1.2: Lesson - Hello, World!
              </h2>
              <Link to="/python">
                <h2 className="lessons-header-exit">✕</h2>
              </Link>
            </div>
            <div className="lessons-header-progress-back">
              <div className="lessons-header-progress-front"></div>
            </div>
          </div>
          <div className="lesson-content">
            <h2 className="lesson-header">What is!</h2>
            <p className="lesson-paragraph">Python!</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Learn;
