import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Discuss from "./routes/Discuss"
import Saved from "./routes/Saved"
import Account from "./routes/Account"
import Find from "./routes/Find"


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="discuss" element={<Discuss />} />
      <Route path="find" element={<Find />} />
      <Route path="saved" element={<Saved />} />
      <Route path="account" element={<Account />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
