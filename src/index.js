import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedComponent from "./Components/AnimatedComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AnimatedComponent />
    </Router>
  </React.StrictMode>
);
