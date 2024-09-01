import React from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import App from "../App";

const AnimatedComponent = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} path={location.pathname}>
        <Route path="*" element={<App />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedComponent;
