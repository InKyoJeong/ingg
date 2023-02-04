import React, { useContext } from "react";
import Switch from "react-switch";

import {
  DarkModeChangeContext,
  DarkModeStateContext,
} from "../../context/DarkModeProvider";
import "./switch.scss";

const ModeSwitch = () => {
  const toggleDarkMode = useContext(DarkModeChangeContext);
  const isDarkMode = useContext(DarkModeStateContext);

  return (
    <div className="switch-toggle">
      <label htmlFor="icon-switch">
        <Switch
          id="icon-switch"
          uncheckedIcon={
            <div className="icon-unchecked">
              <span role="img" aria-label="dark-mode">
                🌙
              </span>
            </div>
          }
          onChange={toggleDarkMode}
          checked={!isDarkMode}
          offColor={"#000000"}
          offHandleColor={"#292e2e"}
          onColor={"#4fa6a1"}
        />
      </label>
    </div>
  );
};

export default ModeSwitch;
