import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Counter from "./Counter";
import { initializeApp } from "firebase/app";
import { HashRouter, Routes, Route } from "react-router-dom";
import Listeners from "./Listeners";

const firebaseConfig = {
  apiKey: "AIzaSyCYA0M1UST2OhzV2Ftc5srchy_6khARJWs",
  authDomain: "gachapon-81649.firebaseapp.com",
  projectId: "gachapon-81649",
  storageBucket: "gachapon-81649.appspot.com",
  messagingSenderId: "23044919854",
  appId: "1:23044919854:web:1848c94c3536da4acdc5bf",
  databaseURL: "https://gachapon-81649-default-rtdb.firebaseio.com",
};

initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Listeners />
    {window.location.pathname === "/counter" ||
    window.location.pathname === "/counter/" ? (
      <Counter />
    ) : (
      <App />
    )}
  </React.StrictMode>
);
