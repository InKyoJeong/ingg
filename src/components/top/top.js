import React, { useContext } from "react";
import { DarkModeStateContext } from "../../context/DarkModeProvider";

import "./top.scss";

const Top = () => {
  const isDarkMode = useContext(DarkModeStateContext);

  return (
    <div className="top">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="line"
      >
        <polygon
          fill={isDarkMode ? "#292e2e" : "#ffffff"}
          points="0,100 100,0 100,100"
        />
      </svg>
    </div>
  );
};

export default Top;
