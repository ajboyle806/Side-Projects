import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Learn from "./Learn";
import Assistant from "./Assistant";
import Rankings from "./Rankings";
import Profile from "./Profile";
import Python from "./Python";
import WebDev from "./WebDev";
import Javascript from "./Javascript";
import Lesson_Py_1_2 from "./Lesson_Py_1_2";
import Lesson_Py_1_2a from "./Lesson_Py_1_2a";
import Challenge from "./Challenge";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<App />} />
        <Route path="/" element={<Learn />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/python" element={<Python />} />
        <Route path="/webdev" element={<WebDev />} />
        <Route path="/javascript" element={<Javascript />} />
        <Route path="/python-lesson-1.2" element={<Lesson_Py_1_2 />} />
        <Route path="/python-lesson-1.2a" element={<Lesson_Py_1_2a />} />
        <Route path="/challenge" element={<Challenge />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);